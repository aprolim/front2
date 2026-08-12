// composables/useSenadores.js
import { senadores } from '~/data/senadores'

export const useSenadores = () => {
  // Buscar un senador por slug
  const getSenadorBySlug = (slug) => {
    if (!slug) return null
    console.log('Buscando slug:', slug)
    console.log('Senadores disponibles:', senadores.map(s => ({ name: s.name, slug: s.slug })))
    
    // Buscar por slug exacto
    let encontrado = senadores.find(s => s.slug === slug)
    
    // Si no se encuentra, intentar buscar generando el slug desde el nombre
    if (!encontrado) {
      for (const senador of senadores) {
        // Generar slug manualmente (usando la misma función)
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
    
    console.log('Senador encontrado:', encontrado)
    return encontrado || null
  }

  // Buscar un suplente por slug - CORREGIDO CON TODOS LOS CAMPOS
  const getSuplenteBySlug = (slug) => {
    if (!slug) return null
    
    for (const senador of senadores) {
      if (senador.slugSuplente === slug) {
        return {
          // ===== DATOS DEL TITULAR (heredados) =====
          id: senador.id,
          seatNumber: senador.seatNumber,
          name: senador.name,
          slug: senador.slug, // slug del TITULAR (para link)
          slugTitular: senador.slug, // 🔥 EXPLÍCITAMENTE EL SLUG DEL TITULAR
          party: senador.party,
          partyShort: senador.partyShort,
          partyColor: senador.partyColor,
          department: senador.department,
          distritos: senador.distritos,
          
          // ===== DATOS DEL SUPLENTE (propios) =====
          suplente: senador.suplente,
          slugSuplente: senador.slugSuplente,
          fotoSuplente: senador.fotoSuplente,
          fechaNacimientoSuplente: senador.fechaNacimientoSuplente || 'No disponible',
          nacidoEnSuplente: senador.nacidoEnSuplente || senador.department,
          ocupacionSuplente: senador.ocupacionSuplente || 'No disponible',
          comiteSuplente: senador.comiteSuplente || 'No disponible',
          cargoSuplente: senador.cargoSuplente || 'No disponible',
          
          // ===== REDES SOCIALES DEL SUPLENTE =====
          facebookSuplente: senador.facebookSuplente || null,
          twitterSuplente: senador.twitterSuplente || null,
          instagramSuplente: senador.instagramSuplente || null,
          youtubeSuplente: senador.youtubeSuplente || null,
          tiktokSuplente: senador.tiktokSuplente || null,
          
          // ===== FLAG PARA IDENTIFICAR QUE ES SUPLENTE =====
          esSuplente: true
        }
      }
    }
    return null
  }

  // Obtener todos los senadores
  const getTodosLosSenadores = () => {
    return senadores
  }

  // Obtener todos los suplentes
  const getTodosLosSuplentes = () => {
    return senadores
      .filter(s => s.suplente && s.suplente !== null)
      .map(s => ({
        // ===== DATOS DEL TITULAR (heredados) =====
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
        
        // ===== DATOS DEL SUPLENTE (propios) =====
        suplente: s.suplente,
        slugSuplente: s.slugSuplente,
        fotoSuplente: s.fotoSuplente,
        fechaNacimientoSuplente: s.fechaNacimientoSuplente || 'No disponible',
        nacidoEnSuplente: s.nacidoEnSuplente || s.department,
        ocupacionSuplente: s.ocupacionSuplente || 'No disponible',
        comiteSuplente: s.comiteSuplente || 'No disponible',
        cargoSuplente: s.cargoSuplente || 'No disponible',
        
        // ===== REDES SOCIALES DEL SUPLENTE =====
        facebookSuplente: s.facebookSuplente || null,
        twitterSuplente: s.twitterSuplente || null,
        instagramSuplente: s.instagramSuplente || null,
        youtubeSuplente: s.youtubeSuplente || null,
        tiktokSuplente: s.tiktokSuplente || null,
        
        // ===== FLAG =====
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