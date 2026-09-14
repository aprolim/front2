// stores/peticiones.js
import { defineStore } from 'pinia'

const CACHE_TTL = 10 * 60 * 1000
const API_BASE = 'https://apisi.senado.gob.bo/page'

export const usePeticionesStore = defineStore('peticiones', {
  state: () => ({
    data: {
      peticionesEscrito: 0,
      peticionesOral: 0,
      peticionesInforme: 0,
      resoluciones: 0,
      declaraciones: 0,
      minutas: 0,
    },
    loading: false,
    error: null,
    lastFetch: 0,
    _inFlight: null,
  }),

  getters: {
    hasData: (state) => state.lastFetch > 0,
    isCacheValid: (state) => {
      if (!state.lastFetch) return false
      return Date.now() - state.lastFetch < CACHE_TTL
    },
  },

  actions: {
    async ensureLoaded(force = false) {
      if (!force && this.isCacheValid) {
        console.log('📋 [Peticiones] Usando caché')
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

      console.log('📋 [Peticiones] Cargando 5 endpoints...')

      const results = await Promise.allSettled([
        this._fetch('peticion-informe-escrito', 'peticionesEscrito'),
        this._fetch('peticion-informe-oral', 'peticionesOral'),
        this._fetch('resolucion-camarales', 'resoluciones'),
        this._fetch('declaraciones-camarales', 'declaraciones'),
        this._fetch('minutas-comunicacion', 'minutas'),
      ])

      const ok = results.filter(r => r.status === 'fulfilled' && r.value === true).length

      if (ok > 0) {
        this.data.peticionesInforme =
          this.data.peticionesEscrito + this.data.peticionesOral
        this.lastFetch = Date.now()
        console.log(`✅ [Peticiones] ${ok}/5 OK`)
      } else {
        this.error = 'No se pudieron cargar las peticiones'
      }

      this.loading = false
    },

    async _fetch(endpoint, key) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 4000)
        const response = await fetch(`${API_BASE}/${endpoint}?page=1`, {
          signal: controller.signal,
        })
        clearTimeout(timeoutId)
        if (!response.ok) return false
        const result = await response.json()
        this.data[key] = result.data?.total || 0
        return true
      } catch {
        return false
      }
    },

    reset() {
      this.data = {
        peticionesEscrito: 0, peticionesOral: 0, peticionesInforme: 0,
        resoluciones: 0, declaraciones: 0, minutas: 0,
      }
      this.lastFetch = 0
      this.error = null
    },
  },

  persist: {
    key: 'senado_peticiones',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    paths: ['data', 'lastFetch'],
  },
})