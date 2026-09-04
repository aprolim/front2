// composables/useSesiones.js
import { ref } from 'vue'

export const useSesiones = () => {
  const videos = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  const API_BASE_URL = 'https://demoback.senado.gob.bo/api'
  
  const fetchVideos = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_BASE_URL}/sesiones`)
      const result = await response.json()
      
      if (result.success && result.data && result.data.length > 0) {
        // Filtrar: SOLO videos NORMALES (excluir LIVE)
        videos.value = result.data
          .filter(v => v.isActive !== false && v.isLive !== true)
          .sort((a, b) => a.position - b.position)
        
        // Si hay menos de 3 videos activos, completar con placeholders
        if (videos.value.length < 3) {
          const defaults = [
            { position: 1, title: 'Sesión en vivo', youtubeId: 'dQw4w9WgXcQ', isActive: true, isLive: false },
            { position: 2, title: '90 Sesión Ordinaria', youtubeId: 'dQw4w9WgXcQ', isActive: true, isLive: false },
            { position: 3, title: '88 Sesión Ordinaria', youtubeId: 'dQw4w9WgXcQ', isActive: true, isLive: false }
          ]
          
          for (let i = 0; i < 3; i++) {
            if (!videos.value.find(v => v.position === i + 1)) {
              videos.value.push({
                position: i + 1,
                title: defaults[i].title,
                url: `https://www.youtube.com/watch?v=${defaults[i].youtubeId}`,
                youtubeId: defaults[i].youtubeId,
                isActive: true,
                isLive: false
              })
            }
          }
          videos.value.sort((a, b) => a.position - b.position)
        }
      } else {
        setDefaultVideos()
      }
    } catch (err) {
      console.error('Error cargando videos de sesiones:', err)
      error.value = err.message || 'Error desconocido'
      setDefaultVideos()
    } finally {
      loading.value = false
    }
  }
  
  const setDefaultVideos = () => {
    videos.value = [
      { position: 1, title: 'Sesión en vivo', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', youtubeId: 'dQw4w9WgXcQ', isActive: true, isLive: false },
      { position: 2, title: '90 Sesión Ordinaria', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', youtubeId: 'dQw4w9WgXcQ', isActive: true, isLive: false },
      { position: 3, title: '88 Sesión Ordinaria', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', youtubeId: 'dQw4w9WgXcQ', isActive: true, isLive: false }
    ]
  }
  
  return { videos, loading, error, fetchVideos }
}