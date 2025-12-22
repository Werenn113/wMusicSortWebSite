import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Track from './track.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

/**
 * Modèle représentant l'association entre une piste musicale et sa catégorie/genre
 * Permet d'assigner des catégories personnalisées aux tracks
 * @class TrackGenre
 * @extends {BaseModel}
 */
export default class TrackGenre extends BaseModel {
  /**
   * Identifiant unique de l'association
   * @type {number}
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Identifiant de la track associée
   * @type {number}
   */
  @column()
  declare trackId: number

  /**
   * Nom de la catégorie/genre assigné à la track
   * @type {string}
   */
  @column()
  declare categoryName: string

  /**
   * Niveau de confiance de l'association entre la piste et le genre musical.
   * Valeur numérique représentant la probabilité ou la certitude que ce genre
   * correspond à la piste.
   * @type {number}
   */
  @column()
  declare confidence: number

  /**
   * Relation vers la track associée
   * @type {BelongsTo<typeof Track>}
   */
  @belongsTo(() => Track)
  declare track: BelongsTo<typeof Track>

  /**
   * Date de création de l'association
   * @type {DateTime}
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Date de dernière mise à jour de l'association
   * @type {DateTime}
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}