/**
 * Middleware de protection des pages d'authentification (login, register).
 * 
 * Empêche l'accès aux pages de connexion/enregistrement pour les utilisateurs
 * déjà authentifiés. Redirige vers le dashboard si déjà connecté.
 * 
 * @example
 * ```vue
 * <script setup>
 * definePageMeta({
 *   middleware: 'guest'
 * })
 * </script>
 * ```
 */
export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore()

    // Redirige vers /dashboard si l'utilisateur est déjà authentifié
    if (auth.isAuthenticated) {
        return navigateTo('/dashboard')
    }
})