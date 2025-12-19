/*
|--------------------------------------------------------------------------
| HTTP server entrypoint
|--------------------------------------------------------------------------
|
| The "server.ts" file is the entrypoint for starting the AdonisJS HTTP
| server. Either you can run this file directly or use the "serve"
| command to run this file and monitor file changes
|
*/

import 'reflect-metadata'
import { Ignitor, prettyPrintError } from '@adonisjs/core'

/**
 * Racine de l'application
 * AdonisJS l'utilise pour résoudre les chemins vers les fichiers et dossiers
 * @constant {URL} APP_ROOT
 */
const APP_ROOT = new URL('../', import.meta.url)

/**
 * Fonction d'importation pour charger les fichiers dans le contexte de l'application
 * Gère les chemins relatifs et absolus
 * @function IMPORTER
 * @param {string} filePath - Chemin du fichier à importer
 * @returns {Promise<any>} Module importé
 */
const IMPORTER = (filePath: string) => {
  if (filePath.startsWith('./') || filePath.startsWith('../')) {
    return import(new URL(filePath, APP_ROOT).href)
  }
  return import(filePath)
}

new Ignitor(APP_ROOT, { importer: IMPORTER })
  .tap((app) => {
    app.booting(async () => {
      await import('#start/env')
    })
    app.listen('SIGTERM', () => app.terminate())
    app.listenIf(app.managedByPm2, 'SIGINT', () => app.terminate())
  })
  .httpServer()
  .start()
  .catch((error) => {
    process.exitCode = 1
    prettyPrintError(error)
  })
