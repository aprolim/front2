import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxt/icon'
  ],
  
  googleFonts: {
    families: {
      'Roboto': [300, 400, 500, 700],
      'Montserrat': [400, 600, 700, 800]
    }
  },
  
  css: ['~/assets/main.css'],
  
  future: {
    compatibilityVersion: 4
  },
  
  compatibilityDate: '2024-07-23'
})