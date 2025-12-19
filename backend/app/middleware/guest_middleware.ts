import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

/**
 * Middleware pour routes réservées aux utilisateurs non authentifiés
 * Refuse l'accès aux routes pour les utilisateurs déjà connectés
 * Utile pour les pages de login/register qui ne doivent pas être accessibles aux utilisateurs connectés
 * @class GuestMiddleware
 */
export default class GuestMiddleware {
  /**
   * URL de redirection pour les utilisateurs déjà authentifiés
   * @type {string}
   * @default '/'
   */
  redirectTo = '/'

  /**
   * Vérifie si l'utilisateur est authentifié et le redirige si nécessaire
   * @param {HttpContext} ctx - Contexte HTTP de la requête
   * @param {NextFn} next - Fonction pour passer au middleware suivant
   * @param {Object} options - Options de configuration
   * @param {Array<keyof Authenticators>} [options.guards] - Guards d'authentification à vérifier
   * @returns {Promise<void>}
   */
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: { guards?: (keyof Authenticators)[] } = {}
  ) {
    for (let guard of options.guards || [ctx.auth.defaultGuard]) {
      if (await ctx.auth.use(guard).check()) {
        return ctx.response.redirect(this.redirectTo, true)
      }
    }

    return next()
  }
}