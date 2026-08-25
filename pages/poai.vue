<template>
  <div class="min-h-screen bg-gray-50 py-8 flex justify-center">
    <div class="w-[90%] max-w-6xl">
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
      <!-- PLAN OPERATIVO ANUAL INDIVIDUAL - POAI    -->
      <!-- ========================================== -->
      <div class="management-container">
        <!-- Header -->
        <div class="management-header">
          <div class="header-left">
            <h2 class="management-title">
              Plan Operativo Anual Individual - POAI
              <span v-if="!loading && !error" class="badge">{{ documentos.length }} documentos</span>
            </h2>
          </div>
          
          <div class="header-controls">
            <!-- Buscador -->
            <div class="search-box">
              <input 
                type="text" 
                v-model="terminoBusqueda"
                @input="filtrarDocumentos"
                placeholder="Buscar documentos..."
                class="search-input"
              >
              <button class="search-button" :disabled="loading">
                <span class="search-icon">🔍</span>
              </button>
              <button 
                v-if="terminoBusqueda" 
                @click="limpiarBusqueda" 
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
          <button @click="cargarDocumentos" class="retry-button">Reintentar</button>
        </div>

        <!-- Lista de documentos -->
        <div v-else class="table-responsive">
          <table class="management-table">
            <thead>
              <tr>
                <th @click="ordenarPor('nombre')" class="sortable">
                  Nombre del archivo
                  <span class="sort-icon">{{ getSortIcon('nombre') }}</span>
                </th>
                <th @click="ordenarPor('fecha')" class="sortable">
                  Fecha de subida
                  <span class="sort-icon">{{ getSortIcon('fecha') }}</span>
                </th>
                <th @click="ordenarPor('tamaño')" class="sortable">
                  Tamaño
                  <span class="sort-icon">{{ getSortIcon('tamaño') }}</span>
                </th>
                <th class="actions-column">Documento</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="doc in documentosFiltrados" :key="doc.id" class="management-row">
                <td class="title-cell">
                  <div class="titulo-principal">{{ doc.nombre }}</div>
                  <div v-if="doc.descripcion" class="descripcion">{{ doc.descripcion }}</div>
                  <div v-if="doc.gestion" class="gestion-info">Gestión: {{ doc.gestion }}</div>
                </td>
                <td>{{ formatearFecha(doc.fecha) }}</td>
                <td>{{ formatearTamaño(doc.tamaño) }}</td>
                <td class="actions-cell">
                  <a 
                    :href="doc.url" 
                    target="_blank"
                    class="btn-documento"
                    title="Ver PDF"
                  >
                    <span class="btn-icon">📄</span>
                    <span class="btn-text">Ver PDF</span>
                  </a>
                </td>
              </tr>
              
              <!-- Fila vacía -->
              <tr v-if="documentosFiltrados.length === 0 && !loading">
                <td colspan="4" class="empty-state">
                  <p>No hay documentos disponibles</p>
                  <p v-if="terminoBusqueda" class="text-sm text-gray-400 mt-1">
                    No se encontraron resultados para "{{ terminoBusqueda }}"
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Información de depuración (opcional) -->
        <div v-if="documentos.length > 0 && !loading" class="debug-info p-2 text-xs border-t border-gray-200 bg-gray-50">
          <p>Total documentos: {{ documentos.length }} | Mostrando: {{ documentosFiltrados.length }}</p>
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
const documentos = ref([])
const documentosFiltrados = ref([])
const loading = ref(false)
const error = ref(null)
const terminoBusqueda = ref('')
const orden = ref({
  columna: 'fecha',
  direccion: 'desc'
})

// ============================================
// CONFIGURACIÓN DEL ENDPOINT
// ============================================
// 🔥 CAMBIA ESTA URL CUANDO TENGAS EL BACKEND
const API_URL = 'https://api.senado.gob.bo/poai'

// ============================================
// FUNCIONES
// ============================================
const formatearFecha = (fecha) => {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString('es-BO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatearTamaño = (bytes) => {
  if (!bytes) return '0 KB'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1048576).toFixed(1) + ' MB'
}

const filtrarDocumentos = () => {
  if (!terminoBusqueda.value.trim()) {
    documentosFiltrados.value = [...documentos.value]
    return
  }
  
  const termino = terminoBusqueda.value.toLowerCase().trim()
  documentosFiltrados.value = documentos.value.filter(doc => 
    (doc.nombre && doc.nombre.toLowerCase().includes(termino)) ||
    (doc.descripcion && doc.descripcion.toLowerCase().includes(termino)) ||
    (doc.gestion && doc.gestion.toLowerCase().includes(termino))
  )
  
  aplicarOrdenamiento()
}

const limpiarBusqueda = () => {
  terminoBusqueda.value = ''
  documentosFiltrados.value = [...documentos.value]
  aplicarOrdenamiento()
}

const aplicarOrdenamiento = () => {
  const columna = orden.value.columna
  const direccion = orden.value.direccion
  
  documentosFiltrados.value.sort((a, b) => {
    let valorA, valorB
    
    if (columna === 'nombre') {
      valorA = a.nombre || ''
      valorB = b.nombre || ''
    } else if (columna === 'fecha') {
      valorA = a.fecha ? new Date(a.fecha) : new Date(0)
      valorB = b.fecha ? new Date(b.fecha) : new Date(0)
    } else if (columna === 'tamaño') {
      valorA = a.tamaño || 0
      valorB = b.tamaño || 0
    }
    
    if (valorA < valorB) return direccion === 'asc' ? -1 : 1
    if (valorA > valorB) return direccion === 'asc' ? 1 : -1
    return 0
  })
}

const ordenarPor = (columna) => {
  if (orden.value.columna === columna) {
    orden.value.direccion = orden.value.direccion === 'asc' ? 'desc' : 'asc'
  } else {
    orden.value.columna = columna
    orden.value.direccion = 'desc'
  }
  aplicarOrdenamiento()
}

const getSortIcon = (columna) => {
  if (orden.value.columna !== columna) return '↕️'
  return orden.value.direccion === 'asc' ? '↑' : '↓'
}

// ============================================
// CARGAR DATOS DESDE API
// ============================================
const cargarDocumentos = async () => {
  loading.value = true
  error.value = null
  
  try {
    // 🔥 SIMULACIÓN DE DATOS - REEMPLAZAR CON LLAMADA REAL
    // const response = await fetch(API_URL)
    // const data = await response.json()
    // documentos.value = data
    
    // 📌 DATOS DE EJEMPLO (ELIMINAR CUANDO TENGA API)
    await new Promise(resolve => setTimeout(resolve, 800))
    documentos.value = [
      {
        id: 1,
        nombre: 'POAI 2026',
        descripcion: 'Plan Operativo Anual Individual 2026',
        gestion: '2026',
        fecha: '2026-08-25T10:00:00',
        tamaño: 204423168,
        url: '/pdfs/Recursos-humanos/POAIs 2026 APROBADO.pdf'
      }
    ]
    
    documentosFiltrados.value = [...documentos.value]
    aplicarOrdenamiento()
    
  } catch (err) {
    error.value = 'Error al cargar los documentos: ' + err.message
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
}

// ============================================
// CARGAR DATOS AL MONTAR
// ============================================
onMounted(() => {
  cargarDocumentos()
})
</script>

<style scoped>
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

.descripcion {
  font-size: 0.7rem;
  color: #94a3b8;
}

.gestion-info {
  font-size: 0.7rem;
  color: #E03636;
  margin-top: 2px;
}

.actions-cell {
  width: 100px;
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
  font-size: 0.7rem;
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

.debug-info {
  background-color: #f1f5f9;
  border-radius: 0 0 10px 10px;
  font-family: monospace;
  color: #334155;
}

@media (max-width: 768px) {
  .management-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-left {
    justify-content: center;
  }
  
  .header-controls {
    justify-content: center;
  }
  
  .search-input {
    width: 100%;
  }
  
  .btn-text {
    display: none;
  }
}
</style>