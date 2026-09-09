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

  // NUEVA FUNCIÓN: Obtener proyectos de ley de un senador por ID
  const getProyectosLeyBySenadorId = (id) => {
    const senador = senadores.find(s => s.id === id)
    if (!senador) return null
    return senador.proyectosLey || { cantidad: 0, lista: [] }
  }

  // NUEVA FUNCIÓN: Obtener proyectos de ley de un senador por slug
  const getProyectosLeyBySlug = (slug) => {
    const senador = getSenadorBySlug(slug)
    if (!senador) return null
    return senador.proyectosLey || { cantidad: 0, lista: [] }
  }

  // NUEVA FUNCIÓN: Obtener resumen de proyectos por departamento
  const getResumenProyectosPorDepartamento = () => {
    const titulares = getTitulares()
    const resumen = {}
    
    titulares.forEach(s => {
      if (!resumen[s.department]) {
        resumen[s.department] = {
          totalProyectos: 0,
          senadores: []
        }
      }
      resumen[s.department].totalProyectos += s.proyectosLey?.cantidad || 0
      resumen[s.department].senadores.push({
        nombre: s.name,
        cantidad: s.proyectosLey?.cantidad || 0,
        proyectos: s.proyectosLey?.lista || []
      })
    })
    
    return resumen
  }

  // NUEVA FUNCIÓN: Obtener ranking de senadores por cantidad de proyectos
  const getRankingSenadoresPorProyectos = (limite = 10) => {
    const titulares = getTitulares()
    return titulares
      .filter(s => (s.proyectosLey?.cantidad || 0) > 0)
      .sort((a, b) => (b.proyectosLey?.cantidad || 0) - (a.proyectosLey?.cantidad || 0))
      .slice(0, limite)
      .map(s => ({
        id: s.id,
        nombre: s.name,
        department: s.department,
        party: s.party,
        partyColor: s.partyColor,
        cantidad: s.proyectosLey?.cantidad || 0,
        proyectos: s.proyectosLey?.lista || []
      }))
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
    getTitularBySuplenteId,
    
    // NUEVAS FUNCIONES PARA PROYECTOS DE LEY
    getProyectosLeyBySenadorId,
    getProyectosLeyBySlug,
    getResumenProyectosPorDepartamento,
    getRankingSenadoresPorProyectos
  }
}