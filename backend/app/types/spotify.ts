interface SpotifyUser {
  external_urls: { spotify: string }
  href: string
  id: string
  type: string
  uri: string
  display_name?: string
}

interface SpotifyImage {
  url: string
  height?: number
  width?: number
}

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

export interface SpotifyPlaylistsResponse {
  href: string
  limit: number
  next?: string
  offset: number
  previous?: string
  total: number
  items: SpotifyPlaylist[]
}

export interface SpotifyRefreshResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token?: string
  scope: string
}

export interface Playlist {
  id: string
  image: string[]
  name: string
  owner: SpotifyUser
  tracksCount: number 
  url: string
}

export interface SpotifyArtists {
  external_urls: { spotify: string }
  href: string
  id: string
  name: string
  type: string
  uri: string
}

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

interface SpotifyTrackObject {
  album: SpotifyAlbum
  artists: SpotifyArtists[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: { isrc: string, ean: string, upc: string}
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

interface SpotifyPlaylistTrackObject {
  added_at: string
  added_by: SpotifyUser
  is_local: boolean
  track: SpotifyTrackObject // | SpotifyEpisodeObject
}

export interface SpotifyTracksResponse {
  href: string
  limit: number
  next?: string
  offset: number
  previous?: string
  total: number
  items: SpotifyPlaylistTrackObject[]
}

export interface Tracks {
  id: string
  name: string
  artists: string[]
}