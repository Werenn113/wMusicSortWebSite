<script setup lang="ts">
const links = [
  { text: "Home", to: "/" },
  { text: "Features", to: "#features" },
  { text: "Pricing", to: "#pricing" },
];
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700"
  >
    <nav class="px-4">
      <div class="flex items-center h-16 relative">
        <!-- Logo (Left) -->
        <div class="flex-shrink-0">
          <HeaderPageTitle title="wMusicSort" icon="i-lucide-music" />
        </div>

        <!-- Menu (Center) -->
        <div class="absolute left-1/2 transform -translate-x-1/2">
          <div class="flex items-center gap-8">
            <HeaderButtonLink :links="links" />
          </div>
        </div>

        <!-- Auth Buttons (Right) -->
        <div class="ml-auto flex items-center gap-3">
          <HeaderAuthButtons />
        </div>
      </div>
    </nav>
  </header>
</template>
