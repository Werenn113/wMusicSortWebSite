import type { FormSubmitEvent } from "@nuxt/ui"

export const useRegister = () => {
    const authStore = useAuthStore()
    const toast = useToast()
    const router = useRouter()

    const registerDatas = reactive<Partial<RegisterSchema>>({
        email: undefined,
        username: undefined,
        password: undefined
    })

    async function onSubmit(event: FormSubmitEvent<RegisterSchema>) {
        try {
            await authStore.register(event.data)

            toast.add({
                title: "Inscription réussie",
                description: "Vous êtes maintenant inscrit.",
                color: 'success'
            })

            router.push('/dashboard')
        } catch (error) {
            toast.add({
                title: "Echec de l'inscription",
                description: "L'inscription a échoué.",
                color: 'error'
            })
        }
    }

    return {
        registerDatas,
        onSubmit
    }
}