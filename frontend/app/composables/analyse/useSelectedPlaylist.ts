/**
 * Composable gérant l'état global de la playlist sélectionnée pour analyse.
 * 
 * Utilise l'API useState de Nuxt pour partager l'état entre composants.
 * Les valeurs sont en lecture seule pour éviter les modifications directes.
 * 
 * @returns API pour gérer la playlist sélectionnée
 * 
 * @example
 * ```typescript
 * // Dans le composant de sélection de playlist
 * const { setPlaylist } = useSelectedPlaylist()
 * setPlaylist('Ma Playlist', tracks)
 * 
 * // Dans le composant d'affichage des tracks
 * const { selectedTracks, selectedPlaylistName } = useSelectedPlaylist()
 * console.log(`Tracks de ${selectedPlaylistName.value}`)
 * ```
 */
export const useSelectedPlaylist = () => {
    /** Liste des tracks de la playlist sélectionnée (état global) */
    const selectedTracks = useState<Track[]>('selectedPlaylistTracks', () => [])

    /** Nom de la playlist sélectionnée (état global) */
    const selectedPlaylistName = useState<string>('selectedPlaylistName', () => '')

    /**
     * Définit la playlist sélectionnée avec son nom et ses tracks.
     * 
     * @param name - Nom de la playlist
     * @param tracks - Liste des tracks de la playlist
     */
    const setPlaylist = (name: string, tracks: Track[]) => {
        selectedPlaylistName.value = name
        selectedTracks.value = tracks
    }

    /**
     * Réinitialise la playlist sélectionnée.
     * Vide la liste des tracks et efface le nom de la playlist.
     */
    const clearPlaylist = () => {
        selectedTracks.value = []
        selectedPlaylistName.value = ''
    }

    /**
     * Met à jour le genre d'une track spécifique.
     * 
     * @param trackId - L'ID de la track à mettre à jour
     * @param genre - Le nouveau genre à assigner
     */
    const updateTrackGenre = (trackId: string, genreName: string, genreConfidence: number) => {
        const track = selectedTracks.value.find(t => t.id === trackId)
        if (track) {
            track.genre = {
                name: genreName,
                confidence: genreConfidence
            }
        }
    }

    return {
        selectedTracks: readonly(selectedTracks),
        selectedPlaylistName: readonly(selectedPlaylistName),
        setPlaylist,
        clearPlaylist,
        updateTrackGenre
    }
}