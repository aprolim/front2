// composables/useApiLegislativa.js
import { ref } from 'vue'

const API_BASE_URL = 'http://10.0.0.21:8000/api/v1'

export const useApiLegislativa = () => {
  const loading = ref(false)
  const error = ref(null)
  const resultados = ref([])
  const categorias = ref([])

  // Obtener categorías disponibles
  const obtenerCategorias = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_BASE_URL}/categorias`)
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      categorias.value = data.categorias || []
      return categorias.value
    } catch (err) {
      console.error('Error obteniendo categorías:', err)
      error.value = err.message
      return []
    } finally {
      loading.value = false
    }
  }

  // Buscar leyes con filtros
  const buscarLeyes = async (query, estado = null) => {
    loading.value = true
    error.value = null
    
    try {
      let url = `${API_BASE_URL}/leyes/buscar`
      const params = new URLSearchParams()
      
      if (query && query.trim()) {
        params.append('q', query.trim())
      }
      
      if (estado) {
        params.append('estado', estado)
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      console.log('🔍 Buscando:', url)
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      resultados.value = data.datos || []
      return {
        resultados: resultados.value,
        total: data.total_resultados || 0
      }
    } catch (err) {
      console.error('Error buscando leyes:', err)
      error.value = err.message
      return { resultados: [], total: 0 }
    } finally {
      loading.value = false
    }
  }

  // Obtener una ley específica
  const obtenerLey = async (nombreDocumento) => {
    loading.value = true
    error.value = null
    
    try {
      // Buscar todas las leyes y filtrar por nombre
      const result = await buscarLeyes(nombreDocumento)
      const ley = result.resultados.find(r => r.nombre_documento === nombreDocumento)
      return ley || null
    } catch (err) {
      console.error('Error obteniendo ley:', err)
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    resultados,
    categorias,
    obtenerCategorias,
    buscarLeyes,
    obtenerLey
  }
}