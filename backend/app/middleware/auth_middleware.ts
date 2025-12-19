import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

/**
 * Middleware d'authentification pour protéger les routes
 * Authentifie les requêtes HTTP et refuse l'accès aux utilisateurs non authentifiés
 * @class AuthMiddleware
 */
export default class AuthMiddleware {
  /**
   * URL de redirection en cas d'échec de l'authentification
   * @type {string}
   * @default '/login'
   */
  redirectTo = '/login'

  /**
   * Gère l'authentification de l'utilisateur
   * @param {HttpContext} ctx - Contexte HTTP de la requête
   * @param {NextFn} next - Fonction pour passer au middleware suivant
   * @param {Object} options - Options de configuration
   * @param {Array<keyof Authenticators>} [options.guards] - Guards d'authentification à utiliser
   * @returns {Promise<void>}
   * @throws Redirige vers la page de login si l'authentification échoue
   */
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })
    return next()
  }
}