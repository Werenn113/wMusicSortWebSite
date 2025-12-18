<!--
  Composant de saisie pour créer de nouvelles catégories.
  
  Fournit un champ de texte avec validation en temps réel et bouton d'ajout.
  Gère les erreurs (doublons) avec feedback visuel.
  
  Props :
  - categories : Liste des catégories existantes (pour validation)
  
  Events :
  - add : Émis lors de l'ajout d'une catégorie valide
  
  Fonctionnalités :
  - Ajout via touche Entrée ou bouton
  - Animation de secousse en cas d'erreur
  - Bordure rouge si doublon détecté
-->
<script setup lang="ts">
const props = defineProps<{
  categories: Category[];
}>();

const emit = defineEmits<{
  add: [categoryName: string];
}>();

const categoriesRef = toRef(props, "categories");
const { newCategoryName, hasError, isShaking, validateAndGetName, resetInput } =
  useCategoryInput(categoriesRef);

const addCategory = () => {
  const validName = validateAndGetName();
  if (validName) {
    emit("add", validName);
    resetInput();
  }
};
</script>

<template>
  <div class="flex gap-3 mb-3">
    <input
      v-model="newCategoryName"
      @keyup.enter="addCategory"
      type="text"
      placeholder="Enter a category name"
      :class="[
        'flex-1 bg-slate-900 border rounded-lg px-2 py-2 focus:outline-none transition-all',
        hasError
          ? 'border-red-500 bg-red-900/20 focus:border-red-500'
          : 'border-slate-600 focus:border-primary-500',
        isShaking ? 'animate-shake' : '',
      ]"
    />
    <UButton @click="addCategory" size="lg" class="px-6 cursor-pointer">
      <UIcon name="i-lucide-plus" />
      Add
    </UButton>
  </div>
</template>
