/**
 * Composable fournissant la liste des applications musicales supportées.
 * 
 * Retourne un computed contenant toutes les applications musicales avec leur état
 * de connexion et leurs callbacks d'action.
 * 
 * @returns Liste réactive des applications musicales disponibles
 * 
 * @example
 * ```vue
 * <script setup>
 * const { musicApps } = useMusicApps()
 * </script>
 * 
 * <template>
 *   <div v-for="app in musicApps" :key="app.name">
 *     {{ app.name }} - {{ app.isConnected ? 'Connecté' : 'Non connecté' }}
 *   </div>
 * </template>
 * ```
 */
export const useMusicApps = () => {
    const authStore = useAuthStore()
    const { spotifyConnection } = useSpotifyLogin()
    const { spotifyDisconnection } = useSpotifyLogout()

    /**
     * Liste computed des applications musicales avec leur configuration.
     * 
     * Applications actuellement configurées :
     * - Spotify (✅ disponible)
     * - Apple Music (🔜 à venir)
     * - YouTube Music (🔜 à venir)
     * - Deezer (🔜 à venir)
     * - Tidal (🔜 à venir)
     * - SoundCloud (🔜 à venir)
     * - Amazon Music (🔜 à venir)
     * - Pandora (🔜 à venir)
     */
    const musicApps = computed<MusicApp[]>(() => [
        {
            name: 'Spotify',
            icon: 'i-mdi-spotify',
            color: 'bg-green-500',
            isConnected: authStore.isSpotifyConnected,
            isCommingSoon: false,
            onConnect: spotifyConnection,
            onDisconnect: spotifyDisconnection
        },
        {
            name: 'Apple Music',
            icon: 'i-mdi-music',
            color: 'bg-red-500',
            isConnected: false,
            isCommingSoon: true
        },
        {
            name: 'YouTube Music',
            icon: 'i-mdi-youtube',
            color: 'bg-red-600',
            isConnected: false,
            isCommingSoon: true
        },
        {
            name: 'Deezer',
            icon: 'i-mdi-music-circle',
            color: 'bg-purple-500',
            isConnected: false,
            isCommingSoon: true
        },
        {
            name: 'Tidal',
            icon: 'i-mdi-waves',
            color: 'bg-blue-500',
            isConnected: false,
            isCommingSoon: true
        },
        {
            name: 'SoundCloud',
            icon: 'i-mdi-soundcloud',
            color: 'bg-orange-500',
            isConnected: false,
            isCommingSoon: true
        },
        {
            name: 'Amazon Music',
            icon: 'i-mdi-amazon',
            color: 'bg-cyan-500',
            isConnected: false,
            isCommingSoon: true
        },
        {
            name: 'Pandora',
            icon: 'i-mdi-music-box',
            color: 'bg-indigo-500',
            isConnected: false,
            isCommingSoon: true
        }
    ]);

    return {
        musicApps

    }
}
