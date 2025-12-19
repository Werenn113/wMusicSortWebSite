/*
|--------------------------------------------------------------------------
| HTTP kernel file
|--------------------------------------------------------------------------
|
| The HTTP kernel file is used to register the middleware with the server
| or the router.
|
*/

import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

/**
 * Gestionnaire d'erreurs global
 * Convertit les exceptions en réponses HTTP appropriées
 */
server.errorHandler(() => import('#exceptions/handler'))

/**
 * Pile de middlewares du serveur
 * Exécutés sur toutes les requêtes HTTP, même sans route enregistrée
 * - ContainerBindingsMiddleware : Lie les classes au contexte de requête
 * - ForceJsonResponseMiddleware : Force les réponses JSON pour l'API
 * - CorsMiddleware : Gère les en-têtes CORS
 */
server.use([
  () => import('#middleware/container_bindings_middleware'),
  () => import('#middleware/force_json_response_middleware'),
  () => import('@adonisjs/cors/cors_middleware'),
])

/**
 * Pile de middlewares du routeur
 * Exécutés sur toutes les requêtes HTTP avec route enregistrée
 * - BodyParserMiddleware : Parse le corps des requêtes
 * - SessionMiddleware : Gère les sessions utilisateur
 * - InitializeAuthMiddleware : Initialise le système d'authentification
 */
router.use([() => import('@adonisjs/core/bodyparser_middleware'), () => import('@adonisjs/session/session_middleware'), () => import('@adonisjs/auth/initialize_auth_middleware')])

/**
 * Collection de middlewares nommés
 * Doivent être explicitement assignés aux routes ou groupes de routes
 * @property {Function} guest - Middleware pour les routes réservées aux non-authentifiés
 * @property {Function} auth - Middleware pour les routes protégées nécessitant authentification
 */
export const middleware = router.named({
  guest: () => import('#middleware/guest_middleware'),
  auth: () => import('#middleware/auth_middleware')
})
