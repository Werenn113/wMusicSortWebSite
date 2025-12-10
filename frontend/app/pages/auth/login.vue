<script setup lang="ts">
const { loginDatas, onSubmit } = useLogin()

definePageMeta({
  middleware: 'guest'
})
</script>

<template>
  <UContainer class="flex justify-center items-center min-h-screen">
    <UCard class="w-full max-w-sm">
      <template #header>
        <h1 class="text-2xl font-bold text-center">Login</h1>
      </template>

      <UForm :schema="loginSchema" :state="loginDatas" class="space-y-4" @submit="onSubmit">
        <UFormField label="Email" name="email">
          <UInput v-model="loginDatas.email" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="loginDatas.password" type="password" />
        </UFormField>

        <UButton type="submit" block>
          Submit
        </UButton>
      </UForm>

      <template #footer>
        <p class="text-center text-sm">
          Don't have an account? 
          <ULink to="/auth/register" class="text-primary">Register</ULink>
        </p>
      </template>
    </UCard>
  </UContainer>
</template>