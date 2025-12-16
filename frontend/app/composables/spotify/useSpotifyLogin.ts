export const useSpotifyLogin = () => {
    const toast = useToast()
    const authStore = useAuthStore()

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