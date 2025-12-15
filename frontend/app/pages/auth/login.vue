<script setup lang="ts">
const { loginDatas, onSubmit } = useLogin();

definePageMeta({
  middleware: "guest",
});
</script>

<template>
  <div
    class="flex min-h-screen justify-center items-start pt-20 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950"
  >
    <!-- Form Card -->
    <div class="bg-slate-800 rounded-xl p-8 border border-slate-700 w-[375px]">
      <div class="pb-6 text-center">
        <UIcon name="i-lucide-lock" class="text-4xl mb-4" />
        <h1 class="font-bold text-2xl mb-2">Welcome Back</h1>
        <p>Log in with your wMusicSort account</p>
      </div>

      <UForm
        :schema="loginSchema"
        :state="loginDatas"
        class="space-y-6"
        @submit="onSubmit"
      >
        <UFormField label="Email" name="email">
          <UInput
            v-model="loginDatas.email"
            placeholder="Enter your email"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput
            v-model="loginDatas.password"
            type="password"
            placeholder="Enter your password"
            class="w-full"
          />
        </UFormField>

        <UButton type="submit" block color="primary" size="lg">
          <UIcon name="i-lucide-log-in" />
          Log In
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
        Don't have an account?
        <NuxtLink
          to="/auth/register"
          class="font-semibold text-primary-400 hover:text-slate-300"
        >
          Create one
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
