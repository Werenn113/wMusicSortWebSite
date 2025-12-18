/**
 * Configuration de l'application Nuxt.
 * 
 * Définit les paramètres globaux de l'interface utilisateur Nuxt UI.
 * 
 * Configuration actuelle :
 * - Couleur primaire : green (pour Spotify)
 * - Couleur neutre : slate (pour le thème sombre)
 */
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    }
  }
})
