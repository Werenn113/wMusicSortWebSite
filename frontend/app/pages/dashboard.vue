<script setup lang="ts">
const auth = useAuthStore()
const router = useRouter()
const toast = useToast()

async function logout() {
    await auth.logout()
    
    toast.add({ title: 'Connexion réussie', description: 'Vous êtes maintenant connecté.', color: 'success' })
    router.push("/")
}

definePageMeta({
    middleware: 'auth'
})
</script>

<template>
    <UContainer>
        <UCard class="mt-10">
            <template #header>
                <h1 class="text-2xl font-bold">Dashboard</h1>
            </template>

            <p>Welcome to your dashboard, {{ auth.user?.username }}!</p>

            <template #footer>
                <UButton label="Disconnect" color="red" @click="logout"/>
            </template>
        </UCard>
    </UContainer>
</template>
