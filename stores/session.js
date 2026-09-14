// stores/session.js
import { defineStore } from 'pinia'

const CACHE_TTL = 5 * 60 * 1000
const API_SESSIONS = 'https://systemdemo.es/api/v1/public/sessions'

export const useSessionStore = defineStore('session', {
  state: () => ({
    sessionData: null,
    formattedDate: '',
    modalData: null,
    hasValidData: false,
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
    todasLasSesiones: (state) => {
      if (!state.sessionData) return []
      const agendaItems = state.sessionData.description
        ? _obtenerOrdenDelDia(state.sessionData.description) : null
      return [{
        fecha: state.sessionData.date,
        titulo: state.sessionData.title,
        descripcion: state.sessionData.description,
        hora: state.sessionData.startTime,
        estado: state.sessionData.status_agenda,
        estadoLabel: state.sessionData.status_agenda === 'APROBADO' ? 'Aprobada' : 'Pendiente',
        detalles: agendaItems || [
          'Correspondencia.', 'Asuntos del día.', 'Asuntos en mesa.',
          'Informes de comisiones.', 'Asuntos varios.',
        ],
        nota: `Nota: La sesión se desarrollará bajo la modalidad ${state.sessionData.modality || 'presencial'}.`,
        esSesionActual: state.sessionData.date === new Date().toISOString().split('T')[0],
        modality: state.sessionData.modality,
        location: state.sessionData.location,
        path: state.sessionData.path,
      }]
    },
  },

  actions: {
    async ensureLoaded(force = false) {
      if (!force && this.isCacheValid) {
        console.log('📅 [Session] Usando caché')
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
      const timeoutId = setTimeout(() => controller.abort(), 1500)

      try {
        console.log('📅 [Session] Cargando...')
        await fetch(API_SESSIONS, {
          signal: controller.signal,
          mode: 'no-cors',
          cache: 'no-store',
        })
        clearTimeout(timeoutId)
        this.lastFetch = Date.now()
      } catch (err) {
        clearTimeout(timeoutId)
        if (err.name !== 'AbortError') {
          console.log('ℹ️ [Session] Ignorado:', err.message)
        }
        this.lastFetch = Date.now()
      } finally {
        this.loading = false
      }
    },

    openModal() {
      if (!this.hasValidData || !this.modalData) {
        alert('⚠️ No hay información de sesión disponible.')
      }
    },

    reset() {
      this.sessionData = null
      this.formattedDate = ''
      this.modalData = null
      this.hasValidData = false
      this.lastFetch = 0
      this.error = null
    },
  },

  persist: {
    key: 'senado_session',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    paths: ['sessionData', 'formattedDate', 'modalData', 'hasValidData', 'lastFetch'],
  },
})

function _obtenerOrdenDelDia(description) {
  if (!description) return null
  const lines = description.split('\n').map(l => l.trim()).filter(l => l)
  const orderIndex = lines.findIndex(l =>
    l.toUpperCase().includes('ORDEN DEL DÍA') ||
    l.toUpperCase().includes('ORDEN DEL DIA')
  )
  if (orderIndex === -1) return null
  const items = []
  let i = orderIndex + 1
  while (i < lines.length) {
    const line = lines[i]
    if (line.toLowerCase().includes('nota:')) break
    const match = line.match(/^(\d+)\.\s*(.*)/)
    if (match) items.push(match[2] || match[0])
    else if (line.match(/^[A-ZÁÉÍÓÚÑ]/) && items.length > 0) items[items.length - 1] += ' ' + line
    else if (line.match(/^[•\-*]\s*(.*)/)) {
      const bm = line.match(/^[•\-*]\s*(.*)/)
      if (bm) items.push(bm[1])
    }
    i++
  }
  return items.length > 0 ? items : null
}