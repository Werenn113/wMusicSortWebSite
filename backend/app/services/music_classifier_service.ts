import Track from "#models/track";
import TrackGenre from "#models/track_genre";
import env from "#start/env";
import { GeminiClassifiedTrack, Track as TrackType } from "#types/spotify";
import { GoogleGenAI } from "@google/genai";

/**
 * Service de classification de musique utilisant l'API Google Gemini
 * Permet de classer automatiquement des tracks dans des catégories définies par l'utilisateur
 * @class MusicClassifierService
 */
class MusicClassifierService {
  /**
   * Instance de l'API Google Gemini
   * @private
   * @type {GoogleGenAI}
   */
  private genAI: GoogleGenAI

  /**
   * Initialise le service de classification musicale
   * Configure l'instance de l'API Google Gemini avec la clé API depuis les variables d'environnement
   * @constructor
   */
  constructor() {
    this.genAI = new GoogleGenAI({ apiKey: env.get('GOOGLE_AI_API_KEY') })
  }

  /**
   * Classe une liste de tracks dans des catégories prédéfinies
   * @param {TrackType[]} tracks - Liste des tracks à classifier
   * @param {string[]} categories - Liste des catégories disponibles
   * @returns {Promise<GeminiClassifiedTrack[]>} Tracks avec leurs catégories assignées
   */
  public async classTracks(tracks: TrackType[], categories: string[]): Promise<GeminiClassifiedTrack[]> {
    const alreadyClassified = await this.getAlreadyClassifiedTrack(tracks, categories)

    const toClassified = tracks.filter(track =>
      !alreadyClassified.some(known => known.id === track.id)
    )

    let newClassifiedData: GeminiClassifiedTrack[] = []
    if (toClassified.length > 0) {
      newClassifiedData = await this.askGemini(toClassified, categories)
      await this.saveToDatabase(newClassifiedData)
    }

    return [...alreadyClassified, ...newClassifiedData]
  }

  /**
   * Récupère les tracks déjà classifiées depuis la base de données
   * Filtre les tracks qui ont déjà été classifiées dans les catégories spécifiées
   * @private
   * @param {TrackType[]} tracks - Liste des tracks à vérifier
   * @param {string[]} categories - Liste des catégories dans lesquelles rechercher
   * @returns {Promise<GeminiClassifiedTrack[]>} Tracks déjà classifiées avec leurs catégories
   */
  private async getAlreadyClassifiedTrack(tracks: TrackType[], categories: string[]): Promise<GeminiClassifiedTrack[]> {
    const trackIds = tracks.map(track => track.id)

    const existingTracks = await Track.query()
      .whereIn('provider_id', trackIds)
      .preload('genres', (query) => {
        query.whereIn('category_name', categories)
      })

    return existingTracks
      .filter(track => track.genres.length === categories.length) // si tous les genres sont trouvé
      .map(track => ({
        id: track.providerId,
        title: track.title,
        artists: track.artists,
        categories: track.genres.map(genre => ({
          name: genre.categoryName,
          confidence: genre.confidence
        }))
      }))
  }

  /**
   * Interroge l'API Gemini pour classifier les tracks
   * @private
   * @param {TrackType[]} tracks - Liste des tracks à classifier
   * @param {string[]} categories - Liste des catégories disponibles
   * @returns {Promise<GeminiClassifiedTrack[]>} Tracks classifiées par l'IA
   * @throws {Error} Si la réponse de l'API est invalide
   */
  private async askGemini(tracks: TrackType[], categories: string[]): Promise<GeminiClassifiedTrack[]> {
    const prompt = `
        Tu es un expert musical.
        Voici une liste de catégories définies par l'utilisateur : ${JSON.stringify(categories)}.
        Voici une liste de musiques à classer : ${JSON.stringify(tracks)}.

        TÂCHE :
        Pour chaque musique, évalue son appartenance à CHAQUE catégorie de la liste.
        Attribue un score de confiance pour chaque catégorie.

        FORMAT DE RÉPONSE ATTENDU :
        Un tableau JSON strict d'objets. Chaque objet doit avoir :
        - "id" (l'id de la track)
        - "title" (utilise le champ 'name' des tracks fournies)
        - "artists" (tableau de noms d'artistes)
        - "categories" (un tableau d'objets avec "name" et "confidence" pour CHAQUE catégorie)
        
        Exemple de structure attendue :
        [{
          "id": "track123",
          "title": "Bohemian Rhapsody",
          "artists": ["Queen"],
          "categories": [
            { "name": "Rock", "confidence": 95 },
            { "name": "Pop", "confidence": 30 },
            { "name": "Jazz", "confidence": 15 }
          ]
        }]
      `

    const result = await this.genAI.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    })

    if (!result.candidates || !result.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Réponse invalide de l\'API Gemini')
    }

    const responseText = result.candidates[0].content.parts[0].text

    try {
      return JSON.parse(responseText)
    } catch (error) {
      throw new Error(`Erreur lors du parsing de la réponse Gemini: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Sauvegarde les tracks classifiées dans la base de données
   * Crée ou met à jour les enregistrements de tracks et leurs genres
   * @private
   * @param {GeminiClassifiedTrack[]} classifiedTracks - Tracks classifiées à sauvegarder
   * @returns {Promise<void>}
   */
  private async saveToDatabase(classifiedTracks: GeminiClassifiedTrack[]): Promise<void> {
    await Promise.all(classifiedTracks.map(async (item) => {
      const track = await Track.updateOrCreate(
        { providerId: item.id },
        { title: item.title, artists: item.artists }
      )

      // Sauvegarder tous les genres avec leurs scores de confiance
      await Promise.all(item.categories.map(async (cat) => {
        await TrackGenre.updateOrCreate(
          { trackId: track.id, categoryName: cat.name },
          { trackId: track.id, categoryName: cat.name, confidence: cat.confidence }
        )
      }))
    }))
  }
}

export default new MusicClassifierService()