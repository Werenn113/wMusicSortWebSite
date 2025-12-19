import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { Secret } from '@adonisjs/core/helpers'
import { defineConfig } from '@adonisjs/core/http'

/**
 * Clé secrète de l'application
 * Utilisée pour chiffrer les cookies, générer des URLs signées et le module de chiffrement
 * @type {Secret}
 * @warning Le module de chiffrement échouera à déchiffrer si la clé est perdue ou modifiée
 * @important Gardez cette clé en sécurité et ne la partagez jamais
 */
export const appKey = new Secret(env.get('APP_KEY'))

/**
 * Configuration du serveur HTTP
 * Définit les paramètres de comportement du serveur et des cookies
 * @module http
 */
export const http = defineConfig({
  generateRequestId: true,
  allowMethodSpoofing: false,

  /**
   * Enabling async local storage will let you access HTTP context
   * from anywhere inside your application.
   */
  useAsyncLocalStorage: false,

  /**
   * Manage cookies configuration. The settings for the session id cookie are
   * defined inside the "config/session.ts" file.
   */
  cookie: {
    domain: '',
    path: '/',
    maxAge: '2h',
    httpOnly: true,
    secure: app.inProduction,
    sameSite: 'lax',
  },
})
