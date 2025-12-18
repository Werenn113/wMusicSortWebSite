/**
 * Middleware de protection des routes nécessitant une connexion Spotify.
 * 
 * Vérifie que l'utilisateur est authentifié ET a connecté son compte Spotify.
 * Redirige vers le dashboard si l'une des conditions n'est pas remplie.
 * 
 * Utilisé pour protéger les pages d'analyse de playlists Spotify.
 * 
 * @example
 * ```vue
 * <script setup>
 * definePageMeta({
 *   middleware: 'spotify'
 * })
 * </script>
 * ```
 */
export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore()

    // Redirige vers /dashboard si l'utilisateur n'est pas authentifié ou n'a pas connecté Spotify
    if (!authStore.isAuthenticated || !authStore.isSpotifyConnected) {
        return navigateTo('/dashboard')
    }
})


// TODO : différencié les cas dans le if