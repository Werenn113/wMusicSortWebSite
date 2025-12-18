<!--
  Composant racine de l'application Nuxt.
  
  Point d'entrée principal qui intègre :
  - UApp : Wrapper Nuxt UI
  - NuxtLayout : Système de layouts (default)
  - NuxtPage : Rendu des pages basé sur le routing
-->
<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
