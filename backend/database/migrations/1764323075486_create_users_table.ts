import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Migration pour créer la table des utilisateurs
 * @class CreateUsersTable
 * @extends {BaseSchema}
 * @description Crée la table 'users' avec les champs :
 * - id : Identifiant auto-incrémenté
 * - username : Nom d'utilisateur (optionnel)
 * - email : Email unique (obligatoire)
 * - password : Mot de passe hashé (obligatoire)
 * - created_at/updated_at : Horodatages
 */
export default class extends BaseSchema {
  protected tableName = 'users'

  /**
   * Exécute la migration : crée la table users
   * @returns {Promise<void>}
   */
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('username').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  /**
   * Annule la migration : supprime la table users
   * @returns {Promise<void>}
   */
  async down() {
    this.schema.dropTable(this.tableName)
  }
}