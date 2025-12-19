import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Migration pour créer la table des genres/catégories de tracks
 * @class CreateTrackGenresTable
 * @extends {BaseSchema}
 * @description Crée la table 'track_genres' avec les champs :
 * - id : Identifiant auto-incrémenté
 * - track_id : Référence vers la track (CASCADE on delete)
 * - category_name : Nom de la catégorie assignée
 * - created_at/updated_at : Horodatages
 */
export default class extends BaseSchema {
  protected tableName = 'track_genres'

  /**
   * Exécute la migration : crée la table track_genres
   * @returns {Promise<void>}
   */
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('track_id').unsigned().references('tracks.id').onDelete('CASCADE')
      table.string('category_name').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  /**
   * Annule la migration : supprime la table track_genres
   * @returns {Promise<void>}
   */
  async down() {
    this.schema.dropTable(this.tableName)
  }
}