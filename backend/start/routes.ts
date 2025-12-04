/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import SocialsController from '#controllers/socials_controller'
import User from '#models/user'
import SpotifyController from '#controllers/spotify_controller'
import GeminiCrontoller from '#controllers/gemini_controller'

export const auth_middleware = router.named({
  auth: () => import('#middleware/auth_middleware')
})

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/auth/register', [AuthController, 'register'])
router.post('/auth/login', [AuthController, 'login'])
router.post('/auth/logout', [AuthController, 'logout']).use(middleware.auth())
router.post('/auth/delete_user', [AuthController, 'delete_user']).use(middleware.auth())
router.get('/auth/admin', async () => {
  return {
    admin: 'panel'
  }
}).use(middleware.auth())

router.get('/spotify/link', [SocialsController, 'redirect']).use(middleware.auth())
router.get('auth/spotify/callback', [SocialsController, 'callback']).use(middleware.auth())
router.get('/spotify/playlists', [SpotifyController, 'getUserPlaylists']).use(middleware.auth())
router.get('/spotify/tracks/:id', [SpotifyController, 'getPlaylistTracks']).use(middleware.auth())


router.get('/ai/test', [GeminiCrontoller, 'promptTest'])


// Route pour connecter Bruno facilement
router.post('/dev/login-api', async ({ auth, request, response }) => {
  // On récupère l'ID envoyé dans le body, ou on prend le 1er user par défaut
  const userId = request.input('id', 1)
  
  const user = await User.find(userId)
  
  if (!user) return response.badRequest({ error: 'User not found' })

  // Création de la session (le cookie est généré ici)
  await auth.use('web').login(user)

  return response.ok({ message: 'Login success', user })
})