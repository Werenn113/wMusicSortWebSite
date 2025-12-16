export const useSpotifyLogout = () => {
    const toast = useToast()
    const authStore = useAuthStore()

    async function spotifyDisconnection() {
        try {
            await $fetch('/api/spotify/logout', { method: 'POST', credentials: 'include' })
            authStore.isSpotifyConnected = false
            toast.add({ title: "Success", description: "Spotify account disconnected successfully.", color: 'success' })
        } catch (error) {
            toast.add({ title: "Error", description: "Spotify disconnection failed.", color: 'error' })
        }
    }

    return {
        spotifyDisconnection
    }
}