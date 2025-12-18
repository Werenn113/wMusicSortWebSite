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
*/
router
  .group(() => {
    router.get('/test', [GeminiController, 'promptTest'])
  })
  .prefix('/ai')