<!--
  Page d'analyse des playlists Spotify.
  
  Interface principale pour analyser et catégoriser les playlists Spotify.
  Permet de créer des catégories et de visualiser les playlists/tracks.
  
  Middleware : spotify (nécessite authentification + connexion Spotify)
  
  Fonctionnalités :
  - Gestion des catégories musicales
  - Visualisation des playlists Spotify
  - Affichage des tracks d'une playlist
  - Layout en grille 12 colonnes
-->
<template>
  <div
    class="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to slate-950 p-6"
  >
    <AnalyseCategoryManager />

    <div
      class="max-w-7xl mx-auto grid grid-cols-12 gap-6 h-[calc(100vh-16rem)]"
    >
      <AnalysePlaylistViewer />
      <AnalyseTracksViewer />
    </div>
  </div>
</template>
