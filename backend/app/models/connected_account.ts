import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

/**
 * Modèle représentant un compte externe connecté à un utilisateur
 * Stocke les tokens OAuth et les informations de connexion pour les services tiers
 * @class ConnectedAccount
 * @extends {BaseModel}
 */
export default class ConnectedAccount extends BaseModel {
  /**
   * Identifiant unique du compte connecté
   * @type {number}
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Identifiant de l'utilisateur propriétaire
   * @type {number}
   */
  @column()
  declare userId: number

  /**
   * Nom du fournisseur du service (ex: 'spotify')
   * @type {string}
   */
  @column()
  declare provider: string

  /**
   * Identifiant de l'utilisateur chez le fournisseur
   * @type {string}
   */
  @column()
  declare providerUserId: string

  /**
   * Token d'accès OAuth pour l'API du fournisseur
   * @type {string | null}
   */
  @column()
  declare accessToken: string | null

  /**
   * Token de rafraîchissement OAuth pour renouveler l'accès
   * @type {string | null}
   */
  @column()
  declare refreshToken: string | null

  /**
   * Date d'expiration du token d'accès
   * @type {DateTime | null}
   */
  @column.dateTime()
  declare expiresAt: DateTime | null

  /**
   * Date de création de la connexion
   * @type {DateTime}
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Date de dernière mise à jour de la connexion
   * @type {DateTime}
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /**
   * Relation vers l'utilisateur propriétaire
   * @type {BelongsTo<typeof User>}
   */
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}