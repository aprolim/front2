// composables/useDocumentosLegislativos.js
// Cliente HTTP para el módulo de documentos legislativos.
//
// ⚠️ Este es el frontend PÚBLICO. Aquí solo se consultan estadísticas
// para los contadores de la portada; no hay operaciones de escritura
// (crear, editar, borrar, restaurar o subir archivos) porque el sitio
// no tiene autenticación. Esas acciones viven en el panel de
// administración.
//
// Los listados de cada página hacen su propio fetch directo a la API.

import { useApi } from './useApi'

export const useDocumentosLegislativos = () => {
  const { get } = useApi()
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiUrl || 'https://demoback.senado.gob.bo/api'

  // ============================================
  // 📊 STATS (contadores públicos)
  // ============================================
  const getStats = async (tipo, params = {}) => {
    const query = new URLSearchParams()
    // Filtro por gestión legislativa (fecha de carga del documento)
    if (params.creadoDesde) query.append('creadoDesde', params.creadoDesde)
    if (params.creadoHasta) query.append('creadoHasta', params.creadoHasta)

    const qs = query.toString()
    return await get(`${baseUrl}/legislativos/${tipo}/stats${qs ? `?${qs}` : ''}`)
  }

  return {
    getStats
  }
}
