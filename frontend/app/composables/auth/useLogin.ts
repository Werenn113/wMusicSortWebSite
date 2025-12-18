import type { FormSubmitEvent } from "@nuxt/ui" // TODO : voir si on peut enlever ça

/**
 * Composable gérant la logique de connexion utilisateur.
 * 
 * Fournit la validation de formulaire, l'envoi des données et la gestion des erreurs
 * pour le processus de connexion.
 * 
 * @returns Objet contenant les données du formulaire et le handler de soumission
 * 
 * @example
 * ```vue
 * <script setup>
 * const { loginDatas, onSubmit } = useLogin()
 * </script>
 * 
 * <template>
 *   <UForm :state="loginDatas" @submit="onSubmit" />
 * </template>
 * ```
 */
export const useLogin = () => {
    const authStore = useAuthStore()
    const toast = useToast()
    const router = useRouter()

    /**
     * Objet réactif contenant les données du formulaire de connexion.
     * Initialisé avec des valeurs undefined pour la validation.
     */
    const loginDatas = reactive<Partial<LoginSchema>>({
        email: undefined,
        password: undefined
    })

    /**
     * Gestionnaire de soumission du formulaire de connexion.
     * 
     * Tente de connecter l'utilisateur via le store d'authentification,
     * affiche une notification toast et redirige vers le dashboard en cas de succès.
     * 
     * @param event - Événement de soumission contenant les données validées par le schéma Zod
     */
    async function onSubmit(event: FormSubmitEvent<LoginSchema>) {
        try {
            await authStore.login(event.data)

            toast.add({
                title: "Login successful",
                description: "You are now logged in.",
                color: 'success'
            })

            router.push('/dashboard')
        } catch (error) {
            toast.add({
                title: "Login failed",
                description: "Email or password is incorrect.",
                color: 'error'
            })
        }
    }

    return {
        loginDatas,
        onSubmit
    }
}