import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'connected_accounts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // Lien vers l'utilisateur principal
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

  async down() {
    this.schema.dropTable(this.tableName)
  }
}