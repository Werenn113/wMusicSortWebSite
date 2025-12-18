import type { FormSubmitEvent } from "@nuxt/ui"

/**
 * Composable gérant la logique d'enregistrement d'un nouvel utilisateur.
 * 
 * Fournit la validation de formulaire, l'envoi des données et la gestion des erreurs
 * pour le processus d'inscription.
 * 
 * @returns Objet contenant les données du formulaire et le handler de soumission
 * 
 * @example
 * ```vue
 * <script setup>
 * const { registerDatas, onSubmit } = useRegister()
 * </script>
 * 
 * <template>
 *   <UForm :state="registerDatas" @submit="onSubmit" />
 * </template>
 * ```
 */
export const useRegister = () => {
    const authStore = useAuthStore()
    const toast = useToast()
    const router = useRouter()

    /**
     * Objet réactif contenant les données du formulaire d'enregistrement.
     * Initialisé avec des valeurs undefined pour la validation.
     */
    const registerDatas = reactive<Partial<RegisterSchema>>({
        email: undefined,
        username: undefined,
        password: undefined
    })

    /**
     * Gestionnaire de soumission du formulaire d'enregistrement.
     * 
     * Tente d'enregistrer le nouvel utilisateur via le store d'authentification,
     * affiche une notification toast et redirige vers le dashboard en cas de succès.
     * 
     * @param event - Événement de soumission contenant les données validées par le schéma Zod
     */
    async function onSubmit(event: FormSubmitEvent<RegisterSchema>) {
        try {
            await authStore.register(event.data)

            toast.add({
                title: "Registration successful",
                description: "You are now registered.",
                color: 'success'
            })

            router.push('/dashboard')
        } catch (error) {
            toast.add({
                title: "Registration failed",
                description: "Registration has failed.",
                color: 'error'
            })
        }
    }

    return {
        registerDatas,
        onSubmit
    }
}