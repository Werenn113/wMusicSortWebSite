import { defineStore } from "pinia";
import { ref } from 'vue';

/**
 * Store Pinia gérant l'authentification des utilisateurs et la connexion aux plateformes musicales.
 * 
 * @example
 * ```typescript
 * const authStore = useAuthStore()
 * 
 * // Connexion
 * await authStore.login({ email: 'user@example.com', password: 'password' })
 * 
 * // Vérifier l'authentification
 * if (authStore.isAuthenticated) {
 *   console.log('Utilisateur connecté:', authStore.user?.username)
 * }
 * ```
 */
export const useAuthStore = defineStore("users", () => {
    /** Données de l'utilisateur connecté (null si non authentifié) */
    const user = ref<User | null>(null);

    /** Computed vérifiant si un utilisateur est connecté */
    const isAuthenticated = computed(() => !!user.value)

    /** État de la connexion au compte Spotify */
    const isSpotifyConnected = ref(false)

    /**
     * Enregistre un nouvel utilisateur dans l'application.
     * 
     * @param registerDatas - Données d'enregistrement (email, username, password)
     * @throws {Error} Si l'enregistrement échoue (email déjà utilisé, etc.)
     * 
     * @example
     * ```typescript
     * await authStore.register({
     *   email: 'user@example.com',
     *   username: 'johndoe',
     *   password: 'securePassword123'
     * })
     * ```
     */
    async function register(registerDatas: RegisterSchema) {
        try {
            await $fetch('/api/auth/register', {
                method: 'POST',
                body: registerDatas,
                credentials: 'include'
            })
            await fetchUserDatas()
        } catch (error) {
            throw error
        }
    }

    /**
     * Connecte un utilisateur existant.
     * 
     * @param loginDatas - Identifiants de connexion (email, password)
     * @throws {Error} Si les identifiants sont incorrects
     * 
     * @example
     * ```typescript
     * await authStore.login({
     *   email: 'user@example.com',
     *   password: 'password123'
     * })
     * ```
     */
    async function login(loginDatas: LoginSchema) {
        try {
            await $fetch('/api/auth/login', {
                method: 'POST',
                body: loginDatas,
                credentials: 'include'
            })
            await fetchUserDatas()
        } catch (error) {
            console.error("Erreur d'authentification", error) // TODO: retirer ça
            throw error;
        }
    }

    /**
     * Récupère les données de l'utilisateur connecté depuis le backend.
     * 
     * Cette méthode est appelée automatiquement après login/register et au démarrage
     * de l'application pour restaurer la session.
     * 
     * @example
     * ```typescript
     * await authStore.fetchUserDatas()
     * if (authStore.user) {
     *   console.log('Session restaurée')
     * }
     * ```
     */
    async function fetchUserDatas() {
        try {
            const data = await $fetch<User>('/api/auth/user_data', { credentials: 'include' })
            user.value = data
        } catch (error) {
            user.value = null
        }
    }

    /**
     * Déconnecte l'utilisateur actuel.
     * 
     * Supprime la session côté serveur et réinitialise l'état local.
     * 
     * @example
     * ```typescript
     * await authStore.logout()
     * // L'utilisateur est redirigé vers la page d'accueil
     * ```
     */
    async function logout() {
        await $fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        })
        user.value = null
    }

    /**
     * Vérifie si l'utilisateur a connecté son compte Spotify.
     * 
     * Cette méthode doit être appelée après le retour du flux OAuth Spotify
     * ou au chargement du dashboard.
     * 
     * @example
     * ```typescript
     * await authStore.checkSpotifyConnection()
     * if (authStore.isSpotifyConnected) {
     *   console.log('Spotify connecté')
     * }
     * ```
     */
    async function checkSpotifyConnection() {
        try {
            const response = await $fetch<{ connected: boolean }>('/api/spotify/status', { credentials: 'include' })
            isSpotifyConnected.value = response.connected
        } catch (error) {
            isSpotifyConnected.value = false
        }
    }

    return { user, isAuthenticated, isSpotifyConnected, register, login, fetchUserDatas, logout, checkSpotifyConnection };
});