<!--
  Composant de la section marque dans le footer.
  
  Affiche le logo, le nom de l'application et le slogan.
  
  Fonctionnalités :
  - Logo avec icône et gradient
  - Nom de l'application
  - Description courte (tagline)
-->
<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <div
        class="w-8 h-8 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center"
      >
        <UIcon name="i-lucide-music" class="w-5 h-5 text-white" />
      </div>
      <span class="font-bold text-slate-900 dark:text-white">wMusicSort</span>
    </div>
    <p class="text-sm text-slate-600 dark:text-slate-400">
      Sort your music with AI power
    </p>
  </div>
</template>
