<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { userStore } from '~/stores/users'
import zod from 'zod'

const schema = zod.object({
  email: zod.email('Invalid email'),
  password: zod.string('Password is required').min(8, 'Must be at least 8 characters')
})

type Schema = zod.output<typeof schema>

const loginInformations = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
})

const users = userStore()
const toast = useToast()
const router = useRouter()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await users.authenticate(event.data)
    toast.add({ title: 'Connexion réussie', description: 'Vous êtes maintenant connecté.', color: 'success' })
    // router.push('/')
  } catch (error: any) {
    toast.add({ title: 'Erreur de connexion', description: error.message || 'Une erreur est survenue lors de la connexion.', color: 'error' })
    console.error('Erreur d\'authentification:', error)
  }
}
</script>

<template>
  <UForm :schema="schema" :state="loginInformations" class="space-y-4" @submit="onSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="loginInformations.email" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput v-model="loginInformations.password" type="password" />
    </UFormField>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>