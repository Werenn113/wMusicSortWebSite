import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'

/**
 * Gestionnaire global des exceptions HTTP
 * Centralise le traitement et le reporting des erreurs
 * @class HttpExceptionHandler
 * @extends {ExceptionHandler}
 */
export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * Active le mode debug avec stack traces détaillées
   * Désactivé en production pour des raisons de sécurité
   * @type {boolean}
   */
  protected debug = !app.inProduction

  /**
   * Gère les erreurs et retourne une réponse appropriée au client
   * @param {unknown} error - L'erreur à traiter
   * @param {HttpContext} ctx - Contexte HTTP de la requête
   * @returns {Promise<void>}
   */
  async handle(error: unknown, ctx: HttpContext) {
    return super.handle(error, ctx)
  }

  /**
   * Reporte les erreurs vers le service de logging ou un service tiers de monitoring
   * Ne doit jamais envoyer de réponse au client depuis cette méthode
   * @param {unknown} error - L'erreur à reporter
   * @param {HttpContext} ctx - Contexte HTTP de la requête
   * @returns {Promise<void>}
   * @note N'envoyez pas de réponse depuis cette méthode
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
