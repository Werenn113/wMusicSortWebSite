import env from '#start/env'
import { defineConfig, services } from '@adonisjs/ally'

const allyConfig = defineConfig({
  spotify: services.spotify({
    clientId: env.get('SPOTIFY_CLIENT_ID'),
    clientSecret: env.get('SPOTIFY_CLIENT_SECRET'),
    callbackUrl: env.get('SPOTIFY_REDIRECT_URL'),
    scopes: [
      'user-read-email', 
      'playlist-read-private', 
      'playlist-read-collaborative',
      'playlist-modify-public',
      'playlist-modify-private'
    ]
  }),
})

export default allyConfig

declare module '@adonisjs/ally/types' {
  interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}