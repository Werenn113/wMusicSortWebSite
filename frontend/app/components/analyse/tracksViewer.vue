<!--
  Composant d'affichage des tracks de la playlist sélectionnée.
  
  Affiche la liste des morceaux avec leur numéro, titre et artistes.
  Consomme l'état global de useSelectedPlaylist.
  
  Fonctionnalités :
  - Affichage numéroté des tracks
  - Informations : nom, artistes, genre
  - Message d'invite si aucune playlist sélectionnée
  - Scroll automatique pour listes longues
  - Effet hover sur les tracks
-->
<script setup lang="ts">
const { selectedTracks, selectedPlaylistName } = useSelectedPlaylist();
</script>

<template>
  <div
    class="col-span-9 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col"
  >
    <div class="p-4 border-b border-slate-700">
      <h2 class="text-xl font-bold">
        <UIcon name="i-lucide-music-2" class="mr-2" /> Tracks
        <span
          v-if="selectedPlaylistName"
          class="text-slate-400 text-base font-normal ml-2"
        >
          - {{ selectedPlaylistName }}</span
        >
      </h2>
    </div>

    <div class="overflow-y-auto p-4">
      <div
        v-if="!selectedPlaylistName"
        class="text-center py-20 text-slate-400"
      >
        <UIcon
          name="i-lucide-mouse-pointer-click"
          class="text-6xl mb-4 opacity-50"
        />
        <p class="text-lg">Select a playlist to view tracks</p>
      </div>
      <div
        v-else
        v-for="(track, index) in selectedTracks"
        :key="track.id"
        class="flex items-center gap-4 p-3 hover:bg-slate-900/50 rounded-lg transition-colors group"
      >
        <div class="w-2 mr-2 text-slate-400 text-sm">
          {{ index + 1 }}
        </div>
        <div>
          <div
            class="max-w-[300px] truncate group-hover:text-primary-400 transition-colors"
          >
            {{ track.name }}
          </div>
          <div class="max-w-[300px] truncate text-sm text-slate-400 mt-0.5">
            {{ track.artists.join(", ") }}
          </div>
        </div>
        <div class="ml-auto mr-16">{{ track.genre ? track.genre : "-" }}</div>
      </div>
    </div>
  </div>
</template>
