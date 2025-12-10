import type { FormSubmitEvent } from "@nuxt/ui"

/**
 * Composable gérant la logique de connexion de l'utilisateur.
 * Fournit le schéma de validation, l'état du formulaire et la méthode de soumission.
 */
export const useLogin = () => {
    const authStore = useAuthStore()
    const toast = useToast()
    const router = useRouter()

    /**
     * Objet réactif contenant les données du formulaire.
     * Initialisé avec des valeurs indéfinies.
     */
    const loginDatas = reactive<Partial<LoginSchema>>({
        email: undefined,
        password: undefined
    })
    
    /**
     * Gère la soumission du formulaire de connexion.
     * Tente de connecter l'utilisateur via le store d'authentification, affiche une notification (toast) et redirige en cas de succès.
     *
     * @param event - L'événement de soumission contenant les données validées par le schéma.
     */
    async function onSubmit(event: FormSubmitEvent<LoginSchema>) {
        try {
            await authStore.login(event.data)

            toast.add({
                title: "Connexion réussie",
                description: "Vous êtes maintenant connecté.",
                color: 'success'
            })

            router.push('/dashboard')
        } catch (error) {
            toast.add({
                title: "Echec de connexion",
                description: "L'email ou le mot de passe est incorrect.",
                color: 'error'
            })
        }
    }

    return {
        loginDatas,
        onSubmit
    }
}