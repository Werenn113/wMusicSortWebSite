import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Middleware forçant les réponses JSON
 * Met à jour le header "Accept" pour toujours accepter "application/json"
 * Force les composants internes du framework (erreurs de validation, erreurs d'auth)
 * à retourner des réponses JSON plutôt que HTML
 * @class ForceJsonResponseMiddleware
 */
export default class ForceJsonResponseMiddleware {
  /**
   * Modifie le header Accept pour forcer les réponses JSON
   * @param {Object} context - Contexte HTTP
   * @param {HttpContext['request']} context.request - Requête HTTP
   * @param {NextFn} next - Fonction pour passer au middleware suivant
   * @returns {Promise<void>}
   */
  async handle({ request }: HttpContext, next: NextFn) {
    const headers = request.headers()
    headers.accept = 'application/json'

    return next()
  }
}
