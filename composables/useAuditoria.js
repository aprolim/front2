// composables/useAuditoria.js
import { ref, computed } from 'vue'

const API_BASE_URL = 'https://demoback.senado.gob.bo/api'

// Cache en memoria para evitar múltiples llamadas
const cache = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutos

export const useAuditoria = () => {
  const documentos = ref([])
  const categorias = ref([])
  const loading = ref(false)
  const error = ref(null)
  const lastFetch = ref(0)

  /**
   * Cargar documentos de auditoría desde el backend
   * @param {string} tipo - 'poa-uai' | 'auditorias-ejecutadas' | 'informes-actividades' | 'otras-actividades'
   * @param {boolean} force - Forzar recarga ignorando caché
   */
  const fetchDocumentos = async (tipo, force = false) => {
    const cacheKey = `auditoria_${tipo}`

    // Verificar caché
    if (!force && cache.has(cacheKey)) {
      const cached = cache.get(cacheKey)
      if (Date.now() - cached.timestamp < CACHE_TTL) {
        documentos.value = cached.documentos
        categorias.value = cached.categorias
        lastFetch.value = cached.timestamp
        return
      }
    }

    loading.value = true
    error.value = null

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch(`${API_BASE_URL}/auditoria/${tipo}`, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      })
      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.success && result.data) {
        documentos.value = result.data.documentos || []
        categorias.value = result.data.categorias || []
        lastFetch.value = Date.now()

        // Guardar en caché
        cache.set(cacheKey, {
          documentos: documentos.value,
          categorias: categorias.value,
          timestamp: lastFetch.value
        })
      } else {
        throw new Error(result.message || 'Error al cargar datos')
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        error.value = 'La solicitud tardó demasiado. Intente nuevamente.'
      } else {
        error.value = err.message
      }
      console.error(`❌ [Auditoria] Error cargando ${tipo}:`, err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Filtrar documentos por categoría
   */
  const documentosPorCategoria = (categoriaKey) => {
    return computed(() =>
      documentos.value.filter(d => d.categoria === categoriaKey)
    )
  }

  /**
   * Ordenar documentos por gestión (más reciente primero)
   */
  const documentosOrdenados = (docs) => {
    return [...docs].sort((a, b) => b.gestion - a.gestion)
  }

  /**
   * Estadísticas por categoría
   */
  const estadisticasPorCategoria = (categoriaKey) => {
    const docs = documentos.value.filter(d => d.categoria === categoriaKey)
    const gestiones = docs.map(d => d.gestion)

    return computed(() => ({
      total: docs.length,
      ultimoAnio: gestiones.length > 0 ? Math.max(...gestiones) : '-',
      aniosUnicos: new Set(gestiones).size,
      rangoAnios: gestiones.length > 0
        ? `${Math.min(...gestiones)} - ${Math.max(...gestiones)}`
        : '-'
    }))
  }

  return {
    documentos,
    categorias,
    loading,
    error,
    lastFetch,
    fetchDocumentos,
    documentosPorCategoria,
    documentosOrdenados,
    estadisticasPorCategoria,
    limpiarCache: () => cache.clear()
  }
}