<script setup lang="ts">
const { musicApps } = useMusicApps();
const authStore = useAuthStore();

onMounted(() => {
  authStore.checkSpotifyConnection();
});

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950"
  >
    <DashboardTitle />

    <!-- Music Apps Grid -->
    <div class="max-w-7xl mx-auto px-8">
      <h2 class="text-2xl font-bold text-white mb-4">Music apps</h2>
      <div class="grid grid-cols-4 gap-4">
        <DashboardMusicAppCard
          v-for="musicApp in musicApps"
          :key="musicApp.name"
          :music-app="musicApp"
          class="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-slate-600 transition-all"
        />
      </div>
    </div>

    <div></div>
  </div>
</template>
