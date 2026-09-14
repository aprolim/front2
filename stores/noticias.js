// stores/noticias.js
import { defineStore } from 'pinia'

const CACHE_TTL = 3 * 60 * 1000 // 3 minutos
const API_BASE = 'https://demoback.senado.gob.bo/api'

// ============================================
// Helper: transformar noticia de la API
// ============================================
const transformarNoticia = (item) => {
  if (!item) return null

  const textoPlano = item.content?.replace(/<[^>]*>/g, '') || ''
  const esImportante = item.category === 'importante'

  return {
    id: item._id || item.id,
    titulo: item.title || 'Sin título',
    slug: item.slug,
    contenido: item.content || '',
    resumen: item.excerpt || textoPlano.substring(0, 200),
    descripcion: item.excerpt || textoPlano.substring(0, 150),
    descripcion2: textoPlano.length > 200 ? textoPlano.substring(150, 350) : '',
    fecha: item.publishedAt || item.createdAt,
    publishedAt: item.publishedAt || item.createdAt,
    imagen: item.featuredImage?.url || item.imagen,
    featuredImage: item.featuredImage,
    categoria: item.category,
    importante: esImportante,
    tipo: item.type || 'noticia',
    status: item.status,
    views: item.views || 0,
    participantes: item.participantes || [],
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }
}

export const useNoticiasStore = defineStore('noticias', {
  state: () => ({
    // Datos
    noticiasImportantes: [],
    ultimasNoticias: [],
    todasLasNoticias: [],

    // Estado
    loading: false,
    error: null,
    lastFetch: 0,
    loaded: false,

    // Control de duplicados
    _inFlight: null,
  }),

  getters: {
    // 🔥 ¿Hay datos guardados?
    hasData: (state) => state.lastFetch > 0,

    // 🔥 ¿El caché sigue válido?
    isCacheValid: (state) => {
      if (!state.lastFetch) return false
      return Date.now() - state.lastFetch < CACHE_TTL
    },

    // 🔥 ¿Hay noticias cargadas?
    hasNoticias: (state) => state.todasLasNoticias.length > 0,

    // 🔥 Noticia principal (la más reciente)
    noticiaPrincipal: (state) => {
      if (!state.noticiasImportantes.length) return null
      return state.noticiasImportantes[0]
    },

    // 🔥 Noticias secundarias (siguientes 3)
    noticiasSecundarias: (state) => {
      if (state.noticiasImportantes.length <= 1) return []
      return state.noticiasImportantes.slice(1, 4)
    },
  },

  actions: {
    async ensureLoaded(force = false) {
      if (!force && this.isCacheValid) {
        console.log('📰 [Noticias] Usando caché')
        return
      }

      if (this._inFlight) {
        console.log('📰 [Noticias] Esperando petición en curso')
        return this._inFlight
      }

      this._inFlight = this.load()
      try {
        await this._inFlight
      } finally {
        this._inFlight = null
      }
    },

    async load() {
      // 🔥 FIX: solo activar loading si no hay datos previos
      const tieneDatosPrevios = this.hasData
      if (!tieneDatosPrevios) {
        this.loading = true
      }
      this.error = null

      console.log('📰 [Noticias] Cargando...')

      try {
        // 🔥 Cargar importantes y últimas en paralelo, cada una independiente
        const [importantesRes, ultimasRes] = await Promise.allSettled([
          fetch(`${API_BASE}/content?status=published&category=importante&limit=100`, {
            headers: { 'Accept': 'application/json' },
          }),
          fetch(`${API_BASE}/content?status=published&category=noticia&limit=100`, {
            headers: { 'Accept': 'application/json' },
          }),
        ])

        let importantes = []
        let ultimas = []

        // Procesar importantes
        if (importantesRes.status === 'fulfilled' && importantesRes.value.ok) {
          try {
            const data = await importantesRes.value.json()
            if (data.success && data.data?.contents) {
              importantes = data.data.contents.map(transformarNoticia).filter(Boolean)
              console.log(`📰 [Noticias] ${importantes.length} importantes`)
            }
          } catch (e) {
            console.warn('⚠️ [Noticias] Error parseando importantes:', e.message)
          }
        } else if (importantesRes.status === 'rejected') {
          console.warn('⚠️ [Noticias] Error cargando importantes:', importantesRes.reason?.message)
        }

        // Procesar últimas
        if (ultimasRes.status === 'fulfilled' && ultimasRes.value.ok) {
          try {
            const data = await ultimasRes.value.json()
            if (data.success && data.data?.contents) {
              ultimas = data.data.contents.map(transformarNoticia).filter(Boolean)
              console.log(`📰 [Noticias] ${ultimas.length} normales`)
            }
          } catch (e) {
            console.warn('⚠️ [Noticias] Error parseando últimas:', e.message)
          }
        } else if (ultimasRes.status === 'rejected') {
          console.warn('⚠️ [Noticias] Error cargando últimas:', ultimasRes.reason?.message)
        }

        // Ordenar por fecha (más reciente primero)
        const ordenarPorFecha = (arr) =>
          [...arr].sort((a, b) => {
            const fa = new Date(a.publishedAt || a.fecha || 0)
            const fb = new Date(b.publishedAt || b.fecha || 0)
            return fb - fa
          })

        // Solo actualizar si obtuvimos algo
        if (importantes.length > 0 || ultimas.length > 0) {
          this.noticiasImportantes = ordenarPorFecha(importantes).slice(0, 4)
          this.ultimasNoticias = ordenarPorFecha(ultimas).slice(0, 4)
          this.todasLasNoticias = ordenarPorFecha([...importantes, ...ultimas])
          this.loaded = true
          console.log(`✅ [Noticias] Total: ${this.todasLasNoticias.length}`)
        } else {
          console.log('ℹ️ [Noticias] No se obtuvieron noticias (posible error CORS o sin datos)')
        }

        // 🔥 SIEMPRE actualizar lastFetch (aunque no haya datos)
        this.lastFetch = Date.now()
      } catch (err) {
        console.warn('⚠️ [Noticias] Error:', err.message)
        this.error = err.message
        // 🔥 También actualizar lastFetch aquí para no repetir el error inmediatamente
        this.lastFetch = Date.now()
      } finally {
        this.loading = false
      }
    },

    reset() {
      this.noticiasImportantes = []
      this.ultimasNoticias = []
      this.todasLasNoticias = []
      this.lastFetch = 0
      this.loaded = false
      this.error = null
    },
  },

  // 🔥 Persistencia en localStorage
  persist: {
    key: 'senado_noticias',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    paths: [
      'noticiasImportantes',
      'ultimasNoticias',
      'todasLasNoticias',
      'lastFetch',
      'loaded',
    ],
  },
})