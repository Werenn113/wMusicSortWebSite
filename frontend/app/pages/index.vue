<template>
  <UContainer>
    <UCard class="mt-10">
      <template #header>
        <h1 class="text-2xl font-bold">Welcome to wMusicSort</h1>
      </template>

      <p class="text-lg">
        The best place to sort your music and create playlists with the power of AI.
      </p>

      <template #footer>
        <UButton to="/auth/register" size="xl" color="primary">Get Started</UButton>
      </template>
    </UCard>
  </UContainer>
</template>