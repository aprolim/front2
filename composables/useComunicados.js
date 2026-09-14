// composables/useComunicados.js

export const useComunicados = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiUrl || 'https://demoback.senado.gob.bo/api'

  /**
   * Obtener el comunicado activo (para el modal)
   * - Devuelve null si no hay ninguno activo
   * - El backend actualiza estados automáticamente
   */
  const getComunicadoActivo = async () => {
    try {
      console.log('📢 [useComunicados] Obteniendo comunicado activo...')

      const response = await fetch(`${baseUrl}/comunicados/activo`, {
        cache: 'no-store',
      })

      if (!response.ok) {
        console.error('❌ Error cargando comunicado activo:', response.status)
        return null
      }

      const result = await response.json()
      console.log('✅ [useComunicados] Respuesta:', result.data ? 'Comunicado encontrado' : 'Sin comunicado activo')

      return result.data || null
    } catch (error) {
      console.error('❌ Error obteniendo comunicado activo:', error)
      return null
    }
  }

  return {
    getComunicadoActivo,
  }
}