import ConnectedAccount from "#models/connected_account";
import env from "#start/env";
import { HttpContext } from "@adonisjs/core/http";
import { Playlist, SpotifyPlaylistsResponse, SpotifyRefreshResponse, SpotifyTracksResponse, Tracks } from "#types/spotify"
import { DateTime } from "luxon";
import User from "#models/user";


export default class SpotifyController {
    private baseApiUrl: string

    constructor() {
        this.baseApiUrl = "https://api.spotify.com/v1"
    }

    public async getUserPlaylists({ auth, response}: HttpContext) {
        const user: User = auth.user!

        const spotifyAccount = await ConnectedAccount.query()
            .where('user_id', user.id)
            .where('provider', 'spotify')
            .firstOrFail()

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
                throw new Error(`Erreur Spotify: ${apiResponse.status} ${apiResponse.statusText}`)
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
            console.error('Erreur lors du fetch playlists:', error)
            return response.status(500).send('Impossible de récupérer les playlists')
        }
    }


    public async getPlaylistTracks({ auth, params, response }: HttpContext) {
        const user: User = auth.user!

        const spotifyAccount = await ConnectedAccount.query()
            .where('user_id', user.id)
            .where('provider', 'spotify')
            .firstOrFail()

        const accessToken = await this.getValidToken(spotifyAccount)

        const getTracksResponse = await fetch(`${this.baseApiUrl}/playlists/${params.id}/tracks`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            })

        if (!getTracksResponse.ok) {
            throw new Error(`Erreur lors de la récupération de la playlist: ${getTracksResponse.status} ${getTracksResponse.statusText}`)
        }

        const tracks = await getTracksResponse.json() as SpotifyTracksResponse
        const simplifiedTracks: Tracks[] = tracks.items.map((track) => {
            return {
                id: track.track.id,
                name: track.track.name,
                artists: track.track.artists.map(artist => artist.name)
            }
        })
        return response.json(simplifiedTracks)
    }


    private async getValidToken(account: ConnectedAccount): Promise<string> {
        const isExpired = !account.expiresAt || account.expiresAt <= DateTime.now().plus({seconds: 60})
        if (!isExpired && account.accessToken) {
            return account.accessToken
        }

        console.log("Token expiré, rafraichissement en cours...")

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
                throw new Error(`Erreur Refresh Token (${refreshResponse.status}): ${errorBody}`)
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
            console.error("Impossible de rafraichir le token", error.response?.data)
            throw new Error("Erreur de refresh token")
        }
    }
}