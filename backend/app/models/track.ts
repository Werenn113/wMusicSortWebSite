import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import TrackGenre from './track_genre.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

/**
 * Modèle représentant une piste musicale
 * Stocke les informations d'une track provenant d'un service externe (ex: Spotify)
 * @class Track
 * @extends {BaseModel}
 */
export default class Track extends BaseModel {
  /**
   * Identifiant unique de la track
   * @type {number}
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Identifiant de la track chez le fournisseur externe (ex: Spotify ID)
   * @type {string}
   */
  @column()
  declare providerId: string

  /**
   * Titre de la piste musicale
   * @type {string}
   */
  @column()
  declare title: string

  /**
   * Liste des artistes de la piste
   * Stocké en JSON dans la base de données
   * @type {string[]}
   */
  @column({
    prepare: (value: string[]) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare artists: string[]

  /**
   * Genres/catégories associés à cette track
   * @type {HasMany<typeof TrackGenre>}
   */
  @hasMany(() => TrackGenre)
  declare genres: HasMany<typeof TrackGenre>

  /**
   * Date de création de l'enregistrement
   * @type {DateTime}
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Date de dernière mise à jour de l'enregistrement
   * @type {DateTime}
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  confidence: any
}