<script setup lang="ts">
const auth = useAuthStore()
const { user, isAuthenticated } = storeToRefs(auth)
</script>

<template>
    <UHeader title="wMusicSort">
        <template #right>
            <template v-if="isAuthenticated">
                <UButton class="text-proper" :label="user?.username" variant="ghost" to="/dashboard"/>
            </template>

            <template v-if="!isAuthenticated">
                <UButton label="Login" color="primary" variant="ghost" to="/auth/login" />
                <UButton label="Register" color="primary" variant="ghost" to="/auth/register" />
            </template>
        </template>
    </UHeader>
    <UMain>
        <slot/>
    </UMain>
</template>