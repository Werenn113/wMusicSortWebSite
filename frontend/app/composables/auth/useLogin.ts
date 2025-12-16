import type { FormSubmitEvent } from "@nuxt/ui"

/**
 * Composable managing user login logic.
 * Provides validation schema, form state and submission method.
 */
export const useLogin = () => {
    const authStore = useAuthStore()
    const toast = useToast()
    const router = useRouter()

    /**
     * Reactive object containing form data.
     * Initialized with undefined values.
     */
    const loginDatas = reactive<Partial<LoginSchema>>({
        email: undefined,
        password: undefined
    })
    
    /**
     * Handles login form submission.
     * Attempts to log in the user via the authentication store, displays a toast notification and redirects on success.
     *
     * @param event - The submission event containing schema-validated data.
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