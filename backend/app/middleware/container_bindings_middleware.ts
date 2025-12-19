import { Logger } from '@adonisjs/core/logger'
import { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Middleware de liaison de conteneur
 * Lie les classes à leurs valeurs spécifiques à la requête via le résolveur de conteneur
 * - Lie la classe "HttpContext" à l'objet "ctx"
 * - Lie la classe "Logger" à l'objet "ctx.logger"
 * @class ContainerBindingsMiddleware
 */
export default class ContainerBindingsMiddleware {
  /**
   * Lie les classes au contexte de la requête
   * @param {HttpContext} ctx - Contexte HTTP de la requête
   * @param {NextFn} next - Fonction pour passer au middleware suivant
   * @returns {Promise<void>}
   */
  handle(ctx: HttpContext, next: NextFn) {
    ctx.containerResolver.bindValue(HttpContext, ctx)
    ctx.containerResolver.bindValue(Logger, ctx.logger)

    return next()
  }
}
