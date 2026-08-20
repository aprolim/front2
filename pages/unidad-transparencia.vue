<!-- pages/unidad-transparencia.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero / Banner -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white py-[1vw]">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl">
          <div class="flex items-center gap-3 mb-4">
            <Icon name="mdi:shield-check" class="text-4xl text-senado-gold" />
            <span class="text-senado-gold font-semibold text-sm tracking-wider">UNIDAD DE TRANSPARENCIA</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4 text-white">
            Unidad de Transparencia y Lucha contra la Corrupción
          </h1>
          <p class="text-white">
            Comprometidos con la transparencia, la ética pública y el acceso a la información
          </p>
        </div>
      </div>

    </section>

    <div class="container mx-auto px-4 py-[1vw]">
      <!-- Marco Legal -->
      <section class="mb-12">
        <div class="bg-white rounded-xl shadow-lg p-8 border-l-4 border-senado-gold">
          <div class="flex items-center gap-3 mb-4">
            <Icon name="mdi:scale-balance" class="text-3xl text-senado-primary" />
            <h2 class="text-2xl font-bold text-senado-primary">Marco Legal</h2>
          </div>
          <p class="text-gray-600 mb-4 text-senado-primary">
            La Unidad de Transparencia y Lucha contra la Corrupción fue creada mediante:
          </p>
          <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div class="flex items-start gap-3">
              <span class="text-senado-gold font-bold text-xl">📄</span>
              <div>
                <h3 class="font-semibold text-gray-800">Resolución Ministerial N° 672/2025</h3>
                <p class="text-sm text-gray-600 mt-1">
                  Aprobada el 6 de junio de 2025, que establece la creación y funcionamiento de la Unidad de Transparencia 
                  y Lucha contra la Corrupción en el ámbito del Senado.
                </p>
                <a 
                  href="https://agetic.gob.bo/sites/default/files/2025-06/2.%20Resolucio%CC%81n%20Ministerial%20N%20672025_0.pdf" 
                  target="_blank"
                  class="inline-flex items-center gap-2 mt-3 text-senado-primary hover:text-senado-primary-dark font-medium text-sm"
                >
                  <Icon name="mdi:file-pdf-box" class="text-xl" />
                  Ver documento completo
                  <Icon name="mdi:open-in-new" class="text-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Objetivos -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-senado-primary mb-6 flex items-center gap-3">
          <Icon name="mdi:bullseye-arrow" class="text-3xl" />
          Objetivos
        </h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-senado-gold-lightest rounded-full flex items-center justify-center mb-4">
              <Icon name="mdi:eye" class="text-2xl text-senado-primary" />
            </div>
            <h3 class="font-semibold text-gray-800 mb-2">Promover la Transparencia</h3>
            <p class="text-gray-600 text-sm">
              Garantizar el acceso a la información pública y promover una cultura de transparencia 
              en todas las acciones del Senado.
            </p>
          </div>
          <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-senado-gold-lightest rounded-full flex items-center justify-center mb-4">
              <Icon name="mdi:gavel" class="text-2xl text-senado-primary" />
            </div>
            <h3 class="font-semibold text-gray-800 mb-2">Prevenir la Corrupción</h3>
            <p class="text-gray-600 text-sm">
              Implementar mecanismos de prevención, control y sanción de actos de corrupción 
              en la gestión pública.
            </p>
          </div>
          <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-senado-gold-lightest rounded-full flex items-center justify-center mb-4">
              <Icon name="mdi:account-group" class="text-2xl text-senado-primary" />
            </div>
            <h3 class="font-semibold text-gray-800 mb-2">Participación Ciudadana</h3>
            <p class="text-gray-600 text-sm">
              Fomentar la participación activa de la ciudadanía en el control social y la 
              vigilancia de la gestión pública.
            </p>
          </div>
          <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-senado-gold-lightest rounded-full flex items-center justify-center mb-4">
              <Icon name="mdi:file-document-edit" class="text-2xl text-senado-primary" />
            </div>
            <h3 class="font-semibold text-gray-800 mb-2">Gestión de Denuncias</h3>
            <p class="text-gray-600 text-sm">
              Atender y gestionar denuncias sobre actos o hechos de corrupción de manera 
              oportuna y efectiva.
            </p>
          </div>
        </div>
      </section>

      <!-- Funciones -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-senado-primary mb-6 flex items-center gap-3">
          <Icon name="mdi:clipboard-list" class="text-3xl" />
          Funciones Principales
        </h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div 
            v-for="(funcion, index) in funciones" 
            :key="index"
            class="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow border-l-4 border-senado-gold"
          >
            <div class="flex items-start gap-3">
              <span class="text-senado-primary font-bold text-xl">{{ index + 1 }}</span>
              <p class="text-gray-700 text-sm">{{ funcion }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Estructura Organizativa -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-senado-primary mb-6 flex items-center gap-3">
          <Icon name="mdi:account-tree" class="text-3xl" />
          Estructura Organizativa
        </h2>
        <div class="bg-white rounded-xl shadow-lg p-8">
          <div class="flex flex-col items-center">
            <!-- Nivel Superior -->
            <div class="bg-senado-primary text-white rounded-lg px-8 py-4 mb-4">
              <p class="font-bold text-center">Dirección General de Transparencia</p>
            </div>
            <div class="w-px h-8 bg-gray-300"></div>
            
            <!-- División -->
            <div class="flex flex-wrap justify-center gap-8 mt-2">
              <div class="text-center">
                <div class="bg-senado-gold text-senado-primary rounded-lg px-6 py-3 font-semibold">
                  Unidad de Transparencia<br>
                  <span class="text-sm font-normal">y Lucha contra la Corrupción</span>
                </div>
              </div>
            </div>
            <div class="w-px h-8 bg-gray-300"></div>
            
            <!-- Áreas -->
            <div class="grid md:grid-cols-3 gap-4 w-full max-w-3xl">
              <div class="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                <Icon name="mdi:file-document" class="text-2xl text-senado-primary mx-auto mb-2" />
                <p class="font-semibold text-sm">Área de Gestión<br>Documental</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                <Icon name="mdi:shield-search" class="text-2xl text-senado-primary mx-auto mb-2" />
                <p class="font-semibold text-sm">Área de Prevención<br>y Control</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                <Icon name="mdi:account-voice" class="text-2xl text-senado-primary mx-auto mb-2" />
                <p class="font-semibold text-sm">Área de Atención<br>al Ciudadano</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Canales de Atención -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-senado-primary mb-6 flex items-center gap-3">
          <Icon name="mdi:phone-in-talk" class="text-3xl" />
          Canales de Atención
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-senado-gold-lightest rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mdi:email" class="text-3xl text-senado-primary" />
            </div>
            <h3 class="font-semibold text-gray-800 mb-2">Correo Electrónico</h3>
            <a href="mailto:transparencia@senado.gob.bo" class="text-senado-primary hover:underline text-sm">
              transparencia@senado.gob.bo
            </a>
          </div>
          <div class="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-senado-gold-lightest rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mdi:phone" class="text-3xl text-senado-primary" />
            </div>
            <h3 class="font-semibold text-gray-800 mb-2">Teléfono</h3>
            <p class="text-gray-600 text-sm">(591) 2-1234567</p>
            <p class="text-gray-500 text-xs">Horario: 08:00 - 16:00</p>
          </div>
          <div class="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-senado-gold-lightest rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mdi:map-marker" class="text-3xl text-senado-primary" />
            </div>
            <h3 class="font-semibold text-gray-800 mb-2">Oficina</h3>
            <p class="text-gray-600 text-sm">
              Edificio del Senado<br>
              Planta Baja, Oficina 101
            </p>
          </div>
        </div>
      </section>

      <!-- Normativa Relacionada -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-senado-primary mb-6 flex items-center gap-3">
          <Icon name="mdi:book-open-page-variant" class="text-3xl" />
          Normativa Relacionada
        </h2>
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="divide-y divide-gray-200">
            <div 
              v-for="(norma, index) in normativa" 
              :key="index"
              class="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <div class="flex items-center gap-3">
                <span class="text-senado-gold text-xl">📜</span>
                <div>
                  <p class="font-medium text-gray-800">{{ norma.titulo }}</p>
                  <p class="text-sm text-gray-500">{{ norma.fecha }}</p>
                </div>
              </div>
              <a 
                :href="norma.enlace" 
                target="_blank"
                class="text-senado-primary hover:text-senado-primary-dark text-sm font-medium flex items-center gap-1"
              >
                Ver más
                <Icon name="mdi:arrow-right" class="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Acciones Rápidas -->
      <section class="mb-12">
        <div class="grid md:grid-cols-2 gap-6">
          <NuxtLink 
            to="https://sitpreco.s2plus.transparencia.gob.bo/"
            target="_blank"
            class="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow text-center group"
          >
            <Icon name="mdi:alert-circle" class="text-5xl mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-bold mb-2">Gestión de Denuncias</h3>
            <p class="text-white/80 text-sm">
              Presenta tu denuncia sobre actos o hechos de corrupción
            </p>
          </NuxtLink>
          <NuxtLink 
            to="/solicitud-informacion"
            class="bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow text-center group"
          >
            <Icon name="mdi:information" class="text-5xl mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-bold mb-2">Solicitud de Información</h3>
            <p class="text-white/80 text-sm">
              Accede a la información pública que necesitas
            </p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnidadTransparencia',
  data() {
    return {
      funciones: [
        'Promover y coordinar políticas de transparencia en el Senado',
        'Implementar mecanismos de prevención de la corrupción',
        'Gestionar denuncias y quejas de la ciudadanía',
        'Garantizar el acceso a la información pública',
        'Realizar auditorías de transparencia y control interno',
        'Fomentar la ética pública y el buen gobierno',
        'Elaborar informes y rendiciones de cuentas',
        'Coordinar con otras unidades de transparencia del Estado'
      ],
      normativa: [
        {
          titulo: 'Resolución Ministerial N° 672/2025',
          fecha: '6 de junio de 2025',
          enlace: 'https://agetic.gob.bo/sites/default/files/2025-06/2.%20Resolucio%CC%81n%20Ministerial%20N%20672025_0.pdf'
        },
        {
          titulo: 'Ley N° 2341 de Procedimiento Administrativo',
          fecha: '23 de abril de 2002',
          enlace: '#'
        },
        {
          titulo: 'Ley N° 974 de Transparencia y Acceso a la Información Pública',
          fecha: '22 de julio de 2017',
          enlace: '#'
        },
        {
          titulo: 'Decreto Supremo N° 3518 - Reglamento de la Ley de Transparencia',
          fecha: '24 de octubre de 2017',
          enlace: '#'
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

.bg-senado-gold-lightest {
  background-color: #fef9e7;
}

/* Animaciones y transiciones */
.hover\:shadow-xl {
  transition: box-shadow 0.3s ease;
}

.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Estilo para el scroll suave */
html {
  scroll-behavior: smooth;
}

/* Mejoras de accesibilidad */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>