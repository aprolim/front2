// stores/live.js
import { defineStore } from 'pinia'

const CACHE_TTL = 60 * 1000
const API_BASE = 'https://demoback.senado.gob.bo/api'

export const useLiveStore = defineStore('live', {
  state: () => ({
    liveVideo: null,
    loading: false,
    error: null,
    lastFetch: 0,
    _inFlight: null,
  }),

  getters: {
    isLive: (state) => !!state.liveVideo,
    hasData: (state) => state.lastFetch > 0,
    isCacheValid: (state) => {
      if (!state.lastFetch) return false
      return Date.now() - state.lastFetch < CACHE_TTL
    },
  },

  actions: {
    async ensureLoaded(force = false) {
      if (!force && this.isCacheValid) {
        console.log('🔴 [Live] Usando caché')
        return
      }
      if (this._inFlight) return this._inFlight
      this._inFlight = this.load()
      try { await this._inFlight } finally { this._inFlight = null }
    },

    async load() {
      // 🔥 FIX
      const tieneDatosPrevios = this.hasData
      if (!tieneDatosPrevios) {
        this.loading = true
      }
      this.error = null

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 4000)

      try {
        console.log('🔴 [Live] Cargando...')

        const response = await fetch(`${API_BASE}/sesiones/live`, {
          signal: controller.signal,
        })
        clearTimeout(timeoutId)

        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const result = await response.json()
        this.liveVideo = result.success && result.data ? result.data : null
        this.lastFetch = Date.now()
        console.log('✅ [Live] Actualizado')
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('⚠️ [Live] Error:', err.message)
          this.error = err.message
        }
      } finally {
        this.loading = false
      }
    },

    reset() {
      this.liveVideo = null
      this.lastFetch = 0
      this.error = null
    },
  },

  persist: {
    key: 'senado_live',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    paths: ['liveVideo', 'lastFetch'],
  },
})