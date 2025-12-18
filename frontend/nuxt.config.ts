// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
  ],

  icon: {
    provider: 'iconify',
    collections: ['mdi', 'lucide']
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
    '/api/**': {  // remplace /api par ça :
      proxy: {
        to: 'http://127.0.0.1:3333/**',
        cookieDomainRewrite: '',
        cookiePathRewrite: '/'
      }
    }
  },

  nitro: {
    devProxy: {
      '/api': {
        target: 'http://127.0.0.1:3333',
        changeOrigin: false,
        cookieDomainRewrite: '',
        prependPath: false
      }
    }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  imports: {
    dirs: ['composables/**']
  },
})