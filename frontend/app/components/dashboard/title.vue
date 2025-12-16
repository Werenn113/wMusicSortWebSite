<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <div class="max-w-7xl mx-auto px-8 py-12 space-y-4">
    <h1 class="hero-title">
      Welcome back,
      <span class="gradient-text">{{ authStore.user?.username }}</span
      >!
    </h1>
    <p class="text-lg text-slate-400">
      Manage your music and discover new playlists with AI-powered
      recommendations
    </p>
  </div>
</template>
