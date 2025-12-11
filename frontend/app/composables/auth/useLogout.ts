export const useLogout = () => {
    const auth = useAuthStore()
    const toast = useToast()
    const router = useRouter()

    async function onClickLogoutButton() {
        await auth.logout()

        toast.add({ title: 'Déconnexion réussie', description: 'Vous êtes maintenant déconnecté.', color: 'success' })
        router.push("/")
    }

    return {
        onClickLogoutButton
    }
}