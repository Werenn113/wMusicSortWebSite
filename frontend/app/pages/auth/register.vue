<script setup lang="ts">
const { registerDatas, onSubmit } = useRegister()

definePageMeta({
  middleware: 'guest'
})
</script>

<template>
  <UContainer class="flex justify-center items-center min-h-screen">
    <UCard class="w-full max-w-sm">
      <template #header>
        <h1 class="text-2xl font-bold text-center">Register</h1>
      </template>
      <UForm :schema="registerSchema" :state="registerDatas" class="space-y-4" @submit="onSubmit">
        <UFormField label="Email" name="email">
          <UInput v-model="registerDatas.email" />
        </UFormField>

        <UFormField label="Username" name="username">
          <UInput v-model="registerDatas.username"/>
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="registerDatas.password" type="password" />
        </UFormField>

        <UButton type="submit" block>
          Submit
        </UButton>
      </UForm>
      <template #footer>
        <p class="text-center text-sm">
          Already have an account? 
          <ULink to="/auth/login" class="text-primary">Login</ULink>
        </p>
      </template>
    </UCard>
  </UContainer>
</template>