import type { HttpContext } from '@adonisjs/core/http'
import music_classifier_service from "#services/music_classifier_service"

/**
 * Contrôleur pour interagir avec l'API Google Gemini AI
 * @class GeminiController
 */
export default class GeminiController {
  /**
   * Classe une liste de musiques dans des catégories prédéfinies en utilisant l'IA Gemini
   * 
   * @param {HttpContext} context - Le contexte HTTP d'AdonisJS
   * @param {object} context.request - L'objet de requête HTTP
   * @param {object} context.response - L'objet de réponse HTTP
   * @returns {Promise<void>} Retourne une réponse JSON avec les musiques classées par catégorie
   * 
   * @description
   * Cette méthode reçoit une liste de musiques et une liste de catégories, puis utilise
   * l'API Google Gemini AI pour assigner automatiquement la catégorie la plus pertinente
   * à chaque musique.
   * 
   * @example
   * // Format de la requête attendu :
   * {
   *   tracks: [
   *     { id: "1", title: "Song Name", artist: "Artist Name" }
   *   ],
   *   categories: ["Rock", "Pop", "Jazz", "Autre"]
   * }
   * 
   * // Format de la réponse en cas de succès :
   * {
   *   success: true,
   *   data: [
   *     { id: "1", title: "Song Name", artist: "Artist Name", category: "Rock" }
   *   ]
   * }
   * 
   * @throws {BadRequest} Si la liste des musiques ou des catégories est manquante ou invalide
   * @throws {BadRequest} Si l'appel à l'API Gemini échoue
   */
  public async classTracks({ request, response }: HttpContext) {
    try {
      const { tracks, categories } = request.only(['tracks', 'categories'])

      if (!tracks || !Array.isArray(tracks) || tracks.length === 0) {
        return response.badRequest({ error: 'La liste de tracks est requise et doit être un tableau non vide' })
      }

      if (!categories || !Array.isArray(categories) || categories.length === 0) {
        return response.badRequest({ error: 'La liste de catégories est requise et doit être un tableau non vide' })
      }

      const result = await music_classifier_service.classTracks(tracks, categories)

      return response.ok(result)
    } catch (error) {
      return response.badRequest({
        success: false,
        error: "Erreur de classification",
        detail: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }
}