<template>
  <div class="min-h-screen bg-white py-12">
    <div class="mx-auto w-[90%] max-w-7xl">
      
      <!-- Título -->
      <div class="mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-senado-primary text-center">
          Marco <span class="text-[#8f1522]">Normativo</span>
        </h1>
        <div class="w-24 h-1 bg-[#611717] mx-auto mt-4"></div>
        <p class="text-center text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
          Consulta la normativa vigente del Senado de Bolivia
        </p>
      </div>

      <!-- Estado de carga -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-[#611717] border-t-transparent rounded-full animate-spin"></div>
        <p class="ml-3 text-gray-500">Cargando documentos...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button @click="cargarDocumentos" class="bg-[#611717] text-white px-4 py-2 rounded-lg hover:bg-[#3a060d] transition">
          Reintentar
        </button>
      </div>

      <!-- Mostrar documentos -->
      <template v-else>
        <!-- Constitución Política del Estado (Sección especial) -->
        <div v-if="constitucion" class="mb-12">
          <h2 class="text-2xl font-bold text-senado-primary mb-6 border-l-4 border-[#611717] pl-4">
            Constitución Política Del Estado
          </h2>
          <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <table class="w-full">
              <thead class="bg-[#611717] text-white">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold">Descripción</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold">Gestión</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold">Estado</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold">ARCHIVO PDF</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 text-sm font-medium text-gray-900">
                    {{ constitucion.nombre }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600">{{ constitucion.gestion }}</td>
                  <td class="px-6 py-4 text-sm">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {{ constitucion.estado }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm">
                    <a 
                      :href="constitucion.url" 
                      target="_blank"
                      class="text-[#611717] hover:text-[#8f1522] font-medium flex items-center gap-1 hover:underline"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Descargar
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Normas Generales por categoría -->
        <div v-for="categoria in categoriasNormativas" :key="categoria.nombre" class="mb-12">
          <h2 class="text-2xl font-bold text-senado-primary mb-6 border-l-4 border-[#611717] pl-4">
            {{ categoria.nombre }}
          </h2>
          
          <div v-if="categoria.documentos.length === 0" class="text-center py-8 bg-gray-50 rounded-xl">
            <p class="text-gray-500">No hay documentos en esta categoría</p>
          </div>
          
          <div v-else class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <table class="w-full">
              <thead class="bg-[#611717] text-white">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold">Descripción</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold">Gestión</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold">Estado</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold">ARCHIVO PDF</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="doc in categoria.documentos" :key="doc.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 text-sm font-medium text-gray-900">
                    {{ doc.nombre }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600">{{ doc.gestion }}</td>
                  <td class="px-6 py-4 text-sm">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {{ doc.estado }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm">
                    <a 
                      :href="doc.url" 
                      target="_blank"
                      class="text-[#611717] hover:text-[#8f1522] font-medium flex items-center gap-1 hover:underline"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Descargar
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>

      <!-- Botón volver -->
      <div class="text-center mt-12">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[1.1vw] font-medium"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// ============================================
// DATOS DE LOS DOCUMENTOS
// ============================================
const documentosData = [
  // Constitución Política del Estado
  {
    id: 1,
    categoria: 'Constitución Política del Estado',
    nombre: 'Constitución Política Del Estado Plurinacional de Bolivia',
    gestion: '2009',
    estado: 'Vigente',
    url: '/pdfs/Constitución Política del Estado/Constitución Politica Del Estado Plurinacional de Bolivia.pdf'
  },
  // Norma General de Área Legislativa
  {
    id: 2,
    categoria: 'Norma General de Área Legislativa',
    nombre: 'Reglamento de Ética',
    gestion: '2014',
    estado: 'Vigente',
    url: '/pdfs/Norma General de Área Legislativa/Reglamento de Ética.pdf'
  },
  {
    id: 3,
    categoria: 'Norma General de Área Legislativa',
    nombre: 'Reglamento de Condecoraciones',
    gestion: '2022',
    estado: 'Vigente',
    url: '/pdfs/Norma General de Área Legislativa/Reglamento de Condecoraciones.pdf'
  },
  {
    id: 4,
    categoria: 'Norma General de Área Legislativa',
    nombre: 'Reglamento de Participación Ciudadana y Deliberación Pública',
    gestion: '2012',
    estado: 'Vigente',
    url: '/pdfs/Norma General de Área Legislativa/Reglamento de Participación Ciudadana y Deliberación Pública.pdf'
  },
  {
    id: 5,
    categoria: 'Norma General de Área Legislativa',
    nombre: 'Reglamento General de la Cámara de Senadores',
    gestion: '2024',
    estado: 'Vigente',
    url: '/pdfs/Norma General de Área Legislativa/Reglamento General de la Cámara de Senadores.pdf'
  },
  {
    id: 6,
    categoria: 'Norma General de Área Legislativa',
    nombre: 'Reglamento Específico de Homenajes Camarales',
    gestion: '2024',
    estado: 'Vigente',
    url: '/pdfs/Norma General de Área Legislativa/Reglamento Específico de Homenajes Camarales.pdf'
  },
  // Norma General de Área Administrativa
  {
    id: 7,
    categoria: 'Norma General de Área Administrativa',
    nombre: 'Manual de Administración de Activos Fijos',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Norma General de Área Administrativa/Manual de Administración de Activos Fijos.pdf'
  },
  {
    id: 8,
    categoria: 'Norma General de Área Administrativa',
    nombre: 'Manual de Organización y Funciones',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Norma General de Área Administrativa/Manual de Organización y Funciones.pdf'
  },
  {
    id: 9,
    categoria: 'Norma General de Área Administrativa',
    nombre: 'Reglamento Específico del Sistema Contabilidad Integrada',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico del Sistema Contabilidad Integrada.pdf'
  },
  {
    id: 10,
    categoria: 'Norma General de Área Administrativa',
    nombre: 'Reglamento Específico del Sistema de Administración de Bienes y Servicios',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico del Sistema de Administración de Bienes y Servicios.pdf'
  },
  {
    id: 11,
    categoria: 'Norma General de Área Administrativa',
    nombre: 'Reglamento Específico del Sistema de Administración de Personal',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico del Sistema de Administración de Personal.pdf'
  },
  {
    id: 12,
    categoria: 'Norma General de Área Administrativa',
    nombre: 'Reglamento Específico del Sistema de Organización Administrativa',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico del Sistema de Organización Administrativa.pdf'
  },
  {
    id: 13,
    categoria: 'Norma General de Área Administrativa',
    nombre: 'Reglamento Específico del Sistema de Presupuestos',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico del Sistema de Presupuestos.pdf'
  },
  {
    id: 14,
    categoria: 'Norma General de Área Administrativa',
    nombre: 'Reglamento Específico del Sistema de Programación de Operaciones',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico del Sistema de Programación de Operaciones.pdf'
  },
  {
    id: 15,
    categoria: 'Norma General de Área Administrativa',
    nombre: 'Reglamento Específico Sistema de Tesorería',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico Sistema de Tesorería.pdf'
  },
  {
    id: 16,
    categoria: 'Norma General de Área Administrativa',
    nombre: 'Reglamento Interno de Personal',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Norma General de Área Administrativa/Reglamento Interno de Personal.pdf'
  },
  {
    id: 17,
    categoria: 'Norma General de Área Administrativa',
    nombre: 'Reglamento para el cumplimiento de Declaración Jurada de Bienes y Servicios',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Norma General de Área Administrativa/Reglamento para el cumplimiento de Declaración Jurada de Bienes y Servicios.pdf'
  },
  // Normativa Interna
  {
    id: 18,
    categoria: 'Normativa Interna',
    nombre: 'Código de Ética',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Código de Ética.pdf'
  },
  {
    id: 19,
    categoria: 'Normativa Interna',
    nombre: 'Manual de Administración de Almacenes',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Manual de Administración de Almacenes.pdf'
  },
  {
    id: 20,
    categoria: 'Normativa Interna',
    nombre: 'Manual de Procesos y Procedimientos del Sistema de Presupuestos',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Manual de Procesos y Procedimientos del Sistema de Presupuestos.pdf'
  },
  {
    id: 21,
    categoria: 'Normativa Interna',
    nombre: 'Manual del Proceso de Planificación y Seguimiento de Corto Plazo',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Manual del Proceso de Planificación y Seguimiento de Corto Plazo.pdf'
  },
  {
    id: 22,
    categoria: 'Normativa Interna',
    nombre: 'Procedimiento de Audiencias Públicas, Foros Ciudadanos y Encuentros Territoriales',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Procedimiento de Audiencias Públicas, Foros Ciudadanos y Encuentros Territoriales.pdf'
  },
  {
    id: 23,
    categoria: 'Normativa Interna',
    nombre: 'Reglamento de Cámara de Diputados',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Reglamento de Cámara de Diputados.pdf'
  },
  {
    id: 24,
    categoria: 'Normativa Interna',
    nombre: 'Reglamento de Gastos Institucionales en Actos Protocolares',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Reglamento de Gastos Institucionales en Actos Protocolares de la Cámara de Senadores.pdf'
  },
  {
    id: 25,
    categoria: 'Normativa Interna',
    nombre: 'Reglamento de Pasajes y Viáticos',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Reglamento de Pasajes y Viáticos.pdf'
  },
  {
    id: 26,
    categoria: 'Normativa Interna',
    nombre: 'Reglamento de Pasantías',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Reglamento de Pasantías.pdf'
  },
  {
    id: 27,
    categoria: 'Normativa Interna',
    nombre: 'Reglamento del Fondo Social',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Reglamento del Fondo Social.pdf'
  },
  {
    id: 28,
    categoria: 'Normativa Interna',
    nombre: 'Reglamento General de Fiscalización de Servicios',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Reglamento General de Fiscalización de Servicios.pdf'
  },
  {
    id: 29,
    categoria: 'Normativa Interna',
    nombre: 'Reglamento Interno de Administración y Uso de Vehículos',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Reglamento Interno de Administración y Uso de Vehículos.pdf'
  },
  {
    id: 30,
    categoria: 'Normativa Interna',
    nombre: 'Reglamento Interno de Implementación del Teletrabajo',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Reglamento Interno de Implementación del Teletrabajo.pdf'
  },
  {
    id: 31,
    categoria: 'Normativa Interna',
    nombre: 'Reglamento Interno del Fondo Rotativo',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Reglamento Interno del Fondo Rotativo.pdf'
  },
  {
    id: 32,
    categoria: 'Normativa Interna',
    nombre: 'Reglamento Interno para el Trato Preferente',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Reglamento Interno para el Trato Preferente.pdf'
  },
  {
    id: 33,
    categoria: 'Normativa Interna',
    nombre: 'Reglamento para la Administración de Fondos en Avance',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Reglamento para la Administración de Fondos en Avance.pdf'
  },
  {
    id: 34,
    categoria: 'Normativa Interna',
    nombre: 'Procedimiento de Contratación, Resolución y Contrato Modificatorio de Personal Eventual',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Procedimiento de Contratación, Resolución y Contrato Modificatorio de Personal Eventual.pdf'
  },
  {
    id: 35,
    categoria: 'Normativa Interna',
    nombre: 'Procedimiento Específico para Altas y Bajas del Personal Permanente y Eventual Ante la CNS',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Procedimiento Específico para Altas y Bajas del Personal Permanente y Eventual de la Cámára de Senadores Ante la Caja Nacional de Salud.pdf'
  },
  {
    id: 36,
    categoria: 'Normativa Interna',
    nombre: 'Procedimiento Específico para la Reposición de Activos Fijos',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Procedimiento Específico para la Reposición de Activos Fijos de la Cámara de Senadores.pdf'
  },
  {
    id: 37,
    categoria: 'Normativa Interna',
    nombre: 'Procedimiento para Foros de Interés Ciudadano',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Procedimiento para Foros de Interés Ciudadano.pdf'
  },
  {
    id: 38,
    categoria: 'Normativa Interna',
    nombre: 'Reglamento Especifico para la Administración de Recursos de Fondo Fijo de Caja Chica para las Brigadas Departamentales',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Reglamento Especifico para la Administración de Recursos de Fondo Fijo de Caja Chica para las Brigadas Departamentales de la Cámara de Senadores.pdf'
  },
  {
    id: 39,
    categoria: 'Normativa Interna',
    nombre: 'Reglamento Específico Fondo Fijo Caja Chica',
    gestion: '2020',
    estado: 'Vigente',
    url: '/pdfs/Normativa Interna/Reglamento Específico Fondo Fijo Caja Chica.pdf'
  }
]

// ============================================
// ESTADO
// ============================================
const loading = ref(false)
const error = ref(null)
const documentos = ref([])

// ============================================
// COMPUTED
// ============================================
const constitucion = computed(() => {
  return documentos.value.find(d => d.categoria === 'Constitución Política del Estado')
})

const categoriasNormativas = computed(() => {
  const categorias = ['Norma General de Área Legislativa', 'Norma General de Área Administrativa', 'Normativa Interna']
  
  return categorias.map(nombre => ({
    nombre,
    documentos: documentos.value.filter(d => d.categoria === nombre)
  }))
})

// ============================================
// CARGAR DOCUMENTOS
// ============================================
const cargarDocumentos = () => {
  loading.value = true
  error.value = null
  
  try {
    // Simular carga desde la carpeta public/pdfs
    documentos.value = documentosData
  } catch (err) {
    error.value = 'Error al cargar los documentos'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// ============================================
// LIFECYCLE
// ============================================
onMounted(() => {
  cargarDocumentos()
})
</script>

<style scoped>
/* ========================================== */
/* TABLA RESPONSIVE                          */
/* ========================================== */
@media (max-width: 768px) {
  table {
    font-size: 0.8rem;
  }
  
  thead {
    display: none;
  }
  
  tbody tr {
    display: block;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    margin-bottom: 12px;
    padding: 12px;
  }
  
  tbody td {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    border: none;
  }
  
  tbody td:before {
    content: attr(data-label);
    font-weight: 600;
    color: #4b5563;
  }
}
</style>