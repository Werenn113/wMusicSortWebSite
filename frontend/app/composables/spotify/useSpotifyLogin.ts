/**
 * Composable gérant la connexion OAuth Spotify via popup.
 * 
 * Ouvre une fenêtre popup pour le flux d'authentification Spotify OAuth 2.0,
 * surveille sa fermeture et vérifie l'état de connexion.
 * 
 * @returns API pour gérer la connexion Spotify
 * 
 * @example
 * ```vue
 * <script setup>
 * const { spotifyConnection } = useSpotifyLogin()
 * </script>
 * 
 * <template>
 *   <UButton @click="spotifyConnection">Connecter Spotify</UButton>
 * </template>
 * ```
 */
export const useSpotifyLogin = () => {
    const toast = useToast()
    const authStore = useAuthStore()

    /**
     * Lance le processus de connexion Spotify.
     * 
     * - Ouvre une popup vers le endpoint OAuth Spotify
     * - Surveille la fermeture de la popup (polling toutes les 1s)
     * - Vérifie l'état de connexion une fois la popup fermée
     * - Affiche une notification de succès ou d'échec
     * 
     * @throws Affiche un toast d'erreur si la popup est bloquée par le navigateur
     */
    async function spotifyConnection() {
        const popup = window.open('http://127.0.0.1:3333/spotify/link', 'spotify_oauth', 'width=600,height=800')

        if (!popup) {
            toast.add({ title: 'Error', description: 'Unable to open connection window (popup blocked).', color: 'error' })
            return
        }

        const interval = setInterval(async () => {
            if (popup.closed) {
                clearInterval(interval)
                await authStore.checkSpotifyConnection()

                if (authStore.isSpotifyConnected) {
                    toast.add({ title: "Success", description: "Spotify account linked successfully.", color: 'success' })
                } else {
                    toast.add({ title: "Failed", description: "Spotify connection failed or was cancelled.", color: 'error' })
                }
            }
        }, 1000)
    }

    return {
        spotifyConnection
    }
}