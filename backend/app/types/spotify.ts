/**
 * Représente un utilisateur Spotify
 * @interface SpotifyUser
 */
interface SpotifyUser {
  external_urls: { spotify: string }
  href: string
  id: string
  type: string
  uri: string
  display_name?: string
}

/**
 * Représente une image Spotify avec dimensions optionnelles
 * @interface SpotifyImage
 */
interface SpotifyImage {
  url: string
  height?: number
  width?: number
}

/**
 * Représente une playlist Spotify complète avec toutes ses métadonnées
 * @interface SpotifyPlaylist
 */
interface SpotifyPlaylist {
  collaborative: boolean
  description: string
  external_urls: { spotify: string }
  href: string
  id: string
  images: SpotifyImage[]
  name: string
  owner: SpotifyUser
  public: boolean
  snapshot_id: string
  tracks: { href: string, total: number }
  type: string
  uri: string
}

/**
 * Réponse de l'API Spotify pour la liste des playlists
 * Inclut la pagination et les métadonnées de la requête
 * @interface SpotifyPlaylistsResponse
 * @exports
 */
export interface SpotifyPlaylistsResponse {
  href: string
  limit: number
  next?: string
  offset: number
  previous?: string
  total: number
  items: SpotifyPlaylist[]
}

/**
 * Réponse de l'API Spotify lors du rafraîchissement d'un token OAuth
 * @interface SpotifyRefreshResponse
 * @exports
 */
export interface SpotifyRefreshResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token?: string
  scope: string
}

/**
 * Version simplifiée d'une playlist pour l'application
 * Contient uniquement les données essentielles pour l'affichage
 * @interface Playlist
 * @exports
 */
export interface Playlist {
  id: string
  image: string[]
  name: string
  owner: SpotifyUser
  tracksCount: number
  url: string
}

/**
 * Représente un artiste Spotify
 * @interface SpotifyArtists
 * @exports
 */
export interface SpotifyArtists {
  external_urls: { spotify: string }
  href: string
  id: string
  name: string
  type: string
  uri: string
}

/**
 * Représente un album Spotify avec toutes ses métadonnées
 * @interface SpotifyAlbum
 */
interface SpotifyAlbum {
  album_type: string
  total_tracks: number
  available_markets: string[]
  external_urls: { spotify: string }
  href: string
  id: string
  images: SpotifyImage[]
  name: string
  release_date: string
  release_date_precision: string
  restrictions: { reason: string }
  type: string
  uri: string
  artists: SpotifyArtists[]
}

/**
 * Représente un morceau (track) Spotify complet avec toutes ses données
 * @interface SpotifyTrackObject
 */
interface SpotifyTrackObject {
  album: SpotifyAlbum
  artists: SpotifyArtists[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: { isrc: string, ean: string, upc: string }
  external_urls: { spotify: string }
  href: string
  id: string
  is_playable: boolean
  linked_from: Object // pas plus d'info d'après la doc
  restrictions: { reason: string }
  name: string
  popularity: number
  preview_url?: string // deprecated
  track_number: string
  type: string
  uri: string
  is_local: boolean
}

/**
 * Représente un podcast (show) Spotify
 * @interface SpotifyShow
 */
interface SpotifyShow {
  available_markets: string[]
  copyrights: { text: string, type: string }[]
  description: string
  html_description: string
  explicit: boolean
  external_urls: { spotify: string }
  href: string
  id: string
  images: SpotifyImage[]
  is_externally_hosted: boolean
  languages: string[]
  media_type: string
  name: string
  publisher: string
  type: string
  uri: string
  total_episodes: number
}

/**
 * Représente un épisode de podcast Spotify
 * @interface SpotifyEpisodeObject
 */
interface SpotifyEpisodeObject {
  audio_preview_url?: string // deprecated
  description: string
  html_description: string
  duration_ms: number
  explicit: boolean
  external_urls: { spotfiy: string }
  href: string
  id: string
  images: SpotifyImage[]
  is_externally_hosted: boolean
  is_playable: boolean
  language: string // deprecated
  languages: string[]
  name: string
  release_date: string
  release_date_precision: string
  resume_point: { fully_played: boolean, resume_position_ms: number }
  type: string
  uri: string
  restrictions: { reason: string }
  show: SpotifyShow
}

/**
 * Représente un morceau dans une playlist avec métadonnées d'ajout
 * @interface SpotifyPlaylistTrackObject
 */
interface SpotifyPlaylistTrackObject {
  added_at: string
  added_by: SpotifyUser
  is_local: boolean
  track: SpotifyTrackObject // | SpotifyEpisodeObject
}

/**
 * Réponse de l'API Spotify pour la liste des morceaux d'une playlist
 * Inclut la pagination et les métadonnées de la requête
 * @interface SpotifyTracksResponse
 * @exports
 */
export interface SpotifyTracksResponse {
  href: string
  limit: number
  next?: string
  offset: number
  previous?: string
  total: number
  items: SpotifyPlaylistTrackObject[]
}

/**
 * Version simplifiée d'un morceau pour l'application
 * Contient uniquement l'ID, le nom et les artistes
 * @interface Track
 * @exports
 */
export interface Track {
  id: string
  name: string
  artists: string[]
}

/**
 * Représente un score de confiance pour une catégorie donnée
 * @interface CategoryConfidence
 * @exports
 */
export interface CategoryConfidence {
  name: string
  confidence: number // Pourcentage de confiance (0-100)
}

/**
 * Représente un morceau classifié par l'IA Gemini
 * Contient les informations de la track avec toutes les catégories et leurs scores de confiance
 * @interface GeminiClassifiedTrack
 * @exports
 */
export interface GeminiClassifiedTrack {
  id: string
  title: string
  artists: string[]
  categories: CategoryConfidence[]
}