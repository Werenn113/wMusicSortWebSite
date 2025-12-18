<!--
  Composant d'affichage des catégories sous forme de badges.
  
  Affiche la liste des catégories créées avec un bouton de suppression.
  Chaque catégorie a une couleur unique.
  
  Props :
  - categories : Liste des catégories à afficher
  
  Events :
  - remove : Émis lors du clic sur le bouton de suppression
-->
<script setup lang="ts">
const props = defineProps<{
  categories: Category[];
}>();

const emit = defineEmits<{
  remove: [categoryName: string];
}>();

const removeCategory = (categoryName: string) => {
  emit("remove", categoryName);
};
</script>

<template>
  <div class="flex flex-wrap gap-2 min-h-10">
    <div
      v-for="category in categories"
      :key="category.name"
      :class="[
        'inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm',
        category.color,
      ]"
    >
      {{ category.name }}
      <button
        @click="removeCategory(category.name)"
        class="hover:bg-white/20 rounded-full w-5 h-5 flex items-center justify-center transition-colors cursor-pointer"
      >
        ×
      </button>
    </div>

    <div
      v-if="categories.length === 0"
      class="text-slate-400 italic text-sm py-2"
    >
      No categories created
    </div>
  </div>
</template>
