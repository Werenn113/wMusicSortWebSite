export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated || !authStore.isSpotifyConnected) {
        return navigateTo('/dashboard')
    }
})