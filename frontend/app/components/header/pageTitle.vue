<script setup lang="ts">
defineProps({
  icon: {
    type: String,
  },
  title: {
    type: String,
  },
});
</script>

<template>
  <NuxtLink to="/" class="flex items-center gap-2 group">
    <div
      class="w-10 h-10 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center"
    >
      <UIcon :name="icon" class="w-6 h-6 text-white" />
    </div>
    <span
      class="text-xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent"
      >{{ title }}</span
    >
  </NuxtLink>
</template>
