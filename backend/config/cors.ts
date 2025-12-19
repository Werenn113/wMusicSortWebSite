import { defineConfig } from '@adonisjs/cors'

/**
 * Configuration de la politique CORS (Cross-Origin Resource Sharing)
 * Contrôle les requêtes cross-origin pour sécuriser l'API
 * @module corsConfig
 * @see {@link https://docs.adonisjs.com/guides/security/cors|Documentation CORS}
 * @description Configuration actuelle :
 * - Origine autorisée : http://127.0.0.1:3000 (frontend dev)
 * - Méthodes : GET, HEAD, POST, PUT, DELETE
 * - Credentials : activés pour les cookies de session
 * - Cache pré-vol : 90 secondes
 */
const corsConfig = defineConfig({
  enabled: true,
  origin: ['http://127.0.0.1:3000'],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
