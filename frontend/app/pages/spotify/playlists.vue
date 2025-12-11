<template>
    <div>
        <h1>Playlists</h1>

        <div v-if="error">
            Erreur: {{ (error as any).message || error }}
        </div>

        <div v-else-if="pending">Chargement...</div>

        <ul v-else class="playlists-list">
            <li v-for="pl in playlists" :key="pl.id" class="playlist-item">
                <img v-if="pl.image && pl.image[0]" :src="pl.image[0]" alt="playlist image" width="64" height="64" />
                <div class="playlist-meta">
                    <div class="playlist-name">{{ pl.name }}</div>
                    <div class="playlist-owner">Par: {{ pl.owner?.display_name || pl.owner?.id }}</div>
                    <div class="playlist-count">Titres: {{ pl.tracksCount }}</div>
                </div>
            </li>
            <li v-if="!playlists || playlists.length === 0">Aucune playlist trouvée.</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
type Owner = { id: string; display_name?: string };
type Playlist = { id: string; image: string[]; name: string; owner: Owner; tracksCount: number; url?: string };

const { data: playlists, pending, error } = await useFetch<Playlist[]>('/api/spotify/playlists', {
    credentials: 'include',
    server: false
});
</script>

<style scoped>
.playlists-list { list-style: none; padding: 0; margin: 0; }
.playlist-item { display: flex; gap: 12px; align-items: center; padding: 8px 0; border-bottom: 1px solid #eee; }
.playlist-meta { display: flex; flex-direction: column; }
.playlist-name { font-weight: 600; }
.playlist-owner, .playlist-count { color: #666; font-size: 0.9em; }
</style>