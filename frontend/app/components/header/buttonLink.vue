<script setup lang="ts">
defineProps({
  links: {
    type: Array,
  },
});
</script>

<template>
  <NuxtLink
    v-for="link in links"
    :key="link.to"
    :to="link.to"
    class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
  >
    {{ link.text }}
  </NuxtLink>
</template>
