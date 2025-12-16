<script setup lang="ts">
const props = defineProps<{
  musicApp: MusicApp;
}>();

const handleConnect = () => {
  props.musicApp.onConnect?.();
};

const handleDisconnect = () => {
  props.musicApp.onDisconnect?.();
};
</script>

<template>
  <div>
    <!-- Gauche: Icône et Nom -->
    <div class="flex gap-3 mb-4 items-center">
      <div
        :class="[
          musicApp.color,
          'w-10 h-10 rounded-lg flex items-center justify-center',
        ]"
      >
        <UIcon :name="musicApp.icon" class="w-7 h-7 text-white" />
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-white">
          {{ musicApp.name }}
        </p>
        <p class="text-xs text-slate-400">
          {{
            musicApp.isConnected
              ? "Connected"
              : musicApp.isCommingSoon
              ? "Coming Soon"
              : "Not connected"
          }}
        </p>
      </div>
      <NuxtLink
        v-if="musicApp.isConnected"
        to="/spotify/analyse"
        class="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        <UIcon name="i-lucide-chevron-right" class="w-7 h-7" />
      </NuxtLink>
    </div>

    <!-- Droite: Boutons -->
    <div class="flex gap-2">
      <UButton
        v-if="musicApp.isConnected"
        color="error"
        size="xs"
        variant="outline"
        class="flex-1 cursor-pointer"
        @click="handleDisconnect"
      >
        Disconnect
      </UButton>
      <UButton
        v-else-if="musicApp.isCommingSoon"
        color="neutral"
        size="xs"
        disabled
        class="flex-1 cursor-pointer"
      >
        Coming Soon
      </UButton>
      <UButton
        v-else
        color="primary"
        size="xs"
        class="flex-1 cursor-pointer"
        @click="handleConnect"
      >
        Connect
      </UButton>
    </div>
  </div>
</template>
