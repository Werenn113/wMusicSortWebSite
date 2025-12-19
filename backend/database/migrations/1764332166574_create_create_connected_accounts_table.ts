import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Migration pour créer la table des comptes connectés
 * @class CreateConnectedAccountsTable
 * @extends {BaseSchema}
 * @description Crée la table 'connected_accounts' pour stocker les connexions OAuth :
 * - id : Identifiant auto-incrémenté
 * - user_id : Référence vers l'utilisateur (CASCADE on delete)
 * - provider : Nom du fournisseur OAuth (ex: 'spotify')
 * - provider_user_id : ID utilisateur chez le fournisseur
 * - access_token/refresh_token : Tokens OAuth
 * - expires_at : Date d'expiration du token
 * - Contrainte unique sur (user_id, provider) pour éviter les doublons
 */
export default class extends BaseSchema {
  protected tableName = 'connected_accounts'

  /**
   * Exécute la migration : crée la table connected_accounts
   * @returns {Promise<void>}
   */
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // Link to main user
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      table.string('provider').notNullable()
      table.string('provider_user_id').notNullable()

      table.text('access_token').notNullable()
      table.text('refresh_token').notNullable()
      table.timestamp('expires_at').notNullable()

      table.timestamps(true, true)
      table.unique(['user_id', 'provider'])
    })
  }

  /**
   * Annule la migration : supprime la table connected_accounts
   * @returns {Promise<void>}
   */
  async down() {
    this.schema.dropTable(this.tableName)
  }
}