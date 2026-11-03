// stores/session.js
import { defineStore } from 'pinia'

const CACHE_TTL = 5 * 60 * 1000
const API_SESSIONS = 'https://systemdemo.es/api/v1/public/sessions?pageNumber=0&pageSize=10'

export const useSessionStore = defineStore('session', {
  state: () => ({
    sessionsData: [],      // 🔥 array de sesiones (antes era sessionData singular)
    sessionData: null,     // mantenido por compatibilidad con otros componentes
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

    // 🔥 Devuelve TODAS las sesiones mapeadas al formato del calendario
    todasLasSesiones: (state) => {
      if (!state.sessionsData || state.sessionsData.length === 0) return []

      const hoyStr = new Date().toLocaleDateString('sv-SE') // "YYYY-MM-DD" en hora local

      return state.sessionsData.map((s) => {
        const agendaItems = s.description
          ? _obtenerOrdenDelDia(s.description)
          : null

        return {
          fecha: _normalizeFecha(s.date),
          titulo: s.title || 'Sesión del Senado',
          descripcion: s.description || '',
          hora: s.startTime || '09:00',
          estado: s.status_agenda || 'PENDIENTE',
          estadoLabel:
            s.status_agenda === 'APROBADO' ? 'Aprobada' : 'Pendiente',
          detalles:
            agendaItems || [
              'Correspondencia.',
              'Asuntos del día.',
              'Asuntos en mesa.',
              'Informes de comisiones.',
              'Asuntos varios.',
            ],
          nota: `Nota: La sesión se desarrollará bajo la modalidad ${s.modality || 'presencial'}.`,
          esSesionActual: _normalizeFecha(s.date) === hoyStr,
          modality: s.modality || '',
          location: s.location || '',
          path: s.path || '',
        }
      })
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
      try {
        await this._inFlight
      } finally {
        this._inFlight = null
      }
    },

    async load() {
      const tieneDatosPrevios = this.hasData
      if (!tieneDatosPrevios) {
        this.loading = true
      }
      this.error = null

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000) // 🔥 8s en lugar de 1.5s

      try {
        console.log('📅 [Session] Cargando...')

        // 🔥 SIN mode: 'no-cors' para poder leer la respuesta
        const res = await fetch(API_SESSIONS, {
          signal: controller.signal,
          cache: 'no-store',
        })
        clearTimeout(timeoutId)

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }

        const json = await res.json()
        console.log('🟢 [Session] Datos recibidos:', json)

        // 🔥 Normalizar la respuesta (array directo o paginada)
        let sesiones = []
        if (Array.isArray(json)) {
          sesiones = json
        } else if (Array.isArray(json.content)) {
          sesiones = json.content
        } else if (Array.isArray(json.data)) {
          sesiones = json.data
        } else if (json.data && Array.isArray(json.data.content)) {
          sesiones = json.data.content
        } else if (json && typeof json === 'object') {
          sesiones = [json]
        }

        this.sessionsData = sesiones
        // Compatibilidad: guardamos la primera como sessionData
        this.sessionData = sesiones[0] || null
        this.hasValidData = sesiones.length > 0
        this.lastFetch = Date.now()
        this.formattedDate = sesiones[0]?.date
          ? new Date(sesiones[0].date).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })
          : ''

        console.log(`✅ [Session] ${sesiones.length} sesión(es) cargada(s)`)
      } catch (err) {
        clearTimeout(timeoutId)
        if (err.name === 'AbortError') {
          console.warn('⏱️ [Session] Timeout al cargar')
          this.error = 'Timeout'
        } else {
          console.error('🔴 [Session] Error:', err)
          this.error = err.message
        }
        // ⚠️ NO actualizamos lastFetch en error para no marcar caché inválido como válido
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
      this.sessionsData = []
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
    paths: [
      'sessionsData',
      'sessionData',
      'formattedDate',
      'modalData',
      'hasValidData',
      'lastFetch',
    ],
  },
})

// ==========================================
// HELPERS
// ==========================================

// 🔥 Convierte "2025-01-15", "2025-01-15T00:00:00", Date → "YYYY-MM-DD" en hora local
function _normalizeFecha(f) {
  if (!f) return ''
  if (f instanceof Date) {
    return f.toLocaleDateString('sv-SE')
  }
  if (typeof f === 'string') {
    // Si viene con T, tomar solo la parte de fecha
    return f.slice(0, 10)
  }
  return ''
}

function _obtenerOrdenDelDia(description) {
  if (!description) return null
  const lines = description
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l)

  const orderIndex = lines.findIndex(
    (l) =>
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
    if (match) {
      items.push(match[2] || match[0])
    } else if (line.match(/^[A-ZÁÉÍÓÚÑ]/) && items.length > 0) {
      items[items.length - 1] += ' ' + line
    } else if (line.match(/^[•\-*]\s*(.*)/)) {
      const bm = line.match(/^[•\-*]\s*(.*)/)
      if (bm) items.push(bm[1])
    }
    i++
  }

  return items.length > 0 ? items : null
}