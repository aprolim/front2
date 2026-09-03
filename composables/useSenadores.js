// composables/useSenadores.js
import { senadores } from '~/data/senadores'

export const useSenadores = () => {
  // ============================================
  // FUNCIONES AUXILIARES
  // ============================================
  
  // Obtener solo titulares
  const getTitulares = () => {
    return senadores.filter(s => s.tipo === 'titular')
  }

  // Obtener solo suplentes
  const getSuplentes = () => {
    return senadores.filter(s => s.tipo === 'suplente')
  }

  // Obtener un titular por ID
  const getTitularById = (id) => {
    return senadores.find(s => s.id === id && s.tipo === 'titular') || null
  }

  // Obtener un suplente por ID
  const getSuplenteById = (id) => {
    return senadores.find(s => s.id === id && s.tipo === 'suplente') || null
  }

  // Buscar un senador (titular o suplente) por slug
  const getSenadorBySlug = (slug) => {
    if (!slug) return null
    
    let encontrado = senadores.find(s => s.slug === slug)
    
    if (!encontrado) {
      for (const senador of senadores) {
        const slugGenerado = senador.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .replace(/ñ/g, 'n')
          .replace(/[^a-z0-9\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-')
        
        if (slugGenerado === slug) {
          encontrado = senador
          break
        }
      }
    }
    
    return encontrado || null
  }

  // Buscar un suplente por slug
  const getSuplenteBySlug = (slug) => {
    if (!slug) return null
    
    let suplente = senadores.find(s => s.tipo === 'suplente' && s.slug === slug)
    
    if (!suplente) {
      for (const s of senadores) {
        if (s.tipo === 'suplente') {
          const slugGenerado = s.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/ñ/g, 'n')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
          
          if (slugGenerado === slug) {
            suplente = s
            break
          }
        }
      }
    }
    
    if (!suplente) return null
    
    const titular = senadores.find(s => s.id === suplente.titularId && s.tipo === 'titular')
    
    return {
      ...suplente,
      titularNombre: titular?.name || 'No disponible',
      titularSlug: titular?.slug || null,
      titularFoto: titular?.foto || null,
      titularParty: titular?.party || null,
      titularPartyShort: titular?.partyShort || null,
      titularPartyColor: titular?.partyColor || null,
      esSuplente: true,
      esTitular: false
    }
  }

  // Obtener el suplente de un titular
  const getSuplenteByTitularId = (titularId) => {
    if (!titularId) return null
    return senadores.find(s => s.tipo === 'suplente' && s.titularId === titularId) || null
  }

  // Obtener el titular de un suplente
  const getTitularBySuplenteId = (suplenteId) => {
    if (!suplenteId) return null
    const suplente = senadores.find(s => s.id === suplenteId && s.tipo === 'suplente')
    if (!suplente) return null
    return senadores.find(s => s.id === suplente.titularId && s.tipo === 'titular') || null
  }

  // Obtener todos los senadores (titulares) - COMPATIBILIDAD
  const getTodosLosSenadores = () => {
    return getTitulares()
  }

  // Obtener todos los suplentes - COMPATIBILIDAD
  const getTodosLosSuplentes = () => {
    return getSuplentes()
  }

  return {
    // Funciones principales (mantienen compatibilidad)
    getSenadorBySlug,
    getSuplenteBySlug,
    getTodosLosSenadores,
    getTodosLosSuplentes,
    
    // Nuevas funciones
    getTitulares,
    getSuplentes,
    getTitularById,
    getSuplenteById,
    getSuplenteByTitularId,
    getTitularBySuplenteId
  }
}