// composables/useGaleria.js
import { ref } from 'vue'
import { getAllImages } from '~/data/galeriaDescriptions'

// Configuración de la API (fácil de cambiar cuando el backend esté listo)
const API_BASE_URL = 'http://demoback.senado.gob.bo/api'

export const useGaleria = () => {
  const images = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  // Flag para saber si usamos API o datos locales
  // Cambiar a true cuando el backend esté listo
  const USE_API = false
  
  const fetchImages = async () => {
    loading.value = true
    error.value = null
    
    try {
      if (USE_API) {
        // 🔥 CUANDO EL BACKEND ESTÉ LISTO, ESTO FUNCIONARÁ
        const response = await fetch(`${API_BASE_URL}/galeria/images`)
        const result = await response.json()
        
        if (result.success) {
          images.value = result.data
        } else {
          throw new Error(result.message)
        }
      } else {
        // 🔥 MIENTRAS TANTO, USAMOS DATOS LOCALES
        console.log('📸 Usando datos locales de galería (backend no conectado)')
        images.value = getAllImages()
      }
    } catch (err) {
      console.error('Error cargando galería:', err)
      error.value = err.message
      // Fallback a datos locales en caso de error
      images.value = getAllImages()
    } finally {
      loading.value = false
    }
  }
  
  return {
    images,
    loading,
    error,
    fetchImages,
    USE_API
  }
}