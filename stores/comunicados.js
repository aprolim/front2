// stores/comunicados.js
import { defineStore } from 'pinia'

const CACHE_TTL = 60 * 1000
const API_BASE = 'https://demoback.senado.gob.bo/api'

export const useComunicadosStore = defineStore('comunicados', {
  state: () => ({
    comunicado: null,
    loading: false,
    error: null,
    lastFetch: 0,
    _inFlight: null,
  }),

  getters: {
    hasComunicado: (state) => !!state.comunicado,
    hasData: (state) => state.lastFetch > 0,
    isCacheValid: (state) => {
      if (!state.lastFetch) return false
      return Date.now() - state.lastFetch < CACHE_TTL
    },
    nombreDescarga: (state) => {
      if (!state.comunicado) return 'comunicado.jpg'
      const titulo = state.comunicado.titulo || 'comunicado'
      const slug = titulo
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 60)
      const url = state.comunicado.imagen?.url || ''
      const extMatch = url.match(/\.(jpg|jpeg|png|webp|gif)(\?|$)/i)
      const ext = extMatch ? extMatch[1].toLowerCase() : 'jpg'
      return `${slug}.${ext}`
    },
  },

  actions: {
    async ensureLoaded(force = false) {
      if (!force && this.isCacheValid) {
        console.log('📢 [Comunicados] Usando caché')
        return
      }
      if (this._inFlight) return this._inFlight
      this._inFlight = this.load()
      try { await this._inFlight } finally { this._inFlight = null }
    },

    async load() {
      const tieneDatosPrevios = this.hasData
      if (!tieneDatosPrevios) {
        this.loading = true
      }
      this.error = null

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 4000)

      try {
        console.log('📢 [Comunicados] Cargando...')
        const response = await fetch(`${API_BASE}/comunicados/activo`, {
          signal: controller.signal,
          cache: 'no-store',
        })
        clearTimeout(timeoutId)

        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const result = await response.json()
        this.comunicado = result.data || null
        this.lastFetch = Date.now()
        console.log('✅ [Comunicados] Actualizado')
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('⚠️ [Comunicados] Error:', err.message)
          this.error = err.message
        }
      } finally {
        this.loading = false
      }
    },

    reset() {
      this.comunicado = null
      this.lastFetch = 0
      this.error = null
    },
  },

  persist: {
    key: 'senado_comunicados',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    paths: ['comunicado', 'lastFetch'],
  },
})