<!--
  Composant d'affichage et de sélection des playlists Spotify.
  
  Récupère les playlists de l'utilisateur depuis l'API backend et permet
  de sélectionner une playlist pour afficher ses tracks.
  
  Fonctionnalités :
  - Chargement des playlists au montage du composant
  - Sélection visuelle de la playlist active
  - Récupération des tracks au clic
  - Gestion d'erreurs avec notifications toast
  - Mise à jour de l'état global via useSelectedPlaylist
-->
<script setup lang="ts">
const { setPlaylist, clearPlaylist } = useSelectedPlaylist();
const toast = useToast();

const playlists = await $fetch<Playlist[]>("/api/spotify/playlists", {
  credentials: "include",
});

const selectedPlaylist = ref<Playlist | null>(null);

const selectPlaylist = async (playlist: Playlist) => {
  selectedPlaylist.value = playlist;
  clearPlaylist();

  try {
    const tracks = await $fetch<Track[]>(`/api/spotify/tracks/${playlist.id}`, {
      credentials: "include",
    });
    setPlaylist(playlist.name, tracks);
  } catch (err: unknown) {
    toast.add({
      title: "No music found",
      description: "Error retrieving music from the playlist",
      color: "error",
    });
  }
};
</script>

<template>
  <div
    class="col-span-3 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col"
  >
    <div class="p-4 border-b border-slate-700">
      <h2 class="text-xl font-bold">Playlists</h2>
    </div>

    <div class="space-y-2 p-4 overflow-y-auto">
      <div
        v-for="playlist in playlists"
        :key="playlist.id"
        @click="selectPlaylist(playlist)"
        :class="[
          'flex gap-3 items-center p-3 rounded-lg cursor-pointer transition-all',
          selectedPlaylist?.id === playlist.id
            ? 'bg-primary-500/20 border-2 border-primary-500'
            : 'bg-slate-900 border border-slate-700 hover:border-slate-600 hover:bg-slate-900/70',
        ]"
      >
        <img :src="playlist.image[0]" class="w-14 h-14 rounded-md" />
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-sm truncate">{{ playlist.name }}</div>
          <div class="text-xs text-slate-400 mt-1">
            {{ playlist.tracksCount }} tracks
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
