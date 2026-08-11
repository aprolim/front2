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

  // Buscar un suplente por slug
  const getSuplenteBySlug = (slug) => {
    if (!slug) return null
    
    for (const senador of senadores) {
      if (senador.slugSuplente === slug) {
        return {
          ...senador,
          nombreSuplente: senador.suplente,
          fotoSuplente: senador.fotoSuplente,
          esSuplente: true,
          slug: senador.slugSuplente
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
        ...s,
        nombreSuplente: s.suplente,
        fotoSuplente: s.fotoSuplente,
        esSuplente: true,
        slug: s.slugSuplente
      }))
  }

  return {
    getSenadorBySlug,
    getSuplenteBySlug,
    getTodosLosSenadores,
    getTodosLosSuplentes
  }
}