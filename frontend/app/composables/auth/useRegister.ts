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