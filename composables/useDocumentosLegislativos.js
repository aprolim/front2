// composables/useDocumentosLegislativos.js
// Cliente HTTP para el mÃ³dulo de documentos legislativos
// (FiscalizaciÃ³n, GestiÃ³n, LegislaciÃ³n).

import { useApi } from './useApi'

export const useDocumentosLegislativos = () => {
  const { get, post, put, patch } = useApi()
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiUrl || 'https://demoback.senado.gob.bo/api'

  // ============================================
  // ðŸ“¡ PÃšBLICO
  // ============================================
  const getDocumentosPublicos = async (tipo, params = {}) => {
    const query = new URLSearchParams()
    if (params.page) query.append('page', String(params.page))
    if (params.limit) query.append('limit', String(params.limit))
    if (params.search) query.append('search', params.search)
    if (params.gestion) query.append('gestion', String(params.gestion))
    // gestion legislativa (fecha de carga)
    if (params.creadoDesde) query.append('creadoDesde', params.creadoDesde)
    if (params.creadoHasta) query.append('creadoHasta', params.creadoHasta)

    const qs = query.toString()
    const url = `${baseUrl}/legislativos/${tipo}${qs ? `?${qs}` : ''}`
    return await get(url)
  }

  // ============================================
  // ðŸ” ADMIN
  // ============================================
  const getDocumentosAdmin = async (tipo, params = {}) => {
    const query = new URLSearchParams()
    if (params.page) query.append('page', String(params.page))
    if (params.limit) query.append('limit', String(params.limit))
    if (params.search) query.append('search', params.search)
    if (params.gestion) query.append('gestion', String(params.gestion))
    if (params.incluirInactivos) query.append('incluirInactivos', 'true')
    if (params.incluirEliminados) query.append('incluirEliminados', 'true')

    const qs = query.toString()
    const url = `${baseUrl}/legislativos/${tipo}/admin${qs ? `?${qs}` : ''}`
    return await get(url)
  }

  const getDocumentoById = async (tipo, id) => {
    return await get(`${baseUrl}/legislativos/${tipo}/${id}`)
  }

  const createDocumento = async (tipo, data) => {
    return await post(`${baseUrl}/legislativos/${tipo}`, data)
  }

  const updateDocumento = async (tipo, id, data) => {
    return await put(`${baseUrl}/legislativos/${tipo}/${id}`, data)
  }

  /**
   * ðŸ”¥ SOFT DELETE con motivo obligatorio.
   * El backend marca el documento como eliminado y guarda quiÃ©n/cuÃ¡ndo/por quÃ©.
   */
  const deleteDocumento = async (tipo, id, motivo) => {
    const token = process.client ? localStorage.getItem('auth_token') : ''
    const response = await fetch(`${baseUrl}/legislativos/${tipo}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ motivo })
    })
    const result = await response.json()
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Error al eliminar el documento')
    }
    return result
  }

  /**
   * Restaurar (solo SUPER_ADMIN)
   */
  const restoreDocumento = async (tipo, id) => {
    return await patch(`${baseUrl}/legislativos/${tipo}/${id}/restore`, {})
  }

  // ============================================
  // ðŸ“¤ UPLOAD PDF
  // ============================================
  const uploadPDF = async (tipo, file) => {
    const formData = new FormData()
    formData.append('pdf', file)

    const token = process.client ? localStorage.getItem('auth_token') : ''
    const response = await fetch(`${baseUrl}/legislativos/${tipo}/upload-pdf`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })
    const result = await response.json()
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Error al subir el PDF')
    }
    return result.data
  }

  // ============================================
  // ðŸ“Š STATS
  // ============================================
  const getStats = async (tipo, params = {}) => {
    const query = new URLSearchParams()
    // ðŸ”¥ Filtro por gestiÃ³n legislativa (fecha de carga)
    if (params.creadoDesde) query.append('creadoDesde', params.creadoDesde)
    if (params.creadoHasta) query.append('creadoHasta', params.creadoHasta)

    const qs = query.toString()
    return await get(`${baseUrl}/legislativos/${tipo}/stats${qs ? `?${qs}` : ''}`)
  }

  // ============================================
  // ðŸ“‹ CONFIG
  // ============================================
  const getConfigDelTipo = async (tipo) => {
    return await get(`${baseUrl}/legislativos/${tipo}/config`)
  }

  return {
    getDocumentosPublicos,
    getDocumentosAdmin,
    getDocumentoById,
    createDocumento,
    updateDocumento,
    deleteDocumento,
    restoreDocumento,
    uploadPDF,
    getStats,
    getConfigDelTipo
  }
}