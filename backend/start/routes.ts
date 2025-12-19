/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Controllers
import AuthController from '#controllers/auth_controller'
import SpotifyController from '#controllers/spotify_controller'
import GeminiController from '#controllers/gemini_controller'

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
| Routes pour la gestion de l'authentification des utilisateurs
| - Routes publiques : inscription et connexion
| - Routes protégées : déconnexion, suppression de compte, données utilisateur
*/
router
  .group(() => {
    // Public routes
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])

    // Protected routes
    router
      .group(() => {
        router.post('/logout', [AuthController, 'logout'])
        router.delete('/delete_user', [AuthController, 'delete_user'])
        router.get('/user_data', [AuthController, 'userData'])
      })
      .use(middleware.auth())
  })
  .prefix('/auth')

/*
|--------------------------------------------------------------------------
| Spotify Integration Routes
|--------------------------------------------------------------------------
| Routes pour l'intégration avec l'API Spotify
| Toutes les routes sont protégées par le middleware d'authentification
| - /link : Initie la connexion OAuth avec Spotify
| - /callback : Gère le retour OAuth de Spotify
| - /status : Vérifie l'état de la connexion Spotify
| - /logout : Déconnecte le compte Spotify
| - /playlists : Récupère les playlists de l'utilisateur
| - /tracks/:playlistId : Récupère les morceaux d'une playlist
*/
router
  .group(() => {
    router.get('/link', [SpotifyController, 'redirect'])
    router.get('/callback', [SpotifyController, 'callback'])
    router.get('/status', [SpotifyController, 'status'])
    router.post('/logout', [SpotifyController, 'logout'])
    router.get('/playlists', [SpotifyController, 'getUserPlaylists'])
    router.get('/tracks/:playlistId', [SpotifyController, 'getPlaylistTracks'])
  })
  .prefix('/spotify')
  .use(middleware.auth())

/*
|--------------------------------------------------------------------------
| AI Routes
|--------------------------------------------------------------------------
| Routes pour l'intégration avec l'API Google Gemini AI
| - /test : Route de test pour vérifier la connexion à l'API
|   Accepte un prompt personnalisé dans le body: { "prompt": "votre question" }
*/
router
  .group(() => {
    router.post('/class', [GeminiController, 'classTracks'])
  })
  .prefix('/ai')
  .use(middleware.auth())