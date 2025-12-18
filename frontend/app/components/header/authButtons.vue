<!--
  Composant des boutons d'authentification dans le header.
  
  Affiche différents boutons selon l'état d'authentification :
  - Non authentifié : Boutons Sign In / Register
  - Authentifié : Dropdown menu avec username, Dashboard et Logout
  
  Fonctionnalités :
  - Affichage conditionnel selon authStore
  - Menu déroulant pour utilisateur connecté
  - Actions de navigation et déconnexion
-->
<script setup lang="ts">
const authStore = useAuthStore();
const { onClickLogoutButton } = useLogout();

const dropdownItems = [
  [{ label: "Dashboard", to: "/dashboard" }],
  [{ label: "Logout", onSelect: onClickLogoutButton, class: "cursor-pointer" }],
];
</script>

<template>
  <!-- Auth Actions -->
  <div v-if="!authStore.isAuthenticated" class="flex items-center gap-3">
    <UButton
      to="/auth/login"
      variant="ghost"
      color="neutral"
      size="sm"
      class="hidden sm:inline-flex"
    >
      Sign In
    </UButton>
    <UButton
      to="/auth/register"
      color="primary"
      size="sm"
      class="hidden sm:inline-flex"
    >
      Register
    </UButton>
  </div>

  <div v-else>
    <UDropdownMenu :items="dropdownItems">
      <UButton
        icon="i-lucide-user"
        variant="ghost"
        color="neutral"
        size="sm"
        class="cursor-pointer"
      >
        {{ authStore.user?.username }}
      </UButton>
    </UDropdownMenu>
  </div>
</template>
