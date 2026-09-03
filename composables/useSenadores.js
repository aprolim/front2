// composables/useSenadores.js
import { senadores } from '~/data/senadores'

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

  // Buscar un suplente por slug
  const getSuplenteBySlug = (slug) => {
    if (!slug) return null
    
    // Buscar el senador que tenga este slugSuplente
    const senador = senadores.find(s => s.slugSuplente === slug)
    if (!senador) return null
    
    // Retornar los datos del suplente combinados con los del titular
    return {
      // ===== DATOS DEL TITULAR =====
      id: senador.id,
      seatNumber: senador.seatNumber,
      name: senador.name,
      slug: senador.slug,
      slugTitular: senador.slug,
      party: senador.party,
      partyShort: senador.partyShort,
      partyColor: senador.partyColor,
      department: senador.department,
      distritos: senador.distritos,
      comite: senador.comite || null,
      comision: senador.comision || null,
      cargo: senador.cargo || null,
      
      // ===== DATOS DEL SUPLENTE =====
      suplente: senador.suplente,
      slugSuplente: senador.slugSuplente,
      foto: senador.fotoSuplente || senador.foto,
      fotoSuplente: senador.fotoSuplente,
      fechaNacimiento: senador.fechaNacimientoSuplente || 'No disponible',
      nacidoEn: senador.nacidoEnSuplente || senador.department,
      ocupacion: senador.ocupacionSuplente || 'No disponible',
      facebook: senador.facebookSuplente || null,
      twitter: senador.twitterSuplente || null,
      instagram: senador.instagramSuplente || null,
      youtube: senador.youtubeSuplente || null,
      tiktok: senador.tiktokSuplente || null,
      
      // ===== FLAG =====
      esSuplente: true
    }
  }

  // Obtener todos los senadores (titulares)
  const getTodosLosSenadores = () => {
    return senadores
  }

  // Obtener todos los suplentes
  const getTodosLosSuplentes = () => {
    return senadores
      .filter(s => s.suplente && s.suplente !== null && s.suplente !== 'null')
      .map(s => ({
        id: s.id,
        seatNumber: s.seatNumber,
        name: s.name,
        slug: s.slug,
        slugTitular: s.slug,
        party: s.party,
        partyShort: s.partyShort,
        partyColor: s.partyColor,
        department: s.department,
        distritos: s.distritos,
        comite: s.comite || null,
        comision: s.comision || null,
        cargo: s.cargo || null,
        suplente: s.suplente,
        slugSuplente: s.slugSuplente,
        foto: s.fotoSuplente || s.foto,
        fotoSuplente: s.fotoSuplente,
        fechaNacimiento: s.fechaNacimientoSuplente || 'No disponible',
        nacidoEn: s.nacidoEnSuplente || s.department,
        ocupacion: s.ocupacionSuplente || 'No disponible',
        facebook: s.facebookSuplente || null,
        twitter: s.twitterSuplente || null,
        instagram: s.instagramSuplente || null,
        youtube: s.youtubeSuplente || null,
        tiktok: s.tiktokSuplente || null,
        esSuplente: true
      }))
  }

  return {
    getSenadorBySlug,
    getSuplenteBySlug,
    getTodosLosSenadores,
    getTodosLosSuplentes
  }
}