/**
 * Plugin Nuxt d'initialisation de l'authentification.
 * 
 * S'exécute au démarrage de l'application pour restaurer la session utilisateur.
 * Récupère les données utilisateur depuis le backend si elles ne sont pas déjà présentes.
 * 
 * Permet de persister la session entre les rechargements de page via les cookies HTTP.
 * 
 * @param nuxtApp - Instance de l'application Nuxt
 */
export default defineNuxtPlugin(async (nuxtApp) => {
    const authStore = useAuthStore()

    // Restaure la session utilisateur si elle n'est pas déjà chargée
    if (!authStore.user) {
        await authStore.fetchUserDatas()
    }
})