/**
 * Représente un utilisateur de l'application.
 * 
 * @property id - Identifiant unique de l'utilisateur
 * @property username - Nom d'utilisateur affiché
 * @property email - Adresse email de l'utilisateur
 */
export type User = {
    id: string;
    username: string;
    email: string;
}

/**
 * Représente une application musicale (Spotify, Apple Music, etc.).
 * 
 * @property color - Classe CSS Tailwind pour la couleur (ex: "bg-green-500")
 * @property icon - Nom de l'icône Iconify (ex: "i-mdi-spotify")
 * @property name - Nom de l'application musicale
 * @property isConnected - État de connexion de l'utilisateur
 * @property isCommingSoon - Indique si l'application est en développement
 * @property onConnect - Callback optionnel pour la connexion
 * @property onDisconnect - Callback optionnel pour la déconnexion
 */
export type MusicApp = {
    color: string;
    icon: string;
    name: string;
    isConnected: boolean;
    isCommingSoon: boolean;
    onConnect?: () => void;
    onDisconnect?: () => void;
}

/**
 * Représente une catégorie de classement musical.
 * 
 * @property name - Nom de la catégorie
 * @property color - Classe CSS Tailwind pour la couleur
 */
export type Category = {
    name: string;
    color: string
}

/**
 * Représente une playlist musicale.
 * 
 * @property id - Identifiant unique de la playlist
 * @property image - Tableau d'URLs des images de couverture
 * @property name - Nom de la playlist
 * @property owner - Utilisateur propriétaire de la playlist
 * @property tracksCount - Nombre de morceaux dans la playlist
 * @property url - URL de la playlist sur la plateforme musicale
 */
export type Playlist = {
    id: string;
    image: string[];
    name: string;
    owner: User;
    tracksCount: number;
    url: string
}


/**
 * Represents a music genre with its associated confidence score.
 * 
 * @remarks
 * This type is used to store genre classification results, where the confidence
 * value indicates the certainty of the classification.
 * 
 * @property name - The name of the genre (e.g., "Rock", "Jazz", "Classical")
 * @property confidence - A numeric value representing the confidence level of the genre classification,
 *                        typically ranging from 0 to 100 where higher values indicate greater certainty
 */
export type Genre = {
    name: string
    confidence: number
}



/**
 * Représente un morceau musical.
 * 
 * @property id - Identifiant unique du morceau
 * @property name - Titre du morceau
 * @property artists - Liste des artistes du morceau
 * @property genre - Genre musical (déterminé par l'IA)
 */
export type Track = {
    id: string
    name: string
    artists: string[]
    genre: Genre
}


/**
 * Représente une piste musicale classifiée par Gemini.
 * 
 * @remarks
 * Ce type définit la structure d'une piste après son traitement par le système de classification Gemini.
 * 
 * @property id - L'identifiant unique de la piste
 * @property title - Le titre de la piste musicale
 * @property artists - La liste des artistes associés à la piste
 * @property category - La catégorie assignée à la piste par Gemini
 */
export type GeminiClassifiedTrack = {
    id: string
    title: string
    artists: string[]
    category: string
    confidence: number
}