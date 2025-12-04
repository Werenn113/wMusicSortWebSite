import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page', // 'page' pour du contenu avec des routes (slug), 'data' pour du JSON/YAML
      source: '**/*.md', // Quels fichiers inclure
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date()
      })
    })
  }
})