import ConnectedAccount from "#models/connected_account";
import env from "#start/env";
import { HttpContext } from "@adonisjs/core/http";
import { Playlist, SpotifyPlaylistsResponse, SpotifyRefreshResponse, SpotifyTracksResponse, Track } from "#types/spotify"
import { DateTime } from "luxon";
import User from "#models/user";

/**
 * Contrôleur pour gérer les interactions avec l'API Spotify
 * Gère l'authentification OAuth, la récupération des playlists et des tracks
 * @class SpotifyController
 */
export default class SpotifyController {
    /**
     * URL de base de l'API Spotify
     * @private
     * @type {string}
     */
    private baseApiUrl: string

    /**
     * Initialise le contrôleur avec l'URL de base de l'API Spotify
     * @constructor
     */
    constructor() {
        this.baseApiUrl = "https://api.spotify.com/v1"
    }

    /**
     * Redirige l'utilisateur vers la page d'autorisation OAuth Spotify
     * @param {HttpContext} context - Contexte HTTP contenant ally
     * @returns {Promise<void>} Redirection vers Spotify
     */
    async redirect({ ally }: HttpContext) {
        return ally.use('spotify').redirect()
    }

    /**
     * Gère le callback OAuth de Spotify après autorisation
     * Enregistre ou met à jour le compte Spotify connecté pour l'utilisateur
     * @param {HttpContext} context - Contexte HTTP contenant ally, auth et response
     * @returns {Promise<void>} Page HTML avec script de communication avec la fenêtre parente
     */
    async callback({ ally, auth, response }: HttpContext) {
        const spotify = ally.use('spotify')

        if (spotify.accessDenied()) {
            const error = spotify.getError()
            // Send message to parent window before closing
            return response.send(`
                <!DOCTYPE html>
                <html>
                <head><title>Spotify Connection Error</title></head>
                <body>
                    <script>
                        if (window.opener) {
                            window.opener.postMessage({ type: 'spotify-auth', success: false, error: '${error}' }, '*');
                        }
                        window.close();
                    </script>
                    <p>Connection error. This window will close automatically...</p>
                </body>
                </html>
            `)
        }

        const spotifyUser = await spotify.user()
        const user = auth.user!

        await ConnectedAccount.updateOrCreate(
            {
                userId: user.id,
                provider: 'spotify'
            },
            {
                providerUserId: spotifyUser.id,
                accessToken: spotifyUser.token.token,
                refreshToken: spotifyUser.token.refreshToken,
                expiresAt: DateTime.now().plus({ seconds: spotifyUser.token.expiresIn })
            }
        )

        // Send success message and close window
        return response.send(`
            <!DOCTYPE html>
            <html>
            <head><title>Spotify Connection Successful</title></head>
            <body>
                <script>
                    if (window.opener) {
                        window.opener.postMessage({ type: 'spotify-auth', success: true }, '*');
                    }
                    setTimeout(() => window.close(), 500);
                </script>
                <p>Connection successful! This window will close automatically...</p>
            </body>
            </html>
        `)
    }

    /**
     * Vérifie si l'utilisateur a un compte Spotify connecté
     * @param {HttpContext} context - Contexte HTTP contenant auth et response
     * @returns {Promise<void>} JSON avec statut de connexion { connected: boolean }
     */
    public async status({ auth, response }: HttpContext) {
        const user = auth.user!

        try {
            await this.getSpotifyAccount(user.id)
            return response.json({ connected: true })
        } catch (error) {
            return response.json({ connected: false })
        }
    }

    /**
     * Déconnecte le compte Spotify de l'utilisateur
     * Supprime les données du compte connecté de la base de données
     * @param {HttpContext} context - Contexte HTTP contenant auth et response
     * @returns {Promise<void>} JSON avec message de confirmation ou erreur 404
     */
    public async logout({ auth, response }: HttpContext) {
        const user = auth.user!

        try {
            const spotifyAccount = await this.getSpotifyAccount(user.id)
            await spotifyAccount.delete()

            return response.status(200).json({
                message: "Compte Spotify déconnecté avec succès"
            })
        } catch (error) {
            return response.status(404).json({
                error: "Aucun compte Spotify connecté"
            })
        }
    }

    /**
     * Récupère la liste des playlists de l'utilisateur depuis Spotify
     * Limite de 50 playlists par requête
     * @param {HttpContext} context - Contexte HTTP contenant auth et response
     * @returns {Promise<void>} JSON avec tableau de playlists simplifiées
     * @throws {Error} Si le compte Spotify n'est pas trouvé ou si l'API Spotify échoue
     */
    public async getUserPlaylists({ auth, response }: HttpContext) {
        const user: User = auth.user!

        const spotifyAccount = await this.getSpotifyAccount(user.id)
        const accessToken = await this.getValidToken(spotifyAccount)

        try {
            const apiResponse = await fetch(`${this.baseApiUrl}/me/playlists?limit=50&offset=0`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            })

            if (!apiResponse.ok) {
                const errorBody = await apiResponse.text()
                throw new Error(`Spotify API Error (${apiResponse.status}): ${errorBody}`)
            }

            const data = await apiResponse.json() as SpotifyPlaylistsResponse

            const simplifiedPlaylists: Playlist[] = data.items.map((playlist) => {
                return {
                    id: playlist.id,
                    image: playlist.images.map(img => img.url),
                    name: playlist.name,
                    owner: playlist.owner,
                    tracksCount: playlist.tracks.total,
                    url: playlist.uri
                }
            })

            return response.json(simplifiedPlaylists)

        } catch (error) {
            console.error('Erreur lors de la récupération des playlists:', error)
            return response.status(500).json({
                error: 'Impossible de récupérer les playlists',
                detail: error instanceof Error ? error.message : 'Erreur inconnue'
            })
        }
    }

    /**
     * Récupère toutes les tracks d'une playlist Spotify spécifique
     * @param {HttpContext} context - Contexte HTTP contenant auth, params et response
     * @param {string} context.params.playlistId - ID de la playlist Spotify
     * @returns {Promise<void>} JSON avec tableau de tracks simplifiées
     * @throws {Error} Si le compte Spotify n'est pas trouvé ou si l'API Spotify échoue
     */
    public async getPlaylistTracks({ auth, params, response }: HttpContext) {
        const user: User = auth.user!

        const spotifyAccount = await this.getSpotifyAccount(user.id)
        const accessToken = await this.getValidToken(spotifyAccount)

        try {
            const getTracksResponse = await fetch(`${this.baseApiUrl}/playlists/${params.playlistId}/tracks`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            })

            if (!getTracksResponse.ok) {
                const errorBody = await getTracksResponse.text()
                throw new Error(`Spotify API Error (${getTracksResponse.status}): ${errorBody}`)
            }

            const tracks = await getTracksResponse.json() as SpotifyTracksResponse
            const simplifiedTracks: Track[] = tracks.items.map((track) => {
                return {
                    id: track.track.id,
                    name: track.track.name,
                    artists: track.track.artists.map(artist => artist.name)
                }
            })
            return response.json(simplifiedTracks)
        } catch (error) {
            console.error('Erreur lors de la récupération des tracks:', error)
            return response.status(500).json({
                error: 'Impossible de récupérer les tracks de la playlist',
                detail: error instanceof Error ? error.message : 'Erreur inconnue'
            })
        }
    }

    /**
     * Récupère le compte Spotify connecté pour un utilisateur
     * @private
     * @param {number} userId - ID de l'utilisateur
     * @returns {Promise<ConnectedAccount>} Compte Spotify connecté
     * @throws {ModelNotFoundException} Si aucun compte Spotify n'est trouvé
     */
    private async getSpotifyAccount(userId: number): Promise<ConnectedAccount> {
        return await ConnectedAccount.query()
            .where('user_id', userId)
            .where('provider', 'spotify')
            .firstOrFail()
    }

    /**
     * Obtient un token d'accès valide pour l'API Spotify
     * Rafraîchit automatiquement le token s'il est expiré ou expire dans moins de 60 secondes
     * @private
     * @param {ConnectedAccount} account - Compte connecté Spotify de l'utilisateur
     * @returns {Promise<string>} Token d'accès valide
     * @throws {Error} Si le rafraîchissement du token échoue
     */
    private async getValidToken(account: ConnectedAccount): Promise<string> {
        const isExpired = !account.expiresAt || account.expiresAt <= DateTime.now().plus({ seconds: 60 })
        if (!isExpired && account.accessToken) {
            return account.accessToken
        }

        console.log("Token expired, refreshing...")

        try {
            const basicAuth = Buffer.from(
                `${env.get('SPOTIFY_CLIENT_ID')}:${env.get('SPOTIFY_CLIENT_SECRET')}`
            ).toString('base64')

            const bodyParams = new URLSearchParams()
            bodyParams.append('grant_type', 'refresh_token')
            bodyParams.append('refresh_token', account.refreshToken!)

            const refreshResponse = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${basicAuth}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: bodyParams
            })

            if (!refreshResponse.ok) {
                const errorBody = await refreshResponse.text()
                throw new Error(`Refresh Token Error (${refreshResponse.status}): ${errorBody}`)
            }

            const data = await refreshResponse.json() as SpotifyRefreshResponse

            account.accessToken = data.access_token
            if (data.refresh_token) {
                account.refreshToken = data.refresh_token
            }
            account.expiresAt = DateTime.now().plus({ seconds: data.expires_in })

            await account.save()

            return account.accessToken
        } catch (error) {
            console.error("Unable to refresh token", error instanceof Error ? error.message : String(error))
            throw new Error("Token refresh error")
        }
    }
}