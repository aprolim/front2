<!-- pages/cursos-capacitacion.vue -->
<template>
  <div class="min-h-screen bg-gray-50" style="font-size: 1vw;">
    <!-- Contenedor más angosto -->
    <div class="container mx-auto px-4" style="max-width: 75vw; padding: 3vw 0;">
      
      <!-- ========================================== -->
      <!-- ENCABEZADO                                -->
      <!-- ========================================== -->
      <div class="text-center mb-10">
        <div class="inline-block bg-gradient-to-r from-senado-gold-light to-senado-gold px-6 py-1.5 rounded-full mb-3">
          <span class="text-[0.8vw] font-bold text-senado-primary uppercase tracking-wider flex items-center gap-2">
            <Icon name="mdi:school" class="text-[1.2vw]" />
            Formación Continua
          </span>
        </div>
        <h1 class="text-[4.5vw] font-bold text-senado-primary mb-2 tracking-tight">
          Cursos y Capacitación
        </h1>
        <p class="text-gray-600 text-[1.2vw] max-w-3xl mx-auto leading-relaxed">
          Capacitación continua para servidores públicos de la Cámara de Senadores
        </p>
        <div class="w-[8vw] h-[0.25vw] bg-gradient-to-r from-transparent via-senado-gold to-transparent mx-auto mt-4 rounded-full"></div>
      </div>

      <!-- ========================================== -->
      <!-- BUSCADOR Y FILTROS                        -->
      <!-- ========================================== -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 mb-8">
        <div class="flex flex-col md:flex-row items-center gap-4">
          <div class="relative flex-1 w-full">
            <Icon name="mdi:magnify" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[1.4vw]" />
            <input 
              v-model="busqueda"
              type="text" 
              placeholder="Buscar curso (ej: contrataciones, primeros auxilios)..."
              class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-[0.9vw] focus:outline-none focus:ring-2 focus:ring-senado-primary focus:border-transparent transition bg-gray-50/50"
            />
          </div>
          
          <div class="flex items-center gap-2 flex-wrap">
            <button
              v-for="estado in ['Todos', 'Próximamente', 'En curso', 'Finalizado']"
              :key="estado"
              @click="filtro = estado"
              class="px-5 py-2 rounded-full text-[0.8vw] font-semibold transition-all duration-300"
              :class="filtro === estado 
                ? 'bg-senado-primary text-white shadow-lg shadow-senado-primary/30' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            >
              {{ estado }}
            </button>
          </div>
        </div>
        
        <div class="flex items-center gap-5 mt-3 text-[0.75vw] text-gray-500 border-t border-gray-100 pt-3">
          <span class="flex items-center gap-2">
            <span class="bg-senado-primary text-white text-[0.65vw] font-bold px-3 py-0.5 rounded-full">{{ cursos.length }}</span>
            cursos disponibles
          </span>
          <span class="w-px h-5 bg-gray-200"></span>
          <span>Mostrando {{ inicio }} - {{ fin }} de {{ filtrados.length }}</span>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- GRID DE CURSOS - ALTURA UNIFORME          -->
      <!-- ========================================== -->
      <div v-if="paginados.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="curso in paginados" 
          :key="curso.id"
          class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
          :class="{ 
            'ring-2 ring-senado-gold ring-offset-2 shadow-xl': curso.destacado,
            'opacity-60 grayscale-[0.2]': curso.estado === 'Finalizado'
          }"
        >
          <!-- Badge destacado -->
          <div v-if="curso.destacado" class="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-[0.7vw] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
            <Icon name="mdi:star" class="text-[1vw]" />
            DESTACADO
          </div>

          <!-- Imagen - altura fija -->
          <div class="relative aspect-[3/4] overflow-hidden bg-gray-200 cursor-pointer flex-shrink-0" @click="abrirImagen(curso.imagen, curso.titulo)">
            <img 
              :src="curso.imagen" 
              :alt="curso.titulo"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
              @error="(e) => e.target.src = '/images/curso-default.jpg'"
            />
            
            <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
            
            <!-- Info sobre imagen -->
            <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
              <h3 class="text-[1.1vw] font-bold leading-tight mb-2 drop-shadow-lg line-clamp-2">
                {{ curso.titulo }}
              </h3>
              
              <div class="flex items-center gap-2 text-[0.9vw] text-white/95 drop-shadow-lg mb-1.5">
                <Icon name="mdi:calendar" class="text-[1vw]" />
                <span class="font-semibold">{{ curso.fecha }}</span>
              </div>
              
              <div class="flex items-center gap-2 text-[0.85vw] text-white/90 drop-shadow-lg">
                <Icon name="mdi:clock" class="text-[0.9vw]" />
                <span class="font-medium">{{ curso.horario }}</span>
              </div>
              
              <div v-if="curso.lugar" class="flex items-center gap-2 text-[0.8vw] text-white/80 drop-shadow-lg mt-1">
                <Icon name="mdi:map-marker" class="text-[0.85vw]" />
                <span class="line-clamp-1">{{ curso.lugar }}</span>
              </div>

              <div class="mt-3 pt-2 border-t border-white/20 text-[0.6vw] text-white/60 flex items-center gap-2">
                <Icon name="mdi:phone" class="text-[0.7vw]" />
                <span>73088068</span>
              </div>
            </div>

            <!-- Badges -->
            <div class="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
              <span class="bg-black/70 backdrop-blur-sm text-white text-[0.8vw] font-semibold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <Icon name="mdi:calendar-range" class="text-[0.9vw]" />
                {{ curso.duracion }}
              </span>
              
              <span 
                class="text-[0.9vw] font-bold px-5 py-2 rounded-full backdrop-blur-sm shadow-lg flex items-center gap-2"
                :class="{
                  'bg-blue-500/95 text-white': curso.estado === 'Próximamente',
                  'bg-green-500/95 text-white': curso.estado === 'En curso',
                  'bg-gray-600/95 text-white': curso.estado === 'Finalizado'
                }"
              >
                <Icon v-if="curso.estado === 'Próximamente'" name="mdi:clock-outline" class="text-[1.1vw]" />
                <span v-else-if="curso.estado === 'En curso'" class="inline-block w-2.5 h-2.5 bg-white rounded-full animate-pulse"></span>
                <Icon v-else name="mdi:check" class="text-[1.1vw]" />
                {{ curso.estado }}
              </span>
              
              <span class="bg-senado-primary/90 backdrop-blur-sm text-white text-[0.7vw] font-semibold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <Icon name="mdi:clock-time-four" class="text-[0.8vw]" />
                {{ curso.horas }} horas
              </span>
            </div>
          </div>

          <!-- Footer - altura fija -->
          <div class="p-4 bg-white border-t border-gray-100 flex-shrink-0">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Icon name="mdi:phone" class="text-[0.8vw] text-gray-400" />
                <span class="text-[0.6vw] text-gray-400">73088068</span>
              </div>
              <button 
                @click="verDetalle(curso)"
                class="text-[0.7vw] font-semibold text-senado-primary hover:text-senado-primary-dark flex items-center gap-2 group-hover:gap-3 transition-all duration-300 bg-senado-gold-lightest px-4 py-1.5 rounded-full hover:bg-senado-gold"
              >
                Ver más
                <Icon name="mdi:arrow-right" class="text-[0.8vw]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- PAGINACIÓN                                -->
      <!-- ========================================== -->
      <div v-if="totalPaginas > 1" class="flex flex-wrap items-center justify-center gap-2 mt-8">
        <button 
          @click="pagina--" 
          :disabled="pagina === 1"
          class="px-5 py-2.5 rounded-xl transition-all duration-300 text-[0.8vw] font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          :class="pagina === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-senado-primary hover:text-white'"
        >
          <Icon name="mdi:chevron-left" class="text-[1vw]" /> Anterior
        </button>

        <button 
          v-for="p in totalPaginas" 
          :key="p"
          @click="pagina = p"
          class="w-10 h-10 rounded-xl transition-all duration-300 text-[0.8vw] font-semibold"
          :class="p === pagina 
            ? 'bg-senado-primary text-white shadow-md shadow-senado-primary/30' 
            : 'bg-white border-2 border-gray-200 text-gray-600 hover:bg-gray-50'"
        >
          {{ p }}
        </button>

        <button 
          @click="pagina++" 
          :disabled="pagina === totalPaginas"
          class="px-5 py-2.5 rounded-xl transition-all duration-300 text-[0.8vw] font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          :class="pagina === totalPaginas ? 'bg-gray-100 text-gray-400' : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-senado-primary hover:text-white'"
        >
          Siguiente <Icon name="mdi:chevron-right" class="text-[1vw]" />
        </button>
      </div>

      <!-- Sin resultados -->
      <div v-else-if="filtrados.length === 0" class="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
        <Icon name="mdi:file-search" class="text-[4vw] text-gray-300" />
        <h3 class="text-[2.5vw] font-bold text-gray-700 mb-2">No se encontraron cursos</h3>
        <p class="text-[1.1vw] text-gray-500">Intenta con otros términos de búsqueda (sin acentos)</p>
        <button @click="busqueda = ''; filtro = 'Todos'" class="mt-5 text-senado-primary hover:underline text-[1vw] font-semibold">
          Limpiar búsqueda
        </button>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MODAL DE IMAGEN - ZOOM Y ARRASTRE         -->
    <!-- ========================================== -->
    <Teleport to="body">
      <div 
        v-if="imagenModal"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md"
        @click.self="cerrarImagen"
      >
        <div 
          class="relative flex flex-col items-center justify-center select-none bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden"
          style="width: 65vw; height: 92vh;"
          @click.self="cerrarImagen"
        >
          
          <button 
            @click="cerrarImagen"
            class="absolute top-2 right-2 z-20 text-white/70 hover:text-white transition-colors bg-black/50 hover:bg-black/70 rounded-full p-2.5"
          >
            <Icon name="mdi:close" class="text-[1.8vw]" />
          </button>

          <div class="absolute top-2 left-2 z-20 text-white/80 text-[1vw] font-medium max-w-[60vw] truncate bg-black/50 px-3 py-1.5 rounded-lg">
            {{ imagenTitulo }}
          </div>

          <div 
            class="w-full h-full flex items-center justify-center overflow-hidden"
            @mousedown="iniciarArrastre"
            @mousemove="moverArrastre"
            @mouseup="terminarArrastre"
            @mouseleave="terminarArrastre"
            @wheel.prevent="manejarZoom"
            :class="{ 'cursor-grab': zoom > 1, 'cursor-grabbing': isDragging }"
          >
            <img 
              :src="imagenSrc" 
              :alt="imagenTitulo"
              class="object-contain"
              :style="{
                maxWidth: '80vw',
                maxHeight: '80vh',
                transform: `scale(${zoom}) translate(${posX}px, ${posY}px)`,
                cursor: zoom > 1 ? 'grab' : 'default'
              }"
              draggable="false"
              @error="(e) => e.target.src = '/images/curso-default.jpg'"
            />
          </div>

          <div class="absolute bottom-[1.2vw] left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15">
            <button @click="zoomOut" class="text-white hover:text-senado-gold transition-colors p-1.5 rounded-full hover:bg-white/10">
              <Icon name="mdi:minus" class="text-[1.2vw]" />
            </button>
            <span class="text-white text-[0.7vw] font-mono min-w-[3.5vw] text-center">{{ Math.round(zoom * 100) }}%</span>
            <button @click="zoomIn" class="text-white hover:text-senado-gold transition-colors p-1.5 rounded-full hover:bg-white/10">
              <Icon name="mdi:plus" class="text-[1.2vw]" />
            </button>
            <div class="w-px h-4 bg-white/20"></div>
            <button @click="resetZoom" class="text-white/70 hover:text-white transition-colors text-[0.6vw] px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20">
              Reset
            </button>
            <div class="w-px h-4 bg-white/20"></div>
            <button @click="cerrarImagen" class="text-white/70 hover:text-white transition-colors text-[0.6vw] px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 flex items-center gap-1">
              <Icon name="mdi:close" class="text-[0.8vw]" />
              Cerrar
            </button>
          </div>

          <div v-if="zoom > 1" class="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/15 text-[0.5vw] pointer-events-none flex items-center gap-1.5 bg-black/30 px-2.5 py-0.5 rounded-full">
            <Icon name="mdi:cursor-move" class="text-[0.6vw]" />
            Arrastra para mover
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ========================================== -->
    <!-- MODAL DE DETALLE - SOLO TEXTO             -->
    <!-- ========================================== -->
    <Teleport to="body">
      <div 
        v-if="modal"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        @click.self="modal = false"
      >
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col">
          
          <!-- Header -->
          <div class="flex-shrink-0 bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white p-5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <Icon name="mdi:book-open-variant" class="text-[1.8vw]" />
                <h2 class="text-[1.8vw] font-bold">{{ cursoActual?.titulo }}</h2>
              </div>
              <button @click="modal = false" class="hover:bg-white/20 rounded-lg p-2 transition-colors">
                <Icon name="mdi:close" class="text-[1.8vw]" />
              </button>
            </div>
          </div>
          
          <!-- Body - SIN IMAGEN -->
          <div class="flex-1 overflow-y-auto p-6 space-y-5">
            
            <!-- Descripción completa -->
            <div>
              <h3 class="text-[1.2vw] font-bold text-senado-primary mb-3 flex items-center gap-2">
                <Icon name="mdi:book-open-page-variant" class="text-[1.4vw]" />
                Descripción del curso
              </h3>
              <div class="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <p class="text-[0.95vw] text-gray-700 leading-relaxed text-justify">
                  {{ cursoActual?.descripcion }}
                </p>
              </div>
            </div>

            <!-- Información del curso en grid -->
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div class="flex items-center gap-2 text-[0.7vw] text-gray-500 mb-1">
                  <Icon name="mdi:calendar" class="text-[0.9vw]" /> Fecha
                </div>
                <p class="text-[0.95vw] font-semibold text-gray-800">{{ cursoActual?.fecha }}</p>
              </div>
              
              <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div class="flex items-center gap-2 text-[0.7vw] text-gray-500 mb-1">
                  <Icon name="mdi:clock" class="text-[0.9vw]" /> Horario
                </div>
                <p class="text-[0.95vw] font-semibold text-gray-800">{{ cursoActual?.horario }}</p>
              </div>
              
              <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div class="flex items-center gap-2 text-[0.7vw] text-gray-500 mb-1">
                  <Icon name="mdi:map-marker" class="text-[0.9vw]" /> Lugar
                </div>
                <p class="text-[0.95vw] font-semibold text-gray-800">{{ cursoActual?.lugar }}</p>
              </div>
              
              <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div class="flex items-center gap-2 text-[0.7vw] text-gray-500 mb-1">
                  <Icon name="mdi:clock-outline" class="text-[0.9vw]" /> Duración
                </div>
                <p class="text-[0.95vw] font-semibold text-gray-800">{{ cursoActual?.duracion }}</p>
              </div>
            </div>

            <!-- Estado y horas -->
            <div class="flex items-center gap-4 flex-wrap">
              <span class="px-4 py-1.5 rounded-full text-[0.85vw] font-semibold flex items-center gap-1.5"
                :class="{
                  'bg-blue-500/20 text-blue-700': cursoActual?.estado === 'Próximamente',
                  'bg-green-500/20 text-green-700': cursoActual?.estado === 'En curso',
                  'bg-gray-500/20 text-gray-700': cursoActual?.estado === 'Finalizado'
                }"
              >
                <span v-if="cursoActual?.estado === 'En curso'" class="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <Icon v-else-if="cursoActual?.estado === 'Próximamente'" name="mdi:clock-outline" class="text-[0.9vw]" />
                <Icon v-else name="mdi:check" class="text-[0.9vw]" />
                {{ cursoActual?.estado }}
              </span>
              <span class="bg-senado-primary/10 text-senado-primary px-4 py-1.5 rounded-full text-[0.85vw] font-semibold flex items-center gap-1.5">
                <Icon name="mdi:clock-time-four" class="text-[0.9vw]" />
                {{ cursoActual?.horas }} horas
              </span>
              <span v-if="cursoActual?.destacado" class="bg-yellow-500/20 text-yellow-700 px-4 py-1.5 rounded-full text-[0.85vw] font-semibold flex items-center gap-1">
                <Icon name="mdi:star" class="text-[0.9vw]" /> Destacado
              </span>
            </div>

            <!-- Contacto -->
            <div class="border-t border-gray-200 pt-4 mt-2">
              <div class="flex items-center gap-3 text-[0.85vw] text-gray-500">
                <Icon name="mdi:phone" class="text-[1vw] text-senado-primary" />
                <span>Unidad de Desarrollo y Capacitación: <strong class="text-gray-700">73088068</strong></span>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex-shrink-0 border-t border-gray-200 p-4 flex justify-end gap-3">
            <button @click="modal = false" class="px-6 py-2 rounded-lg bg-senado-primary text-white hover:bg-senado-primary-dark transition-colors font-medium text-[0.9vw]">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
export default {
  name: 'CursosCapacitacion',
  data() {
    return {
      busqueda: '',
      filtro: 'Todos',
      pagina: 1,
      porPagina: 12,
      modal: false,
      cursoActual: null,
      imagenModal: false,
      imagenSrc: '',
      imagenTitulo: '',
      zoom: 1,
      posX: 0,
      posY: 0,
      isDragging: false,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      cursos: [
        { 
          id: 3, 
          titulo: 'Contrataciones Públicas', 
          descripcion: 'Desarrollar competencias técnicas en la contratación de personal, enseñando el proceso completo desde el cumplimiento de requisitos hasta el uso correcto de formularios y documentación de respaldo, garantizando la aplicación de la normativa interna.', 
          duracion: '1 día', 
          horas: 8, 
          fechaInicio: '2026-06-19',
          fechaFin: '2026-06-19',
          fecha: '19 JUNIO 2026', 
          horario: '15:00 - 17:00', 
          lugar: 'Salón Multipropósito', 
          destacado: true, 
          imagen: '/cursos/COMUNICACION/contrataciones.jpeg' 
        },
        { 
          id: 4, 
          titulo: 'Contratación, Manejo y Disposición de Bienes', 
          descripcion: 'Fortalecer las competencias técnicas de los servidores públicos en la correcta aplicación de la normativa relacionada con la contratación de bienes y servicios, el adecuado manejo, administración, custodia, control y disposición de los bienes institucionales.', 
          duracion: '1 día', 
          horas: 8, 
          fechaInicio: '2026-07-03',
          fechaFin: '2026-07-03',
          fecha: '03 JULIO 2026', 
          horario: '14:00 - 17:00', 
          lugar: 'Salón de Honor (Piso 16)', 
          destacado: false, 
          imagen: '/cursos/COMUNICACION/disposicion-bienes.jpeg' 
        },
        { 
          id: 5, 
          titulo: 'Primeros Auxilios y Uso de Extintores', 
          descripcion: 'Fortalecer los conocimientos y habilidades en primeros auxilios y uso adecuado de extintores, para responder de manera oportuna, segura y eficaz ante situaciones de emergencia, contribuyendo a la prevención de riesgos y a la seguridad institucional.', 
          duracion: '1 día', 
          horas: 8, 
          fechaInicio: '2026-08-14',
          fechaFin: '2026-08-14',
          fecha: '14 AGOSTO 2026', 
          horario: '15:30 - 17:00', 
          lugar: 'Unidad de Bomberos "Antofagasta" - Av. Sucre', 
          destacado: false, 
          imagen: '/cursos/COMUNICACION/primeros-auxilios.jpeg' 
        },
        { 
          id: 6, 
          titulo: 'Uso de Extintores', 
          descripcion: 'Fortalecer los conocimientos y habilidades en el uso adecuado de extintores, para responder de manera oportuna y segura ante situaciones de emergencia, contribuyendo a la prevención de riesgos y a la seguridad institucional.', 
          duracion: '1 día', 
          horas: 4, 
          fechaInicio: '2026-08-14',
          fechaFin: '2026-08-14',
          fecha: '14 AGOSTO 2026', 
          horario: '15:30 - 17:00', 
          lugar: 'Unidad de Bomberos "Antofagasta" - Av. Sucre', 
          destacado: false, 
          imagen: '/cursos/COMUNICACION/uso-extintores.jpeg' 
        },
        { 
          id: 7, 
          titulo: 'Gestión Estratégica del Oro Responsable en Bolivia', 
          descripcion: 'Capacitar a autoridades y servidores públicos en la formulación e implementación de políticas, normativas y estrategias orientadas a la extracción, comercialización y aprovechamiento del oro bajo estándares de responsabilidad ambiental, social y económica.', 
          duracion: '4 sesiones', 
          horas: 20, 
          fechaInicio: '2026-08-18',
          fechaFin: '2026-09-08',
          fecha: '18 AGOSTO 2026', 
          horario: '19:00 - 21:00', 
          lugar: 'Modalidad Semi-presencial', 
          destacado: true, 
          imagen: '/cursos/COMUNICACION/estrategica-oro.jpeg' 
        },
        { 
          id: 8, 
          titulo: 'Cambio Climático y Carbono', 
          descripcion: 'Fortalecer la coordinación y organización de actividades relacionadas con el cambio climático y la huella de carbono, contribuyendo a garantizar las condiciones necesarias para su adecuado desarrollo.', 
          duracion: '1 día', 
          horas: 10, 
          fechaInicio: '2026-08-25',
          fechaFin: '2026-08-25',
          fecha: '25 AGOSTO 2026', 
          horario: '17:30 - 19:30', 
          lugar: 'Salón de Interpelaciones (Piso -1)', 
          destacado: false, 
          imagen: '/cursos/COMUNICACION/cambio-climatico.jpeg' 
        },
        { 
          id: 9, 
          titulo: 'Evaluación de Edificios y Seguridad del Personal', 
          descripcion: 'Fortalecer los conocimientos y habilidades del personal en materia de procedimientos de evacuación, identificación de rutas de escape, zonas seguras y puntos de encuentro, así como en la aplicación de medidas preventivas y protocolos institucionales de respuesta ante situaciones de emergencia.', 
          duracion: '1 día', 
          horas: 2, 
          fechaInicio: '2026-08-25',
          fechaFin: '2026-08-25',
          fecha: '25 AGOSTO 2026', 
          horario: '10:00 - 12:00', 
          lugar: 'Salón de Interpelaciones (Piso -1)', 
          destacado: false, 
          imagen: '/cursos/COMUNICACION/evaluacion-edificios.jpeg' 
        },
        { 
          id: 1, 
          titulo: 'Relaciones Humanas y Protocolo', 
          descripcion: 'Fortalecer, capacitar y actualizar los conocimientos y habilidades de los servidores públicos, mejorando la calidad del servicio brindado a la ciudadanía, promoviendo una atención con calidez y calidad.', 
          duracion: '2 días', 
          horas: 10, 
          fechaInicio: '2026-05-14',
          fechaFin: '2026-05-15',
          fecha: '14-15 MAYO 2026', 
          horario: '16:00 - 17:30', 
          lugar: 'Salón Piso 16', 
          destacado: false, 
          imagen: '/cursos/COMUNICACION/relaciones-humanas.jpeg' 
        },
        { 
          id: 2, 
          titulo: 'Pasajes y Viáticos', 
          descripcion: 'Fortalecer los conocimientos de los servidores públicos sobre la administración, ejecución, control y rendición de cuentas de pasajes y viáticos, promoviendo la transparencia y el adecuado uso de los recursos públicos.', 
          duracion: '1 día', 
          horas: 8, 
          fechaInicio: '2026-05-29',
          fechaFin: '2026-05-29',
          fecha: '29 MAYO 2026', 
          horario: '14:00 - 17:00', 
          lugar: 'Salón Piso 16', 
          destacado: false, 
          imagen: '/cursos/COMUNICACION/pasajes-viaticos.jpeg' 
        }
      ]
    }
  },
  computed: {
    // 🔥 CALCULAR ESTADO Y ORDENAR AUTOMÁTICAMENTE
    cursosConEstado() {
      const hoy = new Date()
      hoy.setHours(0, 0, 0, 0)
      
      // Primero: calcular estado
      const cursosConEstado = this.cursos.map(curso => {
        const inicio = new Date(curso.fechaInicio)
        const fin = new Date(curso.fechaFin)
        
        let estado = 'Próximamente'
        
        if (inicio > hoy) {
          estado = 'Próximamente'
        } else if (hoy >= inicio && hoy <= fin) {
          estado = 'En curso'
        } else if (fin < hoy) {
          estado = 'Finalizado'
        }
        
        return {
          ...curso,
          estado
        }
      })
      
      // Segundo: ordenar por estado y fecha
      const ordenEstados = {
        'Próximamente': 0,
        'En curso': 1,
        'Finalizado': 2
      }
      
      return cursosConEstado.sort((a, b) => {
        // Primero ordenar por estado (Próximamente → En curso → Finalizado)
        const diffEstado = ordenEstados[a.estado] - ordenEstados[b.estado]
        if (diffEstado !== 0) return diffEstado
        
        // Dentro del mismo estado, ordenar por fecha (más cercano primero)
        const fechaA = new Date(a.fechaInicio)
        const fechaB = new Date(b.fechaInicio)
        
        // Para "Próximamente": el más cercano primero (fecha ascendente)
        // Para "En curso": el que está más activo (fecha ascendente)
        // Para "Finalizado": el más reciente primero (fecha descendente)
        if (a.estado === 'Finalizado') {
          return fechaB - fechaA // Descendente (más reciente primero)
        } else {
          return fechaA - fechaB // Ascendente (más cercano primero)
        }
      })
    },
    filtrados() {
      return this.cursosConEstado.filter(c => {
        const normalizar = (texto) => {
          if (!texto) return ''
          return texto
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/ñ/g, 'n')
            .replace(/ü/g, 'u')
        }
        
        const busquedaNormalizada = normalizar(this.busqueda)
        const tituloNormalizado = normalizar(c.titulo)
        const descripcionNormalizada = normalizar(c.descripcion)
        const fechaNormalizada = normalizar(c.fecha)
        
        const matchBusqueda = busquedaNormalizada === '' || 
          tituloNormalizado.includes(busquedaNormalizada) ||
          descripcionNormalizada.includes(busquedaNormalizada) ||
          fechaNormalizada.includes(busquedaNormalizada)
        
        const matchFiltro = this.filtro === 'Todos' || c.estado === this.filtro
        
        return matchBusqueda && matchFiltro
      })
    },
    totalPaginas() {
      return Math.ceil(this.filtrados.length / this.porPagina)
    },
    paginados() {
      const inicio = (this.pagina - 1) * this.porPagina
      return this.filtrados.slice(inicio, inicio + this.porPagina)
    },
    inicio() {
      return this.filtrados.length ? (this.pagina - 1) * this.porPagina + 1 : 0
    },
    fin() {
      return Math.min(this.pagina * this.porPagina, this.filtrados.length)
    }
  },
  watch: {
    busqueda() { this.pagina = 1 },
    filtro() { this.pagina = 1 }
  },
  methods: {
    abrirImagen(src, titulo) {
      this.imagenSrc = src
      this.imagenTitulo = titulo
      this.zoom = 1
      this.posX = 0
      this.posY = 0
      this.lastX = 0
      this.lastY = 0
      this.imagenModal = true
      if (this.modal) this.modal = false
    },
    cerrarImagen() {
      this.imagenModal = false
      this.isDragging = false
    },
    zoomIn() {
      if (this.zoom < 3) {
        this.zoom = Math.min(this.zoom + 0.2, 3)
      }
    },
    zoomOut() {
      if (this.zoom > 0.5) {
        this.zoom = Math.max(this.zoom - 0.2, 0.5)
        if (this.zoom <= 1) {
          this.posX = 0
          this.posY = 0
          this.lastX = 0
          this.lastY = 0
        }
      }
    },
    resetZoom() {
      this.zoom = 1
      this.posX = 0
      this.posY = 0
      this.lastX = 0
      this.lastY = 0
    },
    manejarZoom(event) {
      const delta = event.deltaY > 0 ? -0.15 : 0.15
      const nuevoZoom = Math.min(Math.max(this.zoom + delta, 0.5), 3)
      if (nuevoZoom <= 1) {
        this.posX = 0
        this.posY = 0
        this.lastX = 0
        this.lastY = 0
      }
      this.zoom = nuevoZoom
    },
    iniciarArrastre(event) {
      if (this.zoom <= 1) return
      this.isDragging = true
      this.startX = event.clientX
      this.startY = event.clientY
      this.lastX = this.posX
      this.lastY = this.posY
      event.preventDefault()
    },
    moverArrastre(event) {
      if (!this.isDragging || this.zoom <= 1) return
      const deltaX = event.clientX - this.startX
      const deltaY = event.clientY - this.startY
      const maxOffset = 300 * this.zoom
      this.posX = Math.min(Math.max(this.lastX + deltaX, -maxOffset), maxOffset)
      this.posY = Math.min(Math.max(this.lastY + deltaY, -maxOffset), maxOffset)
    },
    terminarArrastre() {
      this.isDragging = false
    },
    verDetalle(curso) {
      this.cursoActual = curso
      this.modal = true
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.group:hover { box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
@keyframes glow {
  0%, 100% { box-shadow: 0 0 10px rgba(201,168,76,0.3); }
  50% { box-shadow: 0 0 30px rgba(201,168,76,0.6); }
}
.ring-2.ring-senado-gold { animation: glow 2.5s ease-in-out infinite; }
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}
.animate-pulse { animation: pulse-dot 1.5s ease-in-out infinite; }
.cursor-grab { cursor: grab; }
.cursor-grabbing { cursor: grabbing; }
</style>