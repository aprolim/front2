<!-- pages/auditoria/auditorias-ejecutadas.vue -->
<template>
  <div class="min-h-screen bg-gray-50" style="font-size: 1vw;">
    <!-- Hero / Banner -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4" style="max-width: 90vw; padding: 2.5vw 0;">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between" style="gap: 1.5vw;">
          <div>
            <div class="inline-flex items-center bg-white/10 rounded-full" style="gap: 0.4vw; padding: 0.2vw 0.8vw; margin-bottom: 0.5vw;">
              <Icon name="mdi:file-search" class="text-senado-gold" style="font-size: 1.2vw;" />
              <span class="text-white/80 tracking-wider font-medium" style="font-size: 0.7vw;">AUDITORÍAS</span>
            </div>
            
            <h1 class="font-bold leading-tight" style="font-size: 3.5vw;">
              Auditorías <span class="text-senado-gold">Ejecutadas</span>
            </h1>
            
            <p class="text-white/60 tracking-widest font-light" style="font-size: 0.9vw;">
              UNIDAD DE AUDITORÍA INTERNA
            </p>
          </div>
          
          <div class="flex gap-4">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg text-center" style="padding: 0.6vw 1.5vw; min-width: 6vw;">
              <span class="font-bold text-senado-gold" style="font-size: 1.8vw;">{{ totalAuditorias }}</span>
              <p class="text-white/60" style="font-size: 0.6vw;">TOTAL</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" class="w-full">
          <path fill="#f9fafb" fill-opacity="1" d="M0,48L48,42.7C96,37,192,27,288,24C384,21,480,27,576,29.3C672,32,768,27,864,24C960,21,1056,21,1152,24C1248,27,1344,32,1392,34.7L1440,37L1440,60L1392,60C1344,60,1248,60,1152,60C1056,60,960,60,864,60C768,60,672,60,576,60C480,60,384,60,288,60C192,60,96,60,48,60L0,60Z"></path>
        </svg>
      </div>
    </section>

    <div class="container mx-auto px-4" style="max-width: 90vw; padding: 2vw 0;">
      <!-- Tabs de navegación -->
      <div class="grid grid-cols-1 md:grid-cols-3" style="gap: 0.8vw; margin-bottom: 1.5vw;">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="tabActivo = tab.key"
          class="relative rounded-xl transition-all duration-300 text-left overflow-hidden group"
          :class="tabActivo === tab.key 
            ? 'ring-2 ring-senado-primary shadow-lg transform scale-[1.02]' 
            : 'hover:shadow-md hover:scale-[1.01]'"
          style="padding: 0.8vw 1vw;"
        >
          <div 
            class="absolute inset-0 transition-all duration-300"
            :class="tabActivo === tab.key 
              ? 'bg-gradient-to-r from-senado-primary to-senado-primary-dark' 
              : 'bg-white opacity-100'"
          ></div>
          
          <div class="relative z-10 flex items-center justify-between">
            <div class="flex items-center" style="gap: 0.6vw;">
              <div 
                class="rounded-full flex items-center justify-center transition-all duration-300"
                :class="tabActivo === tab.key 
                  ? 'bg-senado-primary text-white' 
                  : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'"
                style="width: 2.2vw; height: 2.2vw;"
              >
                <Icon :name="tab.icono" style="font-size: 1.2vw;" />
              </div>
              
              <div>
                <h3 
                  class="font-semibold transition-colors duration-300"
                  :class="tabActivo === tab.key ? 'text-senado-gold' : 'text-gray-700'"
                  style="font-size: 1.10vw;"
                >
                  {{ tab.nombre }}
                </h3>
                <div class="flex items-center" style="gap: 0.5vw; margin-top: 0.1vw;">
                  <span 
                    class="font-bold"
                    :class="tabActivo === tab.key ? 'text-senado-gold' : 'text-gray-500'"
                    style="font-size: 1.2vw;"
                  >
                    {{ obtenerTotalPorTipo(tab.key) }}
                  </span>
                  <span class="text-gray-400" style="font-size: 0.55vw;">documentos</span>
                  <span 
                    v-if="tabActivo === tab.key"
                    class="px-1.5 py-0.5 rounded-full bg-senado-primary text-white font-bold"
                    style="font-size: 0.45vw;"
                  >
                    ACTIVO
                  </span>
                </div>
              </div>
            </div>
            
            <div 
              class="transition-all duration-300"
              :class="tabActivo === tab.key ? 'text-senado-primary' : 'text-gray-300'"
            >
              <Icon 
                name="mdi:chevron-right" 
                style="font-size: 1.3vw;"
                :class="tabActivo === tab.key ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
              />
            </div>
          </div>
          
          <div 
            class="absolute bottom-0 left-0 h-1 transition-all duration-300"
            :class="tabActivo === tab.key ? 'bg-senado-primary' : 'bg-transparent group-hover:bg-gray-200'"
            :style="tabActivo === tab.key ? 'width: 100%;' : 'width: 0%;'"
          ></div>
        </button>
      </div>

      <!-- Contenido de los tabs -->
      <div v-for="tab in tabs" :key="tab.key">
        <div v-show="tabActivo === tab.key">
          <!-- Estadísticas -->
          <div class="grid grid-cols-2 md:grid-cols-4" style="gap: 0.8vw; margin-bottom: 1.5vw;">
            <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100" style="padding: 0.8vw;">
              <div class="font-bold text-senado-primary" style="font-size: 1.8vw;">{{ obtenerTotalPorTipo(tab.key) }}</div>
              <p class="text-gray-500" style="font-size: 0.65vw;">Total</p>
            </div>
            <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100" style="padding: 0.8vw;">
              <div class="font-bold text-blue-600" style="font-size: 1.8vw;">{{ obtenerUltimoAnio(tab.key) }}</div>
              <p class="text-gray-500" style="font-size: 0.65vw;">Último año</p>
            </div>
            <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100" style="padding: 0.8vw;">
              <div class="font-bold text-green-600" style="font-size: 1.8vw;">{{ obtenerAniosUnicos(tab.key) }}</div>
              <p class="text-gray-500" style="font-size: 0.65vw;">Años distintos</p>
            </div>
            <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100" style="padding: 0.8vw;">
              <div class="font-bold text-yellow-600" style="font-size: 1.8vw;">{{ obtenerRangoAnios(tab.key) }}</div>
              <p class="text-gray-500" style="font-size: 0.65vw;">Rango de años</p>
            </div>
          </div>

          <!-- Tabla de documentos -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div class="border-b border-gray-100 flex items-center justify-between" style="padding: 0.5vw 1vw;">
              <h2 class="font-bold text-senado-primary flex items-center" style="font-size: 1vw; gap: 0.4vw;">
                <Icon :name="tab.icono" style="font-size: 1.2vw;" />
                {{ tab.nombre }}
              </h2>
              <span class="text-gray-400 flex items-center" style="font-size: 0.6vw; gap: 0.2vw;">
                Ordenados: más reciente a más antiguo
                <Icon name="mdi:arrow-down" style="font-size: 0.7vw;" />
              </span>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="bg-gray-50 border-b border-gray-200">
                    <th class="text-left text-gray-500 font-semibold uppercase tracking-wider" style="padding: 0.4vw 0.6vw; font-size: 0.85vw;">Título</th>
                    <th class="text-left text-gray-500 font-semibold uppercase tracking-wider" style="padding: 0.4vw 0.6vw; font-size: 0.85vw;">Gestión</th>
                    <th class="text-left text-gray-500 font-semibold uppercase tracking-wider" style="padding: 0.4vw 0.6vw; font-size: 0.85vw;">Descripción</th>
                    <th class="text-center text-gray-500 font-semibold uppercase tracking-wider" style="padding: 0.4vw 0.6vw; font-size: 0.85vw;">Archivo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="(item, index) in obtenerDocumentosOrdenados(tab.key)" 
                    :key="index"
                    class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer"
                    @click="verPDF(item)"
                  >
                    <td style="padding: 0.35vw 0.6vw; width: 22vw;">
                      <span class="font-mono font-medium text-senado-primary" style="font-size: 0.90vw;">{{ item.titulo }}</span>
                    </td>
                    <td style="padding: 0.35vw 0.6vw; width: 8vw;">
                      <span class="font-bold" style="font-size: 0.90vw;">{{ item.gestion }}</span>
                    </td>
                    <td style="padding: 0.35vw 0.6vw;">
                      <span style="font-size: 0.85vw; color: #374151;">{{ item.descripcion }}</span>
                    </td>
                    <td style="padding: 0.35vw 0.6vw; width: 10vw;">
                      <div class="flex items-center justify-center" style="gap: 0.9vw;">
                        <a 
                          v-if="item.url"
                          :href="item.url" 
                          target="_blank"
                          class="bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-colors inline-flex items-center font-medium" 
                          style="padding: 0.3vw 0.8vw; font-size: 0.7vw; gap: 0.3vw;"
                          @click.stop
                        >
                          <Icon name="mdi:download" style="font-size: 0.9vw;" />
                          Descargar
                        </a>
                        <span v-else class="text-gray-300 text-xs" style="font-size: 0.6vw;">Sin PDF</span>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Sin datos -->
                  <tr v-if="obtenerDocumentosOrdenados(tab.key).length === 0">
                    <td colspan="4" class="text-center py-8 text-gray-500" style="font-size: 0.9vw;">
                      No hay documentos disponibles para {{ tab.nombre }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Leyenda -->
      <div class="mt-8 bg-gray-50 rounded-xl border border-gray-200" style="padding: 0.8vw 1.2vw;">
        <div class="flex flex-wrap items-center" style="gap: 1vw;">
          <span class="font-semibold text-gray-700" style="font-size: 0.7vw;">Tipos de Auditoría:</span>
          <span class="flex items-center" style="gap: 0.4vw;">
            <span class="rounded-full" style="width: 0.7vw; height: 0.7vw; background-color: #3b82f6;"></span>
            <span style="font-size: 0.6vw; color: #4b5563;">Cumplimiento</span>
          </span>
          <span class="flex items-center" style="gap: 0.4vw;">
            <span class="rounded-full" style="width: 0.7vw; height: 0.7vw; background-color: #22c55e;"></span>
            <span style="font-size: 0.6vw; color: #4b5563;">Operacionales</span>
          </span>
          <span class="flex items-center" style="gap: 0.4vw;">
            <span class="rounded-full" style="width: 0.7vw; height: 0.7vw; background-color: #8b5cf6;"></span>
            <span style="font-size: 0.6vw; color: #4b5563;">Confiabilidad</span>
          </span>
          <span class="flex items-center ml-auto" style="gap: 0.3vw;">
            <span style="font-size: 0.55vw; color: #9ca3af;">💡 Haz clic en cualquier fila para ver el PDF</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'AuditoriasEjecutadas',
  
  setup() {
    // Estado
    const tabActivo = ref('cumplimiento')

    // Tabs
    const tabs = [
      { key: 'cumplimiento', nombre: 'Auditoría de Cumplimiento', icono: 'mdi:clipboard-check' },
      { key: 'operacionales', nombre: 'Auditoría de Operativa', icono: 'mdi:cog' },
      { key: 'confiabilidad', nombre: 'Auditoría de Confiabilidad', icono: 'mdi:shield-check' }
    ]

    // 🔥 DATOS COMPLETOS DESDE LOS HTML
    const auditorias = {
      cumplimiento: [
        { titulo: 'UAI/ACU/CI-002/2025', gestion: 2025, descripcion: 'INFORME DE CONTROL INTERNO PRODUCTO DE LA AUDITORIA DE CUMPLIMIENTO AL SISTEMA DE PRESUPUESTOS DE LA CAMARA DE SENADORES - GESTION 2024', url: 'https://apisi.senado.gob.bo/images/a0d5e3d0-afea-4234-b721-73aba2c82986_1768405105.pdf' },
        { titulo: 'UAI/ACU/CI-001/2025', gestion: 2025, descripcion: 'INFORME DE CONTROL INTERNO PRODUCTO DE LA AUDITORIA DE CUMPLIMIENTO AL PROCEDIMIENTO ESPECÍFICO PARA EL CONTROL Y CONCILIACIÓN DE DATOS LIQUIDADOS EN LAS PLANILLASSALARIALES Y LOS REGISTROS INDIVIDUALES Y PROCEDIMIENTOS IMPLANTADOS PARA EVITAR LA DOBLE PERCEPCIÓN POR PARTE DEL PERSONAL PERMANENTE Y EVENTUAL DE LA CÁMARA DE SENADORES - GESTIÓN 2024', url: 'https://apisi.senado.gob.bo/images/a0d5cb1f-dd71-4746-aeec-5a3ca20910ff_1768400963.pdf' },
        { titulo: 'INF-UAI-VC-N° 001-2024', gestion: 2024, descripcion: 'VERIFICACIÓN DEL CUMPLIMIENTO DEL CONTROL Y CONCILIACIÓN DE DATOS LIQUIDADOS', url: 'https://apisi.senado.gob.bo/images/9d5b0d1c-28d8-4a78-a377-36b309db9635_1730143875.pdf' },
        { titulo: 'INF-UAI-VC-N° 002-2023', gestion: 2023, descripcion: 'REVISIÓN ANUAL DJBR 2022', url: 'https://apisi.senado.gob.bo/images/9d5b0caf-6b89-4b72-8e39-bf10ad13ab71_1730143804.pdf' },
        { titulo: 'INF-UAI-VC-N° 001-2023', gestion: 2023, descripcion: 'VERIFICACION DEL CUMPLIMIENTO DEL CONTROL Y CONCILIACION DE DATOS LIQUIDADOS', url: 'https://apisi.senado.gob.bo/images/9d5afa5c-ae15-40eb-8a5f-4fa1c4f24771_1730140729.pdf' },
        { titulo: 'INF-UAI-CI-N° 004-2023', gestion: 2023, descripcion: 'INF. CONTROL INTERNO AUD. CUMP. FONDOS EN AVANCE Y FONDO ROTATIVO GESTIÓN 2022', url: 'https://apisi.senado.gob.bo/images/9d5ab1fe-76ae-48c1-a5f4-86e1b04d6d75_1730128588.pdf' },
        { titulo: 'INF-UAI-VC-N° 002-2022', gestion: 2022, descripcion: 'REVISIÓN ANUAL DJBR 2021', url: 'https://apisi.senado.gob.bo/images/9d5af795-2ff7-48ff-90a7-657939ad3c62_1730140263.pdf' },
        { titulo: 'INF-UAI-VC-N° 001-2022', gestion: 2022, descripcion: 'VERIFICACIÓN DEL CUMPLIMIENTO DEL CONTROL Y CONCILIACIÓN DE DATOS LIQUIDADOS', url: 'https://apisi.senado.gob.bo/images/9d5af73e-f59b-46f9-8ebb-42a2700e7817_1730140207.pdf' },
        { titulo: 'INF-UAI-CV-N° 002-2021', gestion: 2021, descripcion: 'REVISIÓN ANUAL DJBR 2020', url: 'https://apisi.senado.gob.bo/images/9d5abe36-2b2b-48ac-9512-3a482e3d8c84_1730130638.pdf' },
        { titulo: 'INF-UAI-CV N° 001-2021', gestion: 2021, descripcion: 'VERIFICACIÓN DEL CUMPLIMIENTO DEL CONTROL Y CONCILIACIÓN DE DATOS LIQUIDADOS', url: 'https://apisi.senado.gob.bo/images/9d5abd2f-0c34-40ad-8cc9-ca123b674a75_1730130465.pdf' },
        { titulo: 'INF-UAI-VC-N° 002-2020', gestion: 2020, descripcion: 'VERIFICACIÓN DEL CUMPLIMIENTO DEL PROCEDIMIENTO ESPECIFICO PARA EL CONTROL Y', url: 'https://apisi.senado.gob.bo/images/9d5abb94-a6cf-4238-ae36-fb185229124f_1730130196.pdf' },
        { titulo: 'INF-UAI-VC-N° 001-2020', gestion: 2020, descripcion: 'REVISIÓN ANUAL DECLARACIONES JURADAS DE BIENES Y RENTAS GESTIÓN 2019', url: 'https://apisi.senado.gob.bo/images/9d5abaff-0b09-4bbd-b21f-a85e84f25fd8_1730130098.pdf' },
        { titulo: 'INF-UAI-PREL.-N° 001-2020', gestion: 2020, descripcion: 'INF. PREL. AUDITORIA ESPECIAL AL PROCESO DE CONCENTRACIÓN Y PAGOS EMERGENTES DE', url: 'https://apisi.senado.gob.bo/images/9d5ab19f-8160-413a-bb39-471324eaa14f_1730128526.pdf' },
        { titulo: 'INF-UAI-VC-N° 002-2019', gestion: 2019, descripcion: 'REVISIÓN ANUAL-DECLARACIONES JURADAS DE BIENES Y RENTAS, GESTION 2018', url: 'https://apisi.senado.gob.bo/images/9d5ab7c9-9bfc-4b8f-af41-a503ecfbb977_1730129560.pdf' },
        { titulo: 'INF-UAI-VC-N° 001-2019', gestion: 2019, descripcion: 'VERIFICACIÓN DEL CUMPLIMIENTO DEL CONTROL Y CONCILIACIÓN DE DATOS LIQUIDADOS', url: 'https://apisi.senado.gob.bo/images/9d5ab598-7fc1-42ae-8abc-45ea967c832a_1730129192.pdf' },
        { titulo: 'INF-UAI-PREL.-N° 001-2019', gestion: 2019, descripcion: 'INF. PREL. AUDITORIA ESPECIAL PAGO POR DEMANDA DE REINCORPORACIÓN', url: 'https://apisi.senado.gob.bo/images/9d5ab0c6-1230-4c0a-a856-3db5fd93044d_1730128383.pdf' },
        { titulo: 'INF-UAI-COM-N° 001-2019', gestion: 2019, descripcion: 'INF. COMPLEMENTARIO AUDITORIA ESPECIAL IMPUESTOS RC-IVA 1994', url: 'https://apisi.senado.gob.bo/images/9d5ab131-f369-4fb8-b3c7-f4fb33b9af3e_1730128454.pdf' },
        { titulo: 'INF-UAI-AE-N° 001-2018', gestion: 2018, descripcion: 'AUDITORIA ESPECIAL SOBRE EL CUMPLIMIENTO DE DATOS LIQUIDADOS DE PLANILLAS SALA', url: 'https://apisi.senado.gob.bo/images/9d5ab051-6c6d-4a4c-a9dd-7a40648584c4_1730128307.pdf' },
        { titulo: 'INF-UAI-CI-N° 003-2016', gestion: 2016, descripcion: 'AUDITORIA ESPECIAL PROCEDIMIENTO DJBR 2015', url: 'https://apisi.senado.gob.bo/images/9d5aafdf-be99-4667-8272-c6dd1414d57a_1730128232.pdf' },
        { titulo: 'INF-UAI-CI-N° 005-2015', gestion: 2015, descripcion: 'AUDITORIA ESPECIAL PROCEDIMIENTO DJBR 2014', url: 'https://apisi.senado.gob.bo/images/9d5aaf85-bfb9-4a95-8cdd-0c70f49e66c8_1730128173.pdf' }
      ],
      operacionales: [
        { titulo: 'INF-UAI-SY-N° 002-2016', gestion: 2017, descripcion: 'EVALUACIÓN DEL SISTEMA DE PROGRAMACIÓN DE OPERACIÓN 2015', url: 'https://apisi.senado.gob.bo/images/9d5b0e7b-237d-4a6e-858a-50fd8a7c907a_1730144105.pdf' },
        { titulo: 'INF-UAI-SY-N° 001-2016', gestion: 2017, descripcion: 'EVALUACIÓN DEL SISTEMA DE PRESUPUESTOS 2015, 2016', url: 'https://apisi.senado.gob.bo/images/9d5b0dfd-cb33-4c3e-9917-a2c9d33cb3ad_1730144023.pdf' },
        { titulo: 'INF-UAI-SY-N° 001-2015', gestion: 2015, descripcion: 'EVALUACIÓN DEL SISTEMA DE PROGRAMACIÓN DE OPERACINES 2014, FORMULACIÓN DEL', url: 'https://apisi.senado.gob.bo/images/9d5b0d9b-9ece-4210-ac38-574cbfe51ca6_1730143958.pdf' },
        { titulo: 'INF-UAI-P-N° 002-2023', gestion: 2023, descripcion: 'PRONUNCIAMENTO SOBRE LA AUD. OP. SOBRE LA EFICACIA DE LAS ACTIVIDADES DE LA UNI.', url: 'https://apisi.senado.gob.bo/images/9d7acf94-c14d-4ca1-948d-153eb2090bbf_1731507942.pdf' },
        { titulo: 'INF-UAI-OP-N° 001-2016', gestion: 2016, descripcion: 'AUDITORIA OPERATIVA AL PROCESO DE ASESORAMIENTO EN LOS PROCESOS DE COMPRAS Y', url: 'https://apisi.senado.gob.bo/images/9d5ab2fb-415b-44f5-825e-dc987bcf6976_1730128754.pdf' },
        { titulo: 'INF-UAI-OP-N° 001-2015', gestion: 2016, descripcion: 'AUDITORIA OPERATIVA A LA UNIDAD DE ANÁLISIS LEGISLATIVO 2014', url: 'https://apisi.senado.gob.bo/images/9d5ab2a7-d81e-48f4-9f37-6b15103eb007_1730128699.pdf' },
        { titulo: 'INF-UAI-CI-N° 003/2023', gestion: 2023, descripcion: 'INF. CONTROL INTERNO AUD. OP. SOBRE LA EFICACIA DE LAS ACTIVIDADES DE LA UNI', url: 'https://apisi.senado.gob.bo/images/9d7ad34c-cb88-4a57-a202-ea4d1235def4_1731508565.pdf' }
      ],
      confiabilidad: [
        { titulo: 'UAI/CI/01/2026', gestion: 2026, descripcion: 'INFORME DE CONFIABILIDAD DE LOS REGISTROS DE LA CÁMARA DE SENADORES Y DEFICIENCIAS DE CONTROL INTERNO EMERGENTES DE SU EVALUACIÓN CORRESPONDIENTES A LA GESTIÓN 2025', url: 'https://apisi.senado.gob.bo/images/a0da7af6-18f9-436f-8982-020318f3aac5_1768602262.pdf' },
        { titulo: 'INF-UAI-P-N°002-2025', gestion: 2025, descripcion: 'INFORME DE CONFIABILIDAD DE LOS ESTADOS FINANCIEROS Y LAS DEFICIENCIAS DE CONTROL INTERNO DE LA ASAMBLEA LEGISLATIVA PLURINACIONAL DE BOLIVIA, GESTION 2024', url: 'https://apisi.senado.gob.bo/images/a03b88eb-ecac-42b9-a5b3-32ae7246a441_1761775606.pdf' },
        { titulo: 'INF-UAI-P-N°001-2025', gestion: 2025, descripcion: 'PRONUNCIAMIENTO SOBRE LA CONFIABILIDAD, GESTIÓN 2024', url: 'https://apisi.senado.gob.bo/images/9e847cc1-8414-4586-bd7c-8ff1e6e4c9e4_1742918659.pdf' },
        { titulo: 'INF-UAI-CI-N°002-2025', gestion: 2025, descripcion: 'INFORME DE CONFIABILIDAD DE ESTADOS FINANCIEROS 2024', url: 'https://apisi.senado.gob.bo/images/9e662b8a-f1f6-46b7-b8b3-b4101ba89da6_1741616543.pdf' },
        { titulo: 'INF-UAI-CI-N°001-2025', gestion: 2025, descripcion: 'INFORME DE CONFIABILIDAD DE REGISTROS 2024', url: 'https://apisi.senado.gob.bo/images/9ecb78b9-1434-4fa5-95e2-06ee6e44e504_1745967409.pdf' },
        { titulo: 'INF-UAI-CI-N° 002-2024', gestion: 2024, descripcion: 'EXAMEN DE CONFIABILIDAD 2023', url: 'https://apisi.senado.gob.bo/images/9d347046-25e2-4b64-9733-21ceb896f36c_1728485475.pdf' },
        { titulo: 'INF-UAI-P-N° 001-2023', gestion: 2023, descripcion: 'PRONUNCIAMIENTO DEL EXAMEN DE CONFIABILIDAD 2022', url: 'https://apisi.senado.gob.bo/images/9d34945e-d84e-4f70-ac74-24f92de83766_1728491531.pdf' },
        { titulo: 'INF-UAI-CI-N° 002-2023', gestion: 2023, descripcion: 'EXAMEN DE CONFIABILIDAD 20222', url: 'https://apisi.senado.gob.bo/images/9d34943f-9c24-4624-8f44-60a3f387a140_1728491510.pdf' },
        { titulo: 'INF-UAI-OP-N° 001-2022', gestion: 2022, descripcion: 'OPINIÓN CONFIA 2021', url: 'https://apisi.senado.gob.bo/images/9d3493d8-a76e-4f6d-ba3f-f9cd4bac3bb7_1728491443.pdf' },
        { titulo: 'INF-UAI-CI-N° 001-2022', gestion: 2022, descripcion: 'EXAMEN DE CONFIABILIDAD 2021', url: 'https://apisi.senado.gob.bo/images/9d3493ff-4647-45b8-a001-e94d39d1761e_1728491468.pdf' },
        { titulo: 'INF-UAI-OP-N° 002-2021', gestion: 2021, descripcion: 'OPINIÓN CONFIA 2020-2019 (CONSOLIDADO)', url: 'https://apisi.senado.gob.bo/images/9d3493b2-ca1b-4f69-80ab-5202e6ba2d57_1728491418.pdf' },
        { titulo: 'INF-UAI-OP-N° 001-2021', gestion: 2021, descripcion: 'OPINIÓN CONFIA 2020-2019', url: 'https://apisi.senado.gob.bo/images/9d349374-40e3-4ff5-907a-0696fced4828_1728491377.pdf' },
        { titulo: 'INF-UAI-CI-N° 001-2021 (2)', gestion: 2021, descripcion: 'EXAMEN DE CONFIABILIDAD 2020', url: 'https://apisi.senado.gob.bo/images/9d3492ff-2144-46e0-a924-27e0877b3d8e_1728491300.pdf' },
        { titulo: 'INF-UAI-OP-N° 001-2020', gestion: 2020, descripcion: 'OPINIÓN CONFIA 2019-2018', url: 'https://apisi.senado.gob.bo/images/9d3492cd-cfe7-4a89-b006-ad8ee4c8f27f_1728491268.pdf' },
        { titulo: 'INF-UAI-CI-N° 001-2020', gestion: 2020, descripcion: 'INF.CONTROL INTERNO DEL EXAMEN DE CONF, EJECUCIÓN PRESUPUESTARIA DE RECURSOS', url: 'https://apisi.senado.gob.bo/images/9d3492a6-c620-4f27-a213-cf6475d69b40_1728491242.pdf' },
        { titulo: 'INF-UAI-CI-N° 001-2019', gestion: 2019, descripcion: 'EXAMEN DE CONFIABILIDAD-REGISTRO DE EJECUCIÓN PRESUPUESTARIA DE RECURSOS, GAST', url: 'https://apisi.senado.gob.bo/images/9d34927f-9589-4391-9c10-37213309f15b_1728491216.pdf' },
        { titulo: 'INF-UAI-CI-N° 001-2018', gestion: 2018, descripcion: 'INF. EXAMEN DE CONFIABILIDAD 2017', url: 'https://apisi.senado.gob.bo/images/9d34920b-bed4-4006-8554-386d00c5ece0_1728491141.pdf' },
        { titulo: 'INF-UAI-CI-N° 001-2017', gestion: 2017, descripcion: 'INF. CONTROL INTERNO DEL EXAMEN DE CONF. EJECUCIÓN PRESUPUESTARIO DE RECURSOS', url: 'https://apisi.senado.gob.bo/images/9d34918d-07f6-4ecd-b72c-aeff8b9a4057_1728491057.pdf' },
        { titulo: 'INF-UAI-CI-N° 001-2016', gestion: 2016, descripcion: 'INF. CONTROL INTERNO DEL EXAMEN DE CONF. EJECUCIÓN PRESUPUESTARIO DE RECURSOS', url: 'https://apisi.senado.gob.bo/images/9d349131-6c6a-466f-b338-5059c2c03dd3_1728490997.pdf' },
        { titulo: 'UAI-INF-O-01-2016', gestion: 2016, descripcion: 'OPINIÓN CONFIA 2015-2014', url: 'https://apisi.senado.gob.bo/images/9d349161-cb39-4c53-bbba-d64415e4de49_1728491029.pdf' },
        { titulo: 'UAI-N° 02-2015', gestion: 2015, descripcion: 'INF. AUDITOR INTERNO, EXAMEN DE CONFIABILIDAD DE LOS ESTADOS FINANCIEROS 2014', url: 'https://apisi.senado.gob.bo/images/9d3490b1-4bc5-411f-8a8b-830fc81be9cd_1728490913.pdf' },
        { titulo: 'INF-UAI-CI-N° 003-2015', gestion: 2015, descripcion: 'INF. CONTROL INTERNO, REGISTROS DE EJECUCIÓN PRESUPUESTARIA DE RECURSOS, GASTOS', url: 'https://apisi.senado.gob.bo/images/9d3490db-7860-4bc7-b8a2-83ed043f3326_1728490941.pdf' },
        { titulo: 'UAI-N° 003-2014', gestion: 2014, descripcion: 'EXAMEN DE CONFIABILIDAD DE LOS ESTADOS FINANCIEROS 2013', url: 'https://apisi.senado.gob.bo/images/9d349005-e0ad-457f-bc99-9f8563b6f728_1728490801.pdf' }
      ]
    }

    // Computed
    const totalAuditorias = computed(() => {
      return auditorias.cumplimiento.length + 
             auditorias.operacionales.length + 
             auditorias.confiabilidad.length
    })

    const obtenerDocumentosOrdenados = (tipo) => {
      const docs = auditorias[tipo] || []
      return [...docs].sort((a, b) => b.gestion - a.gestion)
    }

    const obtenerTotalPorTipo = (tipo) => {
      return auditorias[tipo]?.length || 0
    }

    const obtenerUltimoAnio = (tipo) => {
      const docs = auditorias[tipo] || []
      if (docs.length === 0) return '-'
      const anios = docs.map(d => d.gestion)
      return Math.max(...anios)
    }

    const obtenerAniosUnicos = (tipo) => {
      const docs = auditorias[tipo] || []
      if (docs.length === 0) return 0
      const anios = new Set(docs.map(d => d.gestion))
      return anios.size
    }

    const obtenerRangoAnios = (tipo) => {
      const docs = auditorias[tipo] || []
      if (docs.length === 0) return '-'
      const anios = docs.map(d => d.gestion)
      const min = Math.min(...anios)
      const max = Math.max(...anios)
      if (min === max) return `${min}`
      return `${min} - ${max}`
    }

    // Métodos
    const verPDF = (item) => {
      if (item.url) {
        window.open(item.url, '_blank')
      } else {
        alert(`📄 ${item.titulo}\n\n${item.descripcion}\n\n⚠️ No hay PDF disponible para este documento.`)
      }
    }

    return {
      tabActivo,
      tabs,
      auditorias,
      totalAuditorias,
      obtenerDocumentosOrdenados,
      obtenerTotalPorTipo,
      obtenerUltimoAnio,
      obtenerAniosUnicos,
      obtenerRangoAnios,
      verPDF
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.hover\:bg-gray-50\/50:hover {
  background-color: rgba(249, 250, 251, 0.5);
}

tbody tr {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

tbody tr:hover {
  background-color: #f9fafb;
}

.transform {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.group:hover .transform {
  transform: scale(1.02);
}

/* Estilo para el botón de descarga */
.bg-senado-primary {
  background-color: #611717;
}

.bg-senado-primary:hover {
  background-color: #3a060d;
}

/* Responsive para móviles */
@media (max-width: 768px) {
  [style*="font-size: 1vw;"] {
    font-size: 2.5vw !important;
  }
  
  .grid-cols-1.md\:grid-cols-3 {
    grid-template-columns: 1fr;
  }
  
  .grid-cols-2.md\:grid-cols-4 {
    grid-template-columns: 1fr 1fr;
  }
  
  /* Ajustar tablas en móvil */
  .overflow-x-auto {
    overflow-x: auto;
  }
  
  .table td, .table th {
    padding: 0.5rem;
    font-size: 0.7rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>