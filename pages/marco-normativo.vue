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
        
        <!-- ============================================ -->
        <!-- 1. CONSTITUCIÓN Y NORMAS GENERALES (TARJETAS)-->
        <!-- ============================================ -->
        <div v-if="documentosDestacados.length > 0" class="mb-16">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div 
              v-for="doc in documentosDestacados" 
              :key="doc.id"
              class="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 group"
            >
              
              <!-- 🔥 VISOR DE LA PRIMERA HOJA DEL PDF -->
              <div class="p-4 bg-gray-50 border-b border-gray-200">
                <div class="relative w-full aspect-[3/4] bg-white shadow-sm border border-gray-300 overflow-hidden cursor-pointer flex items-center justify-center" @click="abrirDocumento(doc.url)">
                  
                  <!-- Spinner de carga del PDF -->
                  <div v-if="!portadasCargadas[doc.id]" class="flex flex-col items-center text-gray-400">
                    <div class="w-6 h-6 border-2 border-gray-300 border-t-[#611717] rounded-full animate-spin mb-2"></div>
                    <span class="text-[10px]">Cargando portada...</span>
                  </div>

                  <!-- El Canvas donde se dibuja el PDF -->
                  <canvas 
                    :ref="el => setCanvasRef(el, doc.id)"
                    class="w-full h-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    :class="{ 'opacity-0': !portadasCargadas[doc.id] }"
                  ></canvas>

                </div>
              </div>

              <!-- Info to delete-->
              <!-- <div class="p-4 flex-1 flex flex-col text-center bg-white">
                <h3 class="text-sm font-bold text-gray-800 mb-1 leading-tight line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
                  {{ doc.nombre }}
                </h3>
                <p class="text-xs text-gray-500 mb-4">Gestión {{ doc.gestion }}</p>
                
                <div class="mt-auto pt-2">
                  <a 
                    :href="doc.url" 
                    target="_blank"
                    class="inline-flex items-center justify-center w-full gap-2 bg-[#E03636] hover:bg-[#b82c2c] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Ver documento
                  </a>
                </div>
              </div> -->
            </div>
          </div>
        </div>

        <!-- ============================================ -->
        <!-- 2. RESTO DE CATEGORÍAS (PESTAÑAS MINIMIZADAS)-->
        <!-- ============================================ -->
        <div class="space-y-4 max-w-5xl mx-auto">
          <div 
            v-for="categoria in categoriasAcordeon" 
            :key="categoria.nombre"
            class="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white"
          >
            <button 
              @click="toggleCategoria(categoria.nombre)"
              class="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-senado-gold-lightest flex items-center justify-center text-senado-primary">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <h2 class="text-lg font-bold text-gray-800">{{ categoria.nombre }}</h2>
                <span class="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {{ categoria.documentos.length }}
                </span>
              </div>
              <div class="text-gray-400 transform transition-transform duration-300" :class="{ 'rotate-180': abiertos.includes(categoria.nombre) }">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            <div v-show="abiertos.includes(categoria.nombre)" class="border-t border-gray-200 overflow-x-auto">
              <table class="w-full">
                <thead class="bg-[#611717] text-white">
                  <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold w-2/3">Descripción</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold w-1/6">Gestión</th>
                    <th class="px-6 py-4 text-center text-sm font-semibold w-1/6">Archivo PDF</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="doc in categoria.documentos" :key="doc.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">
                      {{ doc.nombre }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                      {{ doc.gestion }}
                    </td>
                    <td class="px-6 py-4 text-sm text-center">
                      <a 
                        :href="doc.url" 
                        target="_blank"
                        class="inline-flex items-center gap-1 text-[#611717] hover:text-[#8f1522] font-medium hover:underline"
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
        </div>
      </template>

      <!-- Botón volver -->
      <div class="text-center mt-12">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[1.1vw] font-medium">
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
import { ref, computed, onMounted, nextTick } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'

// 🔥 IMPORTANTE: Configurar el Worker de PDF.js
// Como Nuxt lo empaqueta, debemos apuntar a la ruta del worker en la carpeta pública.
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

// ============================================
// ESTADO
// ============================================
const loading = ref(false)
const error = ref(null)
const documentos = ref([])
const abiertos = ref([])

// 🔥 Estado para saber qué canvas ya se renderizaron
const portadasCargadas = ref({})
const canvases = ref({})

const setCanvasRef = (el, id) => {
  if (el) {
    canvases.value[id] = el
  }
}

// ============================================
// DATOS
// ============================================
const documentosData = [
  {
    id: 1,
    categoria: 'Constitución Política del Estado',
    nombre: 'Constitución Política Del Estado Plurinacional de Bolivia',
    gestion: '2009',
    url: '/pdfs/Constitución Política del Estado/Constitución Politica Del Estado Plurinacional de Bolivia.pdf'
  },
  {
    id: 2,
    categoria: 'Norma General de Área Legislativa',
    nombre: 'Reglamento General de la Cámara de Senadores',
    gestion: '2024',
    url: '/pdfs/Norma General de Área Legislativa/Reglamento General de la Cámara de Senadores.pdf'
  },

  {
    id: 3,
    categoria: 'Norma General de Área Legislativa',
    nombre: 'Reglamento de Participación Ciudadana y Deliberación Pública',
    gestion: '2012',
    url: '/pdfs/Norma General de Área Legislativa/Reglamento de Participación Ciudadana y Deliberación Pública.pdf'
  },
  {
    id: 4,
    categoria: 'Norma General de Área Legislativa',
    nombre: 'Reglamento Específico de Homenajes Camarales',
    gestion: '2024',
    url: '/pdfs/Norma General de Área Legislativa/Reglamento Específico de Homenajes Camarales.pdf'
  },
  {
    id: 5,
    categoria: 'Norma General de Área Legislativa',
    nombre: 'Reglamento de Condecoraciones',
    gestion: '2022',
    url: '/pdfs/Norma General de Área Legislativa/Reglamento de Condecoraciones.pdf'
  },
  {
    id: 6,
    categoria: 'Norma General de Área Legislativa',
    nombre: 'Reglamento de Ética',
    gestion: '2014',
    url: '/pdfs/Norma General de Área Legislativa/Reglamento de Ética.pdf'
  },
  {
    id: 7,
    categoria: 'Normas del Área Administrativa',
    nombre: 'Manual de Organización y Funciones',
    gestion: '2020',
    url: '/pdfs/Norma General de Área Administrativa/Manual de Organización y Funciones.pdf'
  },
  {
    id: 8,
    categoria: 'Normas del Área Administrativa',
    nombre: 'Reglamento Interno de Personal',
    gestion: '2020',
    url: '/pdfs/Norma General de Área Administrativa/Reglamento Interno de Personal.pdf'
  },
  {
    id: 9,
    categoria: 'Normas del Área Administrativa',
    nombre: 'Manual de Administración de Activos Fijos',
    gestion: '2020',
    url: '/pdfs/Norma General de Área Administrativa/Manual de Administración de Activos Fijos.pdf'
  },
  {
    id: 10,
    categoria: 'Normas del Área Administrativa',
    nombre: 'Reglamento Específico del Sistema Contabilidad Integrada',
    gestion: '2020',
    url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico del Sistema Contabilidad Integrada.pdf'
  },
  {
    id: 11,
    categoria: 'Normas del Área Administrativa',
    nombre: 'Reglamento Específico del Sistema de Administración de Bienes y Servicios',
    gestion: '2020',
    url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico del Sistema de Administración de Bienes y Servicios.pdf'
  },
  {
    id: 12,
    categoria: 'Normas del Área Administrativa',
    nombre: 'Reglamento Específico del Sistema de Administración de Personal',
    gestion: '2020',
    url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico del Sistema de Administración de Personal.pdf'
  },
  {
    id: 13,
    categoria: 'Normas del Área Administrativa',
    nombre: 'Reglamento Específico del Sistema de Organización Administrativa',
    gestion: '2020',
    url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico del Sistema de Organización Administrativa.pdf'
  },
  {
    id: 14,
    categoria: 'Normas del Área Administrativa',
    nombre: 'Reglamento Específico del Sistema de Presupuestos',
    gestion: '2020',
    url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico del Sistema de Presupuestos.pdf'
  },
  {
    id: 15,
    categoria: 'Normas del Área Administrativa',
    nombre: 'Reglamento Específico del Sistema de Programación de Operaciones',
    gestion: '2020',
    url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico del Sistema de Programación de Operaciones.pdf'
  },
  {
    id: 16,
    categoria: 'Normas del Área Administrativa',
    nombre: 'Reglamento Específico Sistema de Tesorería',
    gestion: '2020',
    url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico Sistema de Tesorería.pdf'
  },
  {
    id: 17,
    categoria: 'Normas del Área Administrativa',
    nombre: 'Reglamento para el cumplimiento de Declaración Jurada de Bienes y Servicios',
    gestion: '2020',
    url: '/pdfs/Norma General de Área Administrativa/Reglamento para el cumplimiento de Declaración Jurada de Bienes y Servicios.pdf'
  },
  {
    id: 18,
    categoria: 'Normativa Interna',
    nombre: 'Código de Ética',
    gestion: '2020',
    url: '/pdfs/Normativa Interna/Código de Ética.pdf'
  },
  {
    id: 19,
    categoria: 'Normativa Interna',
    nombre: 'Manual de Administración de Almacenes',
    gestion: '2020',
    url: '/pdfs/Normativa Interna/Manual de Administración de Almacenes.pdf'
  },
  {
    id: 20,
    categoria: 'Normativa Interna',
    nombre: 'Manual de Procesos y Procedimientos del Sistema de Presupuestos',
    gestion: '2020',
    url: '/pdfs/Normativa Interna/Manual de Procesos y Procedimientos del Sistema de Presupuestos.pdf'
  }
]

// ============================================
// COMPUTED
// ============================================
const documentosDestacados = computed(() => {
  return documentos.value.filter(d => 
    d.categoria === 'Constitución Política del Estado' || 
    d.categoria === 'Norma General de Área Legislativa'
  )
})

const categoriasAcordeon = computed(() => {
  const categorias = [
    'Normas del Área Administrativa',
    'Normativa Interna'
  ]
  return categorias.map(nombre => ({
    nombre,
    documentos: documentos.value.filter(d => d.categoria === nombre)
  }))
})

// ============================================
// MÉTODOS
// ============================================

// 🔥 FUNCIÓN PARA DIBUJAR LA PRIMERA PÁGINA DEL PDF
const renderizarPortadas = async () => {
  await nextTick() // Esperar a que los canvas existan en el DOM

  for (const doc of documentosDestacados.value) {
    const canvas = canvases.value[doc.id]
    if (!canvas) continue

    try {
      // 1. Cargar el documento PDF
      const loadingTask = pdfjsLib.getDocument(doc.url)
      const pdf = await loadingTask.promise

      // 2. Obtener la primera página
      const page = await pdf.getPage(1)

      // 3. Calcular escala para que encaje bien en la tarjeta
      const context = canvas.getContext('2d')
      const viewportBase = page.getViewport({ scale: 1 })
      
      // Ajustamos la escala para que el ancho del PDF coincida con el ancho del contenedor (aprox 300px)
      const escala = 300 / viewportBase.width 
      const viewport = page.getViewport({ scale: escala })

      // 4. Configurar el canvas
      const dpr = window.devicePixelRatio || 1
      canvas.width = viewport.width * dpr
      canvas.height = viewport.height * dpr
      
      // 5. Renderizar
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
        transform: [dpr, 0, 0, dpr, 0, 0]
      }
      
      await page.render(renderContext).promise

      // 6. Marcar como cargada para quitar el spinner
      portadasCargadas.value[doc.id] = true
      
    } catch (err) {
      console.error(`Error cargando portada del PDF ${doc.id}:`, err)
      // Si falla, marcamos como cargada para que no se quede colgado el spinner
      portadasCargadas.value[doc.id] = true
    }
  }
}

const toggleCategoria = (nombre) => {
  const index = abiertos.value.indexOf(nombre)
  if (index === -1) {
    abiertos.value.push(nombre)
  } else {
    abiertos.value.splice(index, 1)
  }
}

const cargarDocumentos = () => {
  loading.value = true
  try {
    documentos.value = documentosData
    // Una vez que tenemos los documentos, renderizamos los PDFs
    setTimeout(() => {
      renderizarPortadas()
    }, 100)
  } catch (err) {
    error.value = 'Error al cargar'
  } finally {
    loading.value = false
  }
}

const abrirDocumento = (url) => {
  if (process.client && url) {
    window.open(url, '_blank')
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
/* Estilos para que el canvas se vea bien dentro de la tarjeta */
canvas {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: top center;
}
</style>