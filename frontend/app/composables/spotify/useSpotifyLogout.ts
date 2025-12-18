/**
 * Composable gérant la déconnexion du compte Spotify.
 * 
 * Déconnecte le compte Spotify lié à l'utilisateur et met à jour l'état local.
 * 
 * @returns API pour gérer la déconnexion Spotify
 * 
 * @example
 * ```vue
 * <script setup>
 * const { spotifyDisconnection } = useSpotifyLogout()
 * </script>
 * 
 * <template>
 *   <UButton @click="spotifyDisconnection">Déconnecter Spotify</UButton>
 * </template>
 * ```
 */
export const useSpotifyLogout = () => {
    const toast = useToast()
    const authStore = useAuthStore()

    /**
     * Déconnecte le compte Spotify de l'utilisateur.
     * 
     * Appelle l'API backend pour supprimer la liaison, met à jour l'état local
     * et affiche une notification de confirmation.
     */
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