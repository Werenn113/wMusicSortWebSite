<!--
  Composant orchestrateur de gestion des catégories musicales.
  
  Combine l'input de création et l'affichage des catégories en badges.
  Utilise useCategoryManager pour gérer l'état global des catégories.
  
  Fonctionnalités :
  - Ajout de nouvelles catégories avec validation
  - Affichage des catégories sous forme de badges colorés
  - Suppression de catégories
  - Bouton "Start Sorting" pour lancer l'analyse
-->
<script setup lang="ts">
const { categories, addCategory, removeCategory } = useCategoryManager();
const { isLoading, isFinish, startAnalysis } = useStartAnalysis();
</script>

<template>
  <div
    class="max-w-7xl mx-auto bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6"
  >
    <h1 class="text-3xl font-bold mb-6">Spotify Playlist Sorting</h1>

    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-3">Categories</h3>

      <AnalyseCategoryInput :categories="categories" @add="addCategory" />

      <AnalyseCategoryButton
        :categories="categories"
        @remove="removeCategory"
      />
    </div>

    <div class="flex gap-3">
      <UButton
        @click="startAnalysis"
        :loading="isLoading"
        :disabled="isLoading || categories.length === 0"
        color="primary"
        size="xl"
        class="px-8 cursor-pointer"
      >
        <UIcon name="i-lucide-play" />
        {{ isLoading ? "Analyzing..." : "Start Sorting" }}
      </UButton>

      <UButton
        :disabled="!isFinish"
        color="primary"
        size="xl"
        class="px-8 cursor-pointer"
      >
        Add to Spotify
      </UButton>
    </div>
  </div>
</template>
