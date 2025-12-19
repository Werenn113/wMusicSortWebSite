import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Migration pour créer la table des pistes musicales
 * @class CreateTracksTable
 * @extends {BaseSchema}
 * @description Crée la table 'tracks' avec les champs :
 * - id : Identifiant auto-incrémenté
 * - provider_id : ID unique de la track chez le fournisseur (ex: Spotify)
 * - title : Titre de la piste
 * - artists : Tableau JSON des artistes
 * - created_at/updated_at : Horodatages
 */
export default class extends BaseSchema {
  protected tableName = 'tracks'

  /**
   * Exécute la migration : crée la table tracks
   * @returns {Promise<void>}
   */
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('provider_id').unique().notNullable()
      table.string('title').notNullable()
      table.text('artists').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  /**
   * Annule la migration : supprime la table tracks
   * @returns {Promise<void>}
   */
  async down() {
    this.schema.dropTable(this.tableName)
  }
}