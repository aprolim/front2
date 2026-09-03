// composables/useSenadores.js
import { senadores, suplentes, getSuplenteBySlugHelper, getTitularBySuplenteId } from '~/data/senadores'

export const useSenadores = () => {
  // Buscar un senador (titular) por slug
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

  // Buscar un suplente por slug (usando el array de suplentes)
  const getSuplenteBySlug = (slug) => {
    if (!slug) return null
    
    // Buscar en el array de suplentes
    const suplente = getSuplenteBySlugHelper(slug)
    if (!suplente) return null
    
    // Obtener el titular correspondiente
    const titular = getTitularBySuplenteId(suplente.id)
    if (!titular) return null
    
    // Retornar datos combinados (igual que antes)
    return {
      // ===== DATOS DEL TITULAR =====
      id: titular.id,
      seatNumber: titular.seatNumber,
      name: titular.name,
      slug: titular.slug,
      slugTitular: titular.slug,
      party: titular.party,
      partyShort: titular.partyShort,
      partyColor: titular.partyColor,
      department: titular.department,
      distritos: titular.distritos,
      comite: titular.comite || null,
      comision: titular.comision || null,
      cargo: titular.cargo || null,
      
      // ===== DATOS DEL SUPLENTE =====
      suplente: suplente.name,
      slugSuplente: suplente.slug,
      foto: suplente.foto,
      fotoSuplente: suplente.foto,
      fechaNacimiento: suplente.fechaNacimiento || 'No disponible',
      nacidoEn: suplente.nacidoEn || titular.department,
      ocupacion: suplente.ocupacion || 'No disponible',
      facebook: suplente.facebook || null,
      twitter: suplente.twitter || null,
      instagram: suplente.instagram || null,
      youtube: suplente.youtube || null,
      tiktok: suplente.tiktok || null,
      
      // ===== FLAG =====
      esSuplente: true
    }
  }

  // Obtener todos los senadores (titulares)
  const getTodosLosSenadores = () => {
    return senadores
  }

  // Obtener todos los suplentes (desde el array separado)
  const getTodosLosSuplentes = () => {
    return suplentes.map(suplente => {
      const titular = getTitularBySuplenteId(suplente.id)
      if (!titular) return null
      
      return {
        // ===== DATOS DEL TITULAR =====
        id: titular.id,
        seatNumber: titular.seatNumber,
        name: titular.name,
        slug: titular.slug,
        slugTitular: titular.slug,
        party: titular.party,
        partyShort: titular.partyShort,
        partyColor: titular.partyColor,
        department: titular.department,
        distritos: titular.distritos,
        comite: titular.comite || null,
        comision: titular.comision || null,
        cargo: titular.cargo || null,
        
        // ===== DATOS DEL SUPLENTE =====
        suplente: suplente.name,
        slugSuplente: suplente.slug,
        foto: suplente.foto,
        fotoSuplente: suplente.foto,
        fechaNacimiento: suplente.fechaNacimiento || 'No disponible',
        nacidoEn: suplente.nacidoEn || titular.department,
        ocupacion: suplente.ocupacion || 'No disponible',
        facebook: suplente.facebook || null,
        twitter: suplente.twitter || null,
        instagram: suplente.instagram || null,
        youtube: suplente.youtube || null,
        tiktok: suplente.tiktok || null,
        
        // ===== FLAG =====
        esSuplente: true
      }
    }).filter(Boolean)
  }

  return {
    getSenadorBySlug,
    getSuplenteBySlug,
    getTodosLosSenadores,
    getTodosLosSuplentes
  }
}