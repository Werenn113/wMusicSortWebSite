export const useSpotifyLogin = () => {
    const toast = useToast()
    const auth = useAuthStore()

    async function onClickSpotifyConnectButton() {
        const popup = window.open('http://127.0.0.1:3333/spotify/link', 'spotify_oauth', 'width=600,height=800')

        if (!popup) {
            toast.add({ title: 'Erreur', description: 'Impossible d\'ouvrir la fenêtre de connexion (popup bloquée).', color: 'error' })
            return
        }

        const interval = setInterval(async () => {
            if (popup.closed) {
                clearInterval(interval)
                await auth.checkSpotifyConnection()

                if (auth.isSpotifyConnected) {
                    toast.add({ title: 'Succès', description: 'Compte Spotify lié avec succès.', color: 'success' })
                } else {
                    toast.add({ title: 'Échec', description: 'La connexion Spotify a échoué ou a été annulée.', color: 'error' })
                }
            }
        }, 1000)
    }

    return {
        onClickSpotifyConnectButton
    }
}