import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Middleware d'authentification silencieuse
 * Vérifie silencieusement si l'utilisateur est connecté sans bloquer la requête
 * La requête continue normalement même si l'utilisateur n'est pas authentifié
 * Utile comme middleware global pour rendre les données utilisateur disponibles partout
 * @class SilentAuthMiddleware
 */
export default class SilentAuthMiddleware {
  /**
   * Vérifie l'authentification de manière silencieuse
   * @param {HttpContext} ctx - Contexte HTTP de la requête
   * @param {NextFn} next - Fonction pour passer au middleware suivant
   * @returns {Promise<void>}
   */
  async handle(
    ctx: HttpContext,
    next: NextFn,
  ) {
    await ctx.auth.check()

    return next()
  }
}