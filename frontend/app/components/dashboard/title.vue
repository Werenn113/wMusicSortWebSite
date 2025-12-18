<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <div class="max-w-7xl mx-auto px-8 py-12 space-y-4">
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
      Welcome back,
      <span class="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">{{ authStore.user?.username }}</span
      >!
    </h1>
    <p class="text-lg text-slate-400">
      Manage your music and discover new playlists with AI-powered
      recommendations
    </p>
  </div>
</template>
