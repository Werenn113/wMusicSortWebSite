import { defineStore } from "pinia";
import { ref } from 'vue';

export const useAuthStore = defineStore("users", () => {
    const user = ref<User | null>(null);
    const isAuthenticated = computed(() => !!user.value)
    const isSpotifyConnected = ref(false)

    async function register(registerDatas: RegisterSchema) {
        try {
            await $fetch('/api/auth/register', {
                method: 'POST',
                body: registerDatas,
                credentials: 'include'
            })
            await fetchUserDatas()
        } catch (error) {
            console.error("Erreur d'enregistrement", error) // TODO: retirer ça
            throw error
        }
    }

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

    async function fetchUserDatas() {
        try {
            const data = await $fetch<User>('/api/auth/user_data', { credentials: 'include' })
            user.value = data
        } catch (error) {
            user.value = null
        }
    }

    async function logout() {
        await $fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        })
        user.value = null
    }

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