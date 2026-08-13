import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  // ✅ CORREGIDO: compatibilityDate
  icon: {
    serverBundle: 'local', // 🔥 Cambiar a 'local'
    clientBundle: 'auto'
  },
  compatibilityDate: '2026-08-02',
  
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
    '@pinia/nuxt'
  ],
  
  // ==========================================
  // 🔥 CONFIGURACIÓN DE GOOGLE FONTS
  // ==========================================
  googleFonts: {
    families: {
      Montserrat: [300, 400, 500, 600, 700, 800, 900],
      Roboto: [300, 400, 500, 700]
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
    download: true,
    base64: false,
    overwriting: true
  },
  
  // ==========================================
  // 📦 CSS GLOBAL
  // ==========================================
  css: [
    '~/assets/main.css'
  ],
  
  // ==========================================
  // 🔧 ALIAS DE RESOLUCIÓN
  // ==========================================
  alias: {
    '~': join(currentDir, '.'),
    '@': join(currentDir, '.'),
    '~~': join(currentDir, '.'),
    '@@': join(currentDir, '.'),
    '~components': join(currentDir, 'components'),
    '~composables': join(currentDir, 'composables'),
    '~assets': join(currentDir, 'assets'),
    '~public': join(currentDir, 'public'),
  },
  
  // ==========================================
  // ⚙️ OTRAS CONFIGURACIONES
  // ==========================================
  future: {
    compatibilityVersion: 4
  },
  
  // ==========================================
  // 🚀 OPTIMIZACIONES
  // ==========================================
  nitro: {
    preset: 'node-server',
    compressPublicAssets: true
  },
  
  image: {
    format: ['webp', 'avif', 'jpg'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },
  
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { 
          rel: 'preconnect', 
          href: 'https://fonts.googleapis.com' 
        },
        { 
          rel: 'preconnect', 
          href: 'https://fonts.gstatic.com', 
          crossorigin: '' 
        },
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;700&display=swap' 
        }
      ]
    }
  }
})