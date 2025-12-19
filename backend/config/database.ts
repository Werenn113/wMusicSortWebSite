import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

/**
 * Configuration de la base de données
 * Utilise PostgreSQL comme connexion par défaut
 * @module dbConfig
 * @description Configuration pour :
 * - Connexion PostgreSQL avec paramètres depuis l'environnement
 * - Migrations avec tri naturel dans le dossier database/migrations
 */

const dbConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig