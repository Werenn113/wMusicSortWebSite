/**
 * Composable gérant la déconnexion de l'utilisateur.
 * 
 * Fournit une méthode pour déconnecter l'utilisateur, afficher une notification
 * et rediriger vers la page d'accueil.
 * 
 * @returns Objet contenant le handler de déconnexion
 * 
 * @example
 * ```vue
 * <script setup>
 * const { onClickLogoutButton } = useLogout()
 * </script>
 * 
 * <template>
 *   <UButton @click="onClickLogoutButton">Se déconnecter</UButton>
 * </template>
 * ```
 */
export const useLogout = () => {
    const auth = useAuthStore()
    const toast = useToast()
    const router = useRouter()

    /**
     * Gestionnaire du clic sur le bouton de déconnexion.
     * 
     * Déconnecte l'utilisateur, affiche un toast de confirmation et
     * redirige vers la page d'accueil.
     */
    async function onClickLogoutButton() {
        await auth.logout()

        toast.add({ title: 'Logout successful', description: 'You are now logged out.', color: 'success' })
        router.push("/")
    }

    return {
        onClickLogoutButton
    }
}