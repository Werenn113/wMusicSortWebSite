import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import ConnectedAccount from './connected_account.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

/**
 * Configuration du mixin AuthFinder pour l'authentification
 * Utilise scrypt pour le hachage et l'email comme identifiant unique
 */
const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

/**
 * Modèle représentant un utilisateur de l'application
 * Gère l'authentification et les relations avec les comptes connectés
 * @class User
 * @extends {BaseModel}
 * @mixes AuthFinder
 */
export default class User extends compose(BaseModel, AuthFinder) {
  /**
   * Identifiant unique de l'utilisateur
   * @type {number}
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Nom d'utilisateur (optionnel)
   * @type {string | null}
   */
  @column()
  declare username: string | null

  /**
   * Adresse email de l'utilisateur (identifiant unique)
   * @type {string}
   */
  @column()
  declare email: string

  /**
   * Mot de passe hashé de l'utilisateur (non sérialisé dans les réponses JSON)
   * @type {string}
   */
  @column({ serializeAs: null })
  declare password: string

  /**
   * Date de création du compte
   * @type {DateTime}
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Date de dernière mise à jour du compte
   * @type {DateTime | null}
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  /**
   * Comptes externes connectés (Spotify, etc.)
   * @type {HasMany<typeof ConnectedAccount>}
   */
  @hasMany(() => ConnectedAccount)
  declare accounts: HasMany<typeof ConnectedAccount>
}