<!--
  Composant de la section Product dans le footer.
  
  Liste des liens liés au produit (Home, Features, Pricing).
  
  Fonctionnalités :
  - Liens de navigation vers les sections principales
  - Support du dark mode
  - Effets hover
-->
<template>
  <div>
    <h3 class="font-semibold text-slate-900 dark:text-white mb-4">Product</h3>
    <ul class="space-y-2 text-sm">
      <li>
        <NuxtLink
          to="/"
          class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
          >Home</NuxtLink
        >
      </li>
      <li>
        <a
          href="#features"
          class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
          >Features</a
        >
      </li>
      <li>
        <a
          href="#pricing"
          class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
          >Pricing</a
        >
      </li>
    </ul>
  </div>
</template>
