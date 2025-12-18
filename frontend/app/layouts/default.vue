<!--
  Layout par défaut de l'application.
  
  Fournit la structure commune à toutes les pages :
  - Header avec navigation et authentification
  - Contenu principal (slot)
  - Footer avec informations
-->
<template>
  <div class="min-h-screen bg-slate-950">
    <HeaderBar />

    <main class="min-h-[calc(100vh-4rem)]">
      <slot />
    </main>

    <FooterBar />
  </div>
</template>
