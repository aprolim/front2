// stores/stats.js
import { defineStore } from 'pinia'

const CACHE_TTL = 5 * 60 * 1000
const API_NORMATIVA = 'https://asistente.senado.gob.bo/ciudadana-api/api/v1'

export const useStatsStore = defineStore('stats', {
  state: () => ({
    data: {
      enTratamiento: 0,
      aprobados: 0,
      sancionadas: 0,
      promulgadas: 0,
      modificaciones: 0,
      rechazados: 0,
    },
    loading: false,
    error: null,
    lastFetch: 0,
    _inFlight: null,
  }),

  getters: {
    // 🔥 NUEVO: indica si ya hay datos válidos
    hasData: (state) => state.lastFetch > 0,

    isCacheValid: (state) => {
      if (!state.lastFetch) return false
      return Date.now() - state.lastFetch < CACHE_TTL
    },
  },

  actions: {
    async ensureLoaded(force = false) {
      if (!force && this.isCacheValid) {
        console.log('📊 [Stats] Usando caché')
        return
      }

      if (this._inFlight) return this._inFlight

      this._inFlight = this.load()
      try {
        await this._inFlight
      } finally {
        this._inFlight = null
      }
    },

    async load() {
      // 🔥 FIX: Solo activar loading si no hay datos previos
      const tieneDatosPrevios = this.hasData
      if (!tieneDatosPrevios) {
        this.loading = true
      }
      this.error = null

      try {
        console.log('📊 [Stats] Cargando...')

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 4000)

        const response = await fetch(`${API_NORMATIVA}/estados`, {
          signal: controller.signal,
        })
        clearTimeout(timeoutId)

        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const result = await response.json()

        if (result.estados && Array.isArray(result.estados)) {
          const find = (slug) => result.estados.find(e => e.slug === slug)?.cantidad || 0
          this.data.enTratamiento = find('en-tratamiento')
          this.data.aprobados = find('aprobado')
          this.data.sancionadas = find('sancionada')
          this.data.promulgadas = find('promulgada')
          this.data.modificaciones = find('devuelto')
          this.data.rechazados = find('rechazada')
          this.lastFetch = Date.now()
          console.log('✅ [Stats] Datos frescos:', this.data)
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('⏱️ [Stats] Timeout')
        } else {
          console.warn('⚠️ [Stats] Error:', err.message)
          this.error = err.message
        }
      } finally {
        this.loading = false
      }
    },

    reset() {
      this.data = {
        enTratamiento: 0, aprobados: 0, sancionadas: 0,
        promulgadas: 0, modificaciones: 0, rechazados: 0,
      }
      this.lastFetch = 0
      this.error = null
    },
  },

  persist: {
    key: 'senado_stats',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    paths: ['data', 'lastFetch'],
  },
})