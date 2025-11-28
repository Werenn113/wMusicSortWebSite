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

