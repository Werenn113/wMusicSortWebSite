<script setup lang="ts">
const { loginDatas, onSubmit } = useLogin()

definePageMeta({
  middleware: 'guest'
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="flex items-center justify-center gap-2 mb-6 group">
          <div class="w-12 h-12 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
            <UIcon name="i-lucide-music" class="w-7 h-7 text-white" />
          </div>
        </NuxtLink>
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h1>
        <p class="text-slate-600 dark:text-slate-400">Sign in to your wMusicSort account</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
        <UForm :schema="loginSchema" :state="loginDatas" class="space-y-6" @submit="onSubmit">
          <UFormField label="Email" name="email">
            <UInput
              v-model="loginDatas.email"
              placeholder="you@example.com"
              class="bg-slate-50 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600"
            />
          </UFormField>

          <UFormField label="Password" name="password">
            <UInput
              v-model="loginDatas.password"
              type="password"
              placeholder="••••••••"
              class="bg-slate-50 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600"
            />
          </UFormField>

          <UButton type="submit" block color="primary" size="lg" class="btn-transition">
            <UIcon name="i-lucide-log-in" />
            Sign In
          </UButton>
        </UForm>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-200 dark:border-slate-600"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">or</span>
          </div>
        </div>

        <!-- Footer -->
        <p class="text-center text-slate-600 dark:text-slate-400 text-sm">
          Don't have an account?
          <NuxtLink to="/auth/register" class="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
            Create one
          </NuxtLink>
        </p>
      </div>

      <!-- Back to Home -->
      <div class="text-center mt-6">
        <NuxtLink to="/" class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm">
          ← Back to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>