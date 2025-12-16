export const useLogout = () => {
    const auth = useAuthStore()
    const toast = useToast()
    const router = useRouter()

    async function onClickLogoutButton() {
        await auth.logout()

        toast.add({ title: 'Logout successful', description: 'You are now logged out.', color: 'success' })
        router.push("/")
    }

    return {
        onClickLogoutButton
    }
}