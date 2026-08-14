// composables/useNoticias.js
import { ref, computed } from 'vue'

const API_BASE_URL = 'http://demoback.senado.gob.bo/api'

const transformarNoticia = (item) => {
  if (!item) return null
  
  const textoPlano = item.content?.replace(/<[^>]*>/g, '') || ''
  const esImportante = item.category === 'importante'
  
  return {
    id: item._id || item.id,
    titulo: item.title || 'Sin título',
    slug: item.slug,
    contenido: item.content || '',
    resumen: item.excerpt || textoPlano.substring(0, 200),
    descripcion: item.excerpt || textoPlano.substring(0, 150),
    descripcion2: textoPlano.length > 200 ? textoPlano.substring(150, 350) : '',
    fecha: item.publishedAt || item.createdAt,
    publishedAt: item.publishedAt || item.createdAt,
    imagen: item.featuredImage?.url || item.imagen,
    featuredImage: item.featuredImage,
    categoria: item.category,
    importante: esImportante,
    tipo: item.type || 'noticia',
    status: item.status,
    views: item.views || 0,
    participantes: item.participantes || [],
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
  }
}

export const fetchNoticiasImportantes = async () => {
  console.log(`📡 [useNoticias] Cargando noticias IMPORTANTES...`)
  
  try {
    const response = await fetch(`${API_BASE_URL}/content?status=published&category=importante&limit=100`)
    const data = await response.json()
    
    if (data.success && data.data?.contents) {
      const noticias = data.data.contents
        .map(transformarNoticia)
        .filter(Boolean)
      
      console.log(`✅ [useNoticias] Cargadas ${noticias.length} noticias IMPORTANTES`)
      return noticias
    }
    return []
  } catch (err) {
    console.error('❌ Error cargando importantes:', err)
    return []
  }
}

export const fetchNoticiasUltimas = async () => {
  console.log(`📡 [useNoticias] Cargando NOTICIAS NO IMPORTANTES...`)
  
  try {
    const response = await fetch(`${API_BASE_URL}/content?status=published&category=noticia&limit=100`)
    const data = await response.json()
    
    if (data.success && data.data?.contents) {
      const noticias = data.data.contents
        .map(transformarNoticia)
        .filter(Boolean)
      
      console.log(`✅ [useNoticias] Cargadas ${noticias.length} noticias NO IMPORTANTES`)
      return noticias
    }
    return []
  } catch (err) {
    console.error('❌ Error cargando últimas:', err)
    return []
  }
}

// 🔥 FUNCIÓN PARA ORDENAR NOTICIAS POR FECHA
const ordenarPorFecha = (noticias) => {
  return [...noticias].sort((a, b) => {
    const fechaA = new Date(a.publishedAt || a.fecha || 0)
    const fechaB = new Date(b.publishedAt || b.fecha || 0)
    return fechaB - fechaA
  })
}

export const fetchNoticias = async () => {
  console.log(`📡 [useNoticias] Cargando todas las noticias...`)
  
  const [noticiasImportantes, ultimasNoticias] = await Promise.all([
    fetchNoticiasImportantes(),
    fetchNoticiasUltimas()
  ])
  
  const todasLasNoticias = ordenarPorFecha([...noticiasImportantes, ...ultimasNoticias])
  
  console.log(`📊 [useNoticias] Total combinado: ${todasLasNoticias.length} noticias`)
  
  return {
    noticiasImportantes: noticiasImportantes.slice(0, 4),
    ultimasNoticias: ultimasNoticias.slice(0, 4),
    todasLasNoticias: todasLasNoticias,
    error: null
  }
}

// 🔥 NUEVO: OBTENER NOTICIAS POR SENADOR
export const fetchNoticiasPorSenador = async (senadorId) => {
  console.log(`📡 [useNoticias] Buscando noticias del senador ID: ${senadorId}...`)
  
  try {
    const response = await fetch(`${API_BASE_URL}/content/senador/${senadorId}?limit=10`)
    const data = await response.json()
    
    if (data.success && data.data?.contents) {
      const noticias = data.data.contents
        .map(transformarNoticia)
        .filter(Boolean)
      
      console.log(`✅ [useNoticias] Cargadas ${noticias.length} noticias para el senador ${senadorId}`)
      return noticias
    }
    return []
  } catch (err) {
    console.error(`❌ Error cargando noticias del senador ${senadorId}:`, err)
    return []
  }
}

export const useNoticias = () => {
  const noticiasImportantes = ref([])
  const ultimasNoticias = ref([])
  const todasLasNoticias = ref([])
  const loading = ref(true)
  const error = ref(null)
  const loaded = ref(false)
  
  const cargarDatos = async () => {
    if (loaded.value) {
      console.log('📦 [useNoticias] Datos ya cargados, omitiendo...')
      return
    }
    
    console.log('🔄 [useNoticias] cargarDatos() ejecutándose...')
    
    loading.value = true
    const result = await fetchNoticias()
    
    noticiasImportantes.value = result.noticiasImportantes
    ultimasNoticias.value = result.ultimasNoticias
    todasLasNoticias.value = result.todasLasNoticias
    error.value = result.error
    loading.value = false
    loaded.value = true
    
    return result
  }
  
  const recargarDatos = async () => {
    console.log('🔄 [useNoticias] Recargando datos...')
    loaded.value = false
    await cargarDatos()
  }
  
  return {
    noticiasImportantes: computed(() => noticiasImportantes.value),
    ultimasNoticias: computed(() => ultimasNoticias.value),
    todasLasNoticias: computed(() => todasLasNoticias.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    loaded: computed(() => loaded.value),
    cargarDatos,
    recargarDatos,
    fetchNoticiasPorSenador // 🔥 NUEVO
  }
}