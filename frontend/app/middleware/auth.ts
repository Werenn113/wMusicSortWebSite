/**
 * Middleware de protection des routes nécessitant une authentification.
 * 
 * Vérifie que l'utilisateur est authentifié avant d'accéder à la route.
 * Redirige vers la page de connexion si l'utilisateur n'est pas connecté.
 * 
 * @example
 * ```vue
 * <script setup>
 * definePageMeta({
 *   middleware: 'auth'
 * })
 * </script>
 * ```
 */
export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore()

    // Redirige vers /auth/login si l'utilisateur n'est pas authentifié
    if (!authStore.isAuthenticated) {
        return navigateTo('/auth/login')
    }
})