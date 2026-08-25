<template>
  <div class="min-h-screen bg-gray-50 py-8 flex justify-center">
    <div class="w-[90%] max-w-7xl">
      <!-- Botón volver -->
      <div class="mb-6">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center gap-2 text-gray-600 hover:text-senado-primary transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </NuxtLink>
      </div>

      <!-- ========================================== -->
      <!-- TABLA DE RESOLUCIONES CAMARALES            -->
      <!-- ========================================== -->
      <div class="management-container">
        <!-- Header -->
        <div class="management-header">
          <div class="header-left">
            <h2 class="management-title">
              Resoluciones Camarales
              <span v-if="!loading && !error" class="badge">{{ totalItems }} registros</span>
            </h2>
          </div>
          
          <div class="header-controls">
            <!-- Selector de filas por página -->
            <div class="rows-per-page">
              <span>Mostrar</span>
              <select v-model.number="itemsPorPagina" @change="cambiarFilasPorPagina">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span>filas</span>
            </div>

            <!-- Buscador -->
            <div class="search-box">
              <input 
                type="text" 
                v-model="terminoBusquedaLocal"
                @keyup.enter="aplicarBusquedaLocal"
                placeholder="Buscar por título, número o asunto..."
                class="search-input"
              >
              <button @click="aplicarBusquedaLocal" class="search-button" :disabled="loading">
                <span class="search-icon">🔍</span>
              </button>
              <button 
                v-if="terminoBusquedaLocal" 
                @click="limpiarBusquedaLocal" 
                class="clear-button"
                title="Limpiar búsqueda"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <!-- Estado de carga -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Cargando documentos...</p>
        </div>

        <!-- Estado de error -->
        <div v-else-if="error" class="error-state">
          <span class="error-icon">⚠️</span>
          <p>{{ error }}</p>
          <button @click="cargarDatosCompletos" class="retry-button">Reintentar</button>
        </div>

        <!-- Tabla -->
        <div v-else class="table-responsive">
          <table class="management-table">
            <thead>
              <tr>
                <th @click="ordenarPor('titulo')" class="sortable">
                  Título / Número
                  <span class="sort-icon">{{ getSortIcon('titulo') }}</span>
                </th>
                <th @click="ordenarPor('asunto')" class="sortable">
                  Asunto
                  <span class="sort-icon">{{ getSortIcon('asunto') }}</span>
                </th>
                <th class="actions-column">Documento</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in itemsPaginados" :key="item.id" class="management-row">
                <td class="title-cell">
                  <div class="titulo-principal">{{ item.titulo }}</div>
                  <div class="numero-ley">N° {{ item.numero }}</div>
                  <div class="fecha-info" v-if="item.fecha_aprobacion">
                    <span class="fecha-label">Aprobado:</span> {{ formatearFecha(item.fecha_aprobacion) }}
                  </div>
                </td>
                <td class="asunto-cell">
                  <div class="asunto-texto">{{ truncarTexto(item.asunto, 100) }}</div>
                  <div class="gestion-info" v-if="item.gestion">
                    <span class="gestion-label">Gestión:</span> {{ item.gestion }}
                  </div>
                  <div class="institucion-info" v-if="item.institucion_text">
                    <span class="institucion-label">Institución:</span> {{ item.institucion_text }}
                  </div>
                </td>
                <td class="actions-cell">
                  <a 
                    v-if="item.doc_archivo"
                    :href="`https://apisi.senado.gob.bo/${item.doc_archivo}`" 
                    target="_blank"
                    class="btn-documento"
                    title="Ver documento PDF"
                  >
                    <span class="btn-icon">📄</span>
                    <span class="btn-text">PDF</span>
                  </a>
                  <span v-else class="sin-documento">Sin documento</span>
                </td>
              </tr>
              
              <!-- Fila vacía -->
              <tr v-if="itemsFiltrados.length === 0">
                <td colspan="3" class="empty-state">
                  <p>No se encontraron documentos</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <div v-if="itemsFiltrados.length > 0 && !loading" class="table-footer">
          <div class="pagination-info">
            Mostrando {{ (paginaActual - 1) * itemsPorPagina + 1 }} - 
            {{ Math.min(paginaActual * itemsPorPagina, itemsFiltrados.length) }} de 
            {{ itemsFiltrados.length }} documentos
          </div>
          
          <div class="pagination-controls">
            <button 
              class="pagination-btn" 
              :disabled="paginaActual === 1"
              @click="cambiarPagina(paginaActual - 1)"
            >
              ← Anterior
            </button>
            
            <div class="pagination-numbers">
              <button 
                v-for="page in paginasMostradas" 
                :key="page"
                class="pagination-number"
                :class="{ active: page === paginaActual }"
                @click="cambiarPagina(page)"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              class="pagination-btn" 
              :disabled="paginaActual === totalPaginas"
              @click="cambiarPagina(paginaActual + 1)"
            >
              Siguiente →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// ============================================
// ESTADO
// ============================================
const todosLosDatos = ref([])
const loading = ref(false)
const error = ref(null)
const paginaActual = ref(1)
const itemsPorPagina = ref(10)
const terminoBusquedaLocal = ref('')
const busquedaLocalActiva = ref('')
const orden = ref({
  columna: 'titulo',
  direccion: 'desc'
})

// ============================================
// CONFIGURACIÓN DEL ENDPOINT
// ============================================
const ENDPOINT = {
  url: 'https://apisi.senado.gob.bo/page/resolucion-camarales',
  procesarRespuesta: (data) => {
    if (data.data && data.data.data) {
      return data.data.data
    }
    return []
  },
  obtenerTotalPaginas: (data) => {
    return data.data?.last_page || 1
  }
}

// ============================================
// COMPUTED
// ============================================
const itemsFiltrados = computed(() => {
  let datos = [...todosLosDatos.value]
  
  if (busquedaLocalActiva.value && busquedaLocalActiva.value.trim() !== '') {
    const termino = busquedaLocalActiva.value.toLowerCase().trim()
    datos = datos.filter(item => 
      (item.titulo && item.titulo.toLowerCase().includes(termino)) ||
      (item.numero && item.numero.toLowerCase().includes(termino)) ||
      (item.asunto && item.asunto.toLowerCase().includes(termino))
    )
  }
  
  return datos
})

const itemsOrdenados = computed(() => {
  if (!itemsFiltrados.value.length) return []
  
  return [...itemsFiltrados.value].sort((a, b) => {
    if (orden.value.columna === 'titulo') {
      const textoA = a.titulo || ''
      const textoB = b.titulo || ''
      return orden.value.direccion === 'asc' 
        ? textoA.localeCompare(textoB) 
        : textoB.localeCompare(textoA)
    } else if (orden.value.columna === 'asunto') {
      const asuntoA = a.asunto || ''
      const asuntoB = b.asunto || ''
      return orden.value.direccion === 'asc' 
        ? asuntoA.localeCompare(asuntoB) 
        : asuntoB.localeCompare(asuntoA)
    }
    return 0
  })
})

const itemsPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * itemsPorPagina.value
  const fin = inicio + itemsPorPagina.value
  return itemsOrdenados.value.slice(inicio, fin)
})

const totalItems = computed(() => {
  return todosLosDatos.value.length
})

const totalPaginas = computed(() => {
  return Math.ceil(itemsFiltrados.value.length / itemsPorPagina.value)
})

const paginasMostradas = computed(() => {
  const total = totalPaginas.value
  const actual = paginaActual.value
  const rango = 5
  
  let inicio = Math.max(1, actual - Math.floor(rango / 2))
  let fin = Math.min(total, inicio + rango - 1)
  
  if (fin - inicio + 1 < rango) {
    inicio = Math.max(1, fin - rango + 1)
  }
  
  return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i)
})

// ============================================
// FUNCIONES
// ============================================
const formatearFecha = (fecha) => {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString('es-BO')
}

const truncarTexto = (texto, longitud) => {
  if (!texto) return ''
  if (texto.length <= longitud) return texto
  return texto.substring(0, longitud) + '...'
}

const obtenerPagina = async (page) => {
  const url = `${ENDPOINT.url}?page=${page}`
  
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (err) {
    console.error(`Error cargando página ${page}:`, err)
    return null
  }
}

const cargarDatosCompletos = async () => {
  loading.value = true
  error.value = null
  
  try {
    const primeraPagina = await obtenerPagina(1)
    
    if (!primeraPagina) {
      throw new Error('No se pudo obtener la primera página')
    }
    
    const datosPrimeraPagina = ENDPOINT.procesarRespuesta(primeraPagina) || []
    const todasLasResoluciones = [...datosPrimeraPagina]
    
    const totalPaginas = ENDPOINT.obtenerTotalPaginas(primeraPagina)
    
    if (totalPaginas > 1) {
      const paginasRestantes = Array.from(
        { length: totalPaginas - 1 }, 
        (_, i) => i + 2
      )
      
      const promesas = paginasRestantes.map(page => obtenerPagina(page))
      const resultados = await Promise.all(promesas)
      
      resultados.forEach(res => {
        if (res) {
          const datosPagina = ENDPOINT.procesarRespuesta(res) || []
          todasLasResoluciones.push(...datosPagina)
        }
      })
    }
    
    todosLosDatos.value = todasLasResoluciones
    paginaActual.value = 1
    
    console.log(`✅ Cargados ${todosLosDatos.value.length} registros`)
  } catch (err) {
    error.value = 'Error al cargar los datos: ' + err.message
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
}

const aplicarBusquedaLocal = () => {
  busquedaLocalActiva.value = terminoBusquedaLocal.value || ''
  paginaActual.value = 1
}

const limpiarBusquedaLocal = () => {
  terminoBusquedaLocal.value = ''
  busquedaLocalActiva.value = ''
  paginaActual.value = 1
}

const cambiarPagina = (pagina) => {
  if (pagina >= 1 && pagina <= totalPaginas.value) {
    paginaActual.value = pagina
  }
}

const cambiarFilasPorPagina = () => {
  itemsPorPagina.value = Number(itemsPorPagina.value)
  paginaActual.value = 1
}

const ordenarPor = (columna) => {
  if (orden.value.columna === columna) {
    orden.value.direccion = orden.value.direccion === 'asc' ? 'desc' : 'asc'
  } else {
    orden.value.columna = columna
    orden.value.direccion = 'desc'
  }
  paginaActual.value = 1
}

const getSortIcon = (columna) => {
  if (orden.value.columna !== columna) return '↕️'
  return orden.value.direccion === 'asc' ? '↑' : '↓'
}

// ============================================
// CARGAR DATOS
// ============================================
onMounted(() => {
  cargarDatosCompletos()
})
</script>

<style scoped>
/* Contenedor principal con 90% de ancho */
.management-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  width: 100%;
  background: transparent;
}

.management-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.management-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

.badge {
  background: linear-gradient(135deg, #E03636, #b82c2c);
  color: white;
  padding: 2px 8px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
}

.header-controls {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.rows-per-page {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  padding: 4px 8px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-size: 0.85rem;
  color: #475569;
}

.rows-per-page select {
  border: 1px solid #e2e8f0;
  padding: 4px 8px;
  border-radius: 6px;
  background: white;
  color: #0f172a;
  font-size: 0.85rem;
  cursor: pointer;
  outline: none;
}

.rows-per-page select:hover {
  border-color: #E03636;
}

.search-box {
  display: flex;
  gap: 4px;
  background: white;
  padding: 3px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
}

.search-input {
  border: 1px solid #e2e8f0;
  padding: 6px 10px;
  font-size: 0.85rem;
  width: 260px;
  border-radius: 6px;
  outline: none;
  transition: all 0.2s;
  padding-right: 65px;
}

.search-input:focus {
  border-color: #E03636;
  box-shadow: 0 0 0 2px rgba(224, 54, 54, 0.2);
}

.search-button {
  background: #E03636;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.85rem;
  position: absolute;
  right: 3px;
  top: 3px;
}

.search-button:hover:not(:disabled) {
  background: #b82c2c;
}

.search-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.clear-button {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0 6px;
  position: absolute;
  right: 60px;
  top: 50%;
  transform: translateY(-50%);
  line-height: 1;
}

.clear-button:hover {
  color: #E03636;
}

.table-responsive {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: auto;
  margin-bottom: 16px;
}

.management-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.management-table th {
  background: #f8fafc;
  padding: 8px 12px;
  text-align: left;
  font-weight: 600;
  color: #475569;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  background: #f1f5f9;
}

.sort-icon {
  margin-left: 4px;
  font-size: 0.75rem;
  opacity: 0.6;
}

.management-row td {
  padding: 8px 12px;
  border-bottom: 1px solid #eef2f6;
  color: #334155;
  line-height: 1.3;
}

.management-row:hover td {
  background-color: #f8fafc;
}

.title-cell {
  min-width: 220px;
}

.titulo-principal {
  font-weight: 500;
  color: #0f172a;
  margin-bottom: 2px;
  font-size: 0.85rem;
}

.numero-ley {
  font-size: 0.7rem;
  color: #64748b;
  background: #f1f5f9;
  display: inline-block;
  padding: 1px 6px;
  border-radius: 10px;
  margin-bottom: 2px;
}

.fecha-info {
  font-size: 0.65rem;
  color: #94a3b8;
  margin-top: 2px;
}

.fecha-label, .gestion-label, .institucion-label {
  font-weight: 500;
  color: #64748b;
}

.asunto-cell {
  max-width: 450px;
}

.asunto-texto {
  line-height: 1.3;
  color: #475569;
  font-size: 0.8rem;
  margin-bottom: 4px;
}

.gestion-info, .institucion-info {
  font-size: 0.7rem;
  color: #E03636;
  margin-top: 2px;
}

.actions-cell {
  width: 70px;
  text-align: center;
}

.btn-documento {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #E03636;
  color: white;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.btn-documento:hover {
  background: #b82c2c;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(224, 54, 54, 0.3);
}

.sin-documento {
  font-size: 0.7rem;
  color: #94a3b8;
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px 0;
  font-size: 0.85rem;
}

.pagination-info {
  color: #64748b;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-btn {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 6px 12px;
  border-radius: 6px;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.8rem;
  font-weight: 500;
}

.pagination-btn:hover:not(:disabled) {
  background: #E03636;
  color: white;
  border-color: #E03636;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-numbers {
  display: flex;
  gap: 4px;
}

.pagination-number {
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.8rem;
  font-weight: 500;
}

.pagination-number:hover:not(.active):not(:disabled) {
  background: #f1f5f9;
  border-color: #E03636;
}

.pagination-number.active {
  background: #E03636;
  color: white;
  border-color: #E03636;
}

.loading-state {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 10px;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #e2e8f0;
  border-top-color: #E03636;
  border-radius: 50%;
  margin: 0 auto 12px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 10px;
}

.error-icon {
  font-size: 2rem;
  margin-bottom: 12px;
  display: block;
}

.retry-button {
  background: #E03636;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 12px;
}

.retry-button:hover {
  background: #b82c2c;
}

.empty-state {
  text-align: center;
  padding: 40px !important;
  color: #94a3b8;
  font-size: 0.95rem;
}

/* Responsive */
@media (max-width: 768px) {
  .management-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-left {
    justify-content: center;
  }
  
  .header-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .rows-per-page {
    justify-content: center;
  }
  
  .search-input {
    width: 100%;
  }
  
  .table-footer {
    flex-direction: column;
    text-align: center;
  }
  
  .pagination-controls {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .btn-text {
    display: none;
  }
  
  .asunto-cell {
    max-width: 150px;
  }
}
</style>