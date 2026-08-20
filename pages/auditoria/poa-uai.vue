<!-- pages/poa-uai.vue -->
<template>
  <div class="min-h-screen bg-gray-50" style="font-size: 1vw;">
    <!-- Hero / Banner - Versión Compacta -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4" style="max-width: 90vw; padding: 2.5vw 0;">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between" style="gap: 1.5vw;">
          <div>
            <!-- Badge pequeño -->
            <div class="inline-flex items-center bg-white/10 rounded-full" style="gap: 0.4vw; padding: 0.2vw 0.8vw; margin-bottom: 0.5vw;">
              <Icon name="mdi:file-pdf-box" class="text-senado-gold" style="font-size: 1.2vw;" />
              <span class="text-white/80 tracking-wider font-medium" style="font-size: 0.7vw;">PLAN OPERATIVO ANUAL</span>
            </div>
            
            <!-- Título en línea -->
            <h1 class="font-bold leading-tight" style="font-size: 3.5vw;">
              POA - <span class="text-senado-gold">UAI</span>
            </h1>
            
            <!-- Subtítulo -->
            <p class="text-white/60 tracking-widest font-light" style="font-size: 0.9vw;">
              UNIDAD DE AUDITORÍA INTERNA
            </p>
          </div>
          
          <!-- Año actual destacado -->
          <div class="bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 text-center" style="padding: 0.6vw 2vw;">
            <span class="font-bold text-senado-gold" style="font-size: 2.5vw;">2026</span>
            <p class="text-white/60 tracking-wider" style="font-size: 0.6vw;">VIGENTE</p>
          </div>
        </div>
      </div>
      
      <!-- Onda inferior -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" class="w-full">
          <path fill="#f9fafb" fill-opacity="1" d="M0,48L48,42.7C96,37,192,27,288,24C384,21,480,27,576,29.3C672,32,768,27,864,24C960,21,1056,21,1152,24C1248,27,1344,32,1392,34.7L1440,37L1440,60L1392,60C1344,60,1248,60,1152,60C1056,60,960,60,864,60C768,60,672,60,576,60C480,60,384,60,288,60C192,60,96,60,48,60L0,60Z"></path>
        </svg>
      </div>
    </section>

    <div class="container mx-auto px-4" style="max-width: 90vw; padding: 2vw 0;">
      <!-- Tarjeta del Año Actual -->
      <div class="bg-white rounded-xl shadow-md border border-gray-100 relative z-10" style="padding: 1.2vw; margin-top: -0.8vw; margin-bottom: 1.5vw;">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between" style="gap: 1vw;">
          <div class="flex items-center" style="gap: 0.8vw;">
            <div class="bg-senado-primary text-white rounded-lg" style="padding: 0.5vw 1.2vw;">
              <span class="font-bold" style="font-size: 1.8vw;">2026</span>
            </div>
            <div>
              <h3 class="font-bold text-senado-primary" style="font-size: 1.1vw;">POA - UAI 2026</h3>
              <p class="text-gray-500" style="font-size: 0.7vw;">Plan Operativo Anual vigente</p>
            </div>
          </div>
          <a 
            href="#" 
            class="bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-colors inline-flex items-center font-medium whitespace-nowrap" 
            style="padding: 0.5vw 1.5vw; font-size: 0.8vw; gap: 0.4vw;"
          >
            <Icon name="mdi:download" style="font-size: 1.1vw;" />
            Descargar PDF
          </a>
        </div>
      </div>

      <!-- Estadísticas -->
      <div class="grid grid-cols-2 md:grid-cols-4" style="gap: 0.8vw; margin-bottom: 1.5vw;">
        <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100" style="padding: 0.8vw;">
          <div class="font-bold text-senado-primary" style="font-size: 2vw;">5</div>
          <p class="text-gray-500" style="font-size: 0.7vw;">Total POAs</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100" style="padding: 0.8vw;">
          <div class="font-bold text-green-600" style="font-size: 2vw;">1</div>
          <p class="text-gray-500" style="font-size: 0.7vw;">Vigentes</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100" style="padding: 0.8vw;">
          <div class="font-bold text-blue-600" style="font-size: 2vw;">5</div>
          <p class="text-gray-500" style="font-size: 0.7vw;">Publicados</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100" style="padding: 0.8vw;">
          <div class="font-bold text-yellow-600" style="font-size: 2vw;">0</div>
          <p class="text-gray-500" style="font-size: 0.7vw;">En Revisión</p>
        </div>
      </div>

      <!-- Tabla de Documentos -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <div class="border-b border-gray-100" style="padding: 0.6vw 1.2vw;">
          <h2 class="font-bold text-senado-primary flex items-center" style="font-size: 1.1vw; gap: 0.5vw;">
            <Icon name="mdi:file-document" style="font-size: 1.4vw;" />
            Documentos POA - UAI
          </h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="text-left text-gray-500 font-semibold uppercase tracking-wider" style="padding: 0.5vw 0.8vw; font-size: 0.6vw;">Año</th>
                <th class="text-left text-gray-500 font-semibold uppercase tracking-wider" style="padding: 0.5vw 0.8vw; font-size: 0.6vw;">Documento</th>
                <th class="text-left text-gray-500 font-semibold uppercase tracking-wider" style="padding: 0.5vw 0.8vw; font-size: 0.6vw;">Fecha</th>
                <th class="text-left text-gray-500 font-semibold uppercase tracking-wider" style="padding: 0.5vw 0.8vw; font-size: 0.6vw;">Estado</th>
                <th class="text-center text-gray-500 font-semibold uppercase tracking-wider" style="padding: 0.5vw 0.8vw; font-size: 0.6vw;">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(poa, index) in poas" 
                :key="index" 
                class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                :class="poa.activo ? 'bg-yellow-50/50' : ''"
              >
                <td style="padding: 0.5vw 0.8vw;">
                  <span class="font-bold" style="font-size: 0.85vw;">{{ poa.anio }}</span>
                  <span v-if="poa.activo" class="ml-1 font-bold text-yellow-600 bg-yellow-100 rounded-full" style="padding: 0.05vw 0.5vw; font-size: 0.5vw;">VIGENTE</span>
                </td>
                <td style="padding: 0.5vw 0.8vw;">
                  <div class="flex items-center" style="gap: 0.4vw;">
                    <Icon name="mdi:file-pdf-box" class="text-red-500" style="font-size: 1.4vw;" />
                    <span style="font-size: 0.7vw;">{{ poa.titulo }}</span>
                  </div>
                </td>
                <td style="padding: 0.5vw 0.8vw; font-size: 0.7vw; color: #6b7280;">{{ poa.fecha }}</td>
                <td style="padding: 0.5vw 0.8vw;">
                  <span 
                    class="rounded-full font-medium"
                    :class="poa.estado === 'Publicado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'"
                    style="padding: 0.1vw 0.6vw; font-size: 0.6vw;"
                  >
                    {{ poa.estado }}
                  </span>
                </td>
                <td style="padding: 0.5vw 0.8vw;">
                  <div class="flex items-center justify-center" style="gap: 0.6vw;">
                    <button class="text-senado-primary hover:text-senado-primary-dark transition-colors" title="Ver">
                      <Icon name="mdi:eye" style="font-size: 1.3vw;" />
                    </button>
                    <button class="text-gray-400 hover:text-gray-600 transition-colors" title="Descargar">
                      <Icon name="mdi:download" style="font-size: 1.3vw;" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Información Adicional -->
      <div class="grid grid-cols-1 md:grid-cols-2" style="gap: 1vw; margin-top: 1.5vw;">
        <!-- Proceso -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100" style="padding: 1vw;">
          <h3 class="font-bold text-senado-primary flex items-center" style="font-size: 0.9vw; gap: 0.4vw; margin-bottom: 0.6vw;">
            <Icon name="mdi:timeline" style="font-size: 1.2vw;" />
            Proceso de Elaboración
          </h3>
          <div style="gap: 0.4vw; display: flex; flex-direction: column;">
            <div class="flex items-start" style="gap: 0.6vw;">
              <div class="bg-blue-100 text-blue-600 font-bold rounded-full flex items-center justify-center flex-shrink-0" style="width: 1.6vw; height: 1.6vw; font-size: 0.7vw;">1</div>
              <div>
                <h4 class="font-semibold text-gray-800" style="font-size: 0.75vw;">Planificación</h4>
                <p class="text-gray-500" style="font-size: 0.6vw;">Definición de objetivos, actividades y metas</p>
              </div>
            </div>
            <div class="flex items-start" style="gap: 0.6vw;">
              <div class="bg-yellow-100 text-yellow-600 font-bold rounded-full flex items-center justify-center flex-shrink-0" style="width: 1.6vw; height: 1.6vw; font-size: 0.7vw;">2</div>
              <div>
                <h4 class="font-semibold text-gray-800" style="font-size: 0.75vw;">Revisión y Validación</h4>
                <p class="text-gray-500" style="font-size: 0.6vw;">Revisión por la UAI y validación institucional</p>
              </div>
            </div>
            <div class="flex items-start" style="gap: 0.6vw;">
              <div class="bg-green-100 text-green-600 font-bold rounded-full flex items-center justify-center flex-shrink-0" style="width: 1.6vw; height: 1.6vw; font-size: 0.7vw;">3</div>
              <div>
                <h4 class="font-semibold text-gray-800" style="font-size: 0.75vw;">Publicación</h4>
                <p class="text-gray-500" style="font-size: 0.6vw;">Publicación del POA aprobado</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Marco Legal -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100" style="padding: 1vw;">
          <h3 class="font-bold text-senado-primary flex items-center" style="font-size: 0.9vw; gap: 0.4vw; margin-bottom: 0.6vw;">
            <Icon name="mdi:scale-balance" style="font-size: 1.2vw;" />
            Marco Legal
          </h3>
          <div style="gap: 0.6vw; display: flex; flex-direction: column;">
            <div class="border-l-2 border-senado-gold" style="padding-left: 0.6vw;">
              <h4 class="font-semibold text-gray-800" style="font-size: 0.75vw;">Ley N° 1178</h4>
              <p class="text-gray-500" style="font-size: 0.6vw;">Ley SAFCO - Administración y Control Gubernamentales</p>
            </div>
            <div class="border-l-2 border-senado-gold" style="padding-left: 0.6vw;">
              <h4 class="font-semibold text-gray-800" style="font-size: 0.75vw;">DS N° 23318-A</h4>
              <p class="text-gray-500" style="font-size: 0.6vw;">Reglamento - Normas Básicas de Auditoría</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contacto -->
      <div class="bg-gray-50 rounded-xl border border-gray-200" style="padding: 1vw; margin-top: 1.5vw;">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between" style="gap: 0.8vw;">
          <div class="flex items-center" style="gap: 0.8vw;">
            <div class="bg-senado-primary rounded-full flex items-center justify-center flex-shrink-0" style="width: 2.2vw; height: 2.2vw;">
              <Icon name="mdi:email" class="text-white" style="font-size: 1.2vw;" />
            </div>
            <div>
              <h4 class="font-semibold text-gray-800" style="font-size: 0.85vw;">¿Necesitas más información?</h4>
              <p class="text-gray-500" style="font-size: 0.65vw;">Contacta a la Unidad de Auditoría Interna</p>
            </div>
          </div>
          <a 
            href="mailto:auditoria@senado.gob.bo" 
            class="text-senado-primary hover:text-senado-primary-dark font-medium inline-flex items-center" 
            style="font-size: 0.8vw; gap: 0.3vw;"
          >
            <Icon name="mdi:email" style="font-size: 1vw;" />
            auditoria@senado.gob.bo
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PoaUai',
  data() {
    return {
      poas: [
        {
          anio: 2026,
          titulo: 'Plan Operativo Anual - UAI 2026',
          fecha: '15/01/2026',
          estado: 'Publicado',
          activo: true
        },
        {
          anio: 2025,
          titulo: 'Plan Operativo Anual - UAI 2025',
          fecha: '10/01/2025',
          estado: 'Publicado',
          activo: false
        },
        {
          anio: 2024,
          titulo: 'Plan Operativo Anual - UAI 2024',
          fecha: '12/01/2024',
          estado: 'Publicado',
          activo: false
        },
        {
          anio: 2023,
          titulo: 'Plan Operativo Anual - UAI 2023',
          fecha: '08/01/2023',
          estado: 'Publicado',
          activo: false
        },
        {
          anio: 2022,
          titulo: 'Plan Operativo Anual - UAI 2022',
          fecha: '11/01/2022',
          estado: 'Publicado',
          activo: false
        }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}

/* Transiciones suaves */
.hover\:bg-gray-50\/50:hover {
  background-color: rgba(249, 250, 251, 0.5);
}

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>