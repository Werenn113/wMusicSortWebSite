<!--
  Page d'enregistrement utilisateur.
  
  Formulaire d'inscription avec validation Zod.
  Redirige vers /dashboard en cas de succès.
  
  Middleware : guest (redirige vers /dashboard si déjà authentifié)
  
  Fonctionnalités :
  - Formulaire email/username/password
  - Validation côté client (Zod)
  - Notifications toast pour les erreurs
  - Lien vers la page de connexion
-->
<script setup lang="ts">
const { registerDatas, onSubmit } = useRegister();

definePageMeta({
  middleware: "guest",
});
</script>

<template>
  <div
    class="flex min-h-screen justify-center items-start pt-10 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950"
  >
    <div class="bg-slate-800 rounded-xl p-8 border border-slate-700 w-[375px]">
      <!-- Logo -->
      <div class="pb-6 text-center">
        <UIcon name="i-lucide-user-plus" class="text-4xl mb-4" />
        <h1 class="font-bold text-2xl mb-2">Join wMusicSort</h1>
        <p>Create a wMusicSort account</p>
      </div>

      <!-- Form Card -->
      <UForm
        :schema="registerSchema"
        :state="registerDatas"
        class="space-y-6"
        @submit="onSubmit"
      >
        <UFormField label="Email" name="email">
          <UInput
            v-model="registerDatas.email"
            placeholder="Enter your email"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Username" name="username">
          <UInput
            v-model="registerDatas.username"
            placeholder="Enter your username"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput
            v-model="registerDatas.password"
            type="password"
            placeholder="Enter your password"
            class="w-full"
          />
        </UFormField>

        <UButton type="submit" block color="primary" size="lg">
          <UIcon name="i-lucide-user-plus" />
          Create Account
        </UButton>
      </UForm>

      <!-- Divider -->
      <div class="relative my-4">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-slate-600"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-slate-800 text-slate-400">or</span>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-center text-slate-400 text-sm">
        Already have an account?
        <NuxtLink
          to="/auth/login"
          class="text-primary-400 hover:text-slate-300"
        >
          Sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
