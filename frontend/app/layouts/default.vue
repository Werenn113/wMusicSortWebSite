<script setup lang="ts">
const auth = useAuthStore();
const { user, isAuthenticated } = storeToRefs(auth);
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-slate-950">
    <HeaderBar />

    <main class="min-h-[calc(100vh-4rem)]">
      <slot />
    </main>

    <FooterBar />
  </div>
</template>
