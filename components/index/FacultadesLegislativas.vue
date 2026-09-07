<template>
  <div>
    <h2 class="text-[6.6vw] md:text-[2.2vw] font-bold text-senado-primary mb-6">Facultades Legislativas</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- ========================================== -->
      <!-- LEGISLACIÓN                               -->
      <!-- ========================================== -->
      <div class="bg-senado-gold-lightest3 rounded-[4.5vw] md:rounded-[1.5vw] hover:shadow-lg transition-shadow overflow-hidden">
        <div class="bg-senado-gold-light text-black px-4 py-2 text-[4.2vw] md:text-[1.4vw] text-center font-[500]">LEGISLACIÓN</div>
        <div class="p-4">
          <ul class="mt-3 space-y-2 text-[3.6vw] md:text-[1.2vw]">
            <li v-for="item in legislacionItems" :key="item.label" class="flex items-center justify-between hover:text-senado-primary transition-colors text-gray-800">
              <NuxtLink to="/legislacion" class="flex items-center gap-2 hover:text-senado-primary w-full">
                <span class="text-senado-gold-dark font-bold">></span>
                <span>{{ item.label }}</span>
              </NuxtLink>
              <span class="bg-senado-primary text-white text-[2.4vw] md:text-[0.8vw] px-2 py-0.5 rounded-full min-w-[9.6vw] md:min-w-[3.2vw] text-center font-medium">{{ item.count }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- FISCALIZACIÓN                             -->
      <!-- ========================================== -->
      <div class="bg-senado-gold-lightest2 rounded-[4.5vw] md:rounded-[1.5vw] hover:shadow-lg transition-shadow overflow-hidden">
        <div class="bg-senado-gold-light text-black px-4 py-2 text-[4.2vw] md:text-[1.4vw] text-center font-[500]">FISCALIZACIÓN</div>
        <div class="p-4">
          <ul class="mt-3 space-y-2 text-[3.6vw] md:text-[1.2vw]">
            <li v-for="item in fiscalizacionItems" :key="item.link" class="flex items-center justify-between hover:text-senado-primary transition-colors text-gray-800">
              <NuxtLink :to="item.link" class="flex items-center gap-2 hover:text-senado-primary w-full">
                <span class="text-senado-gold-dark font-bold">></span>
                <span>{{ item.label }}</span>
              </NuxtLink>
              <span class="bg-senado-primary text-white text-[2.4vw] md:text-[0.8vw] px-2 py-0.5 rounded-full min-w-[9.6vw] md:min-w-[3.2vw] text-center font-medium">{{ item.count }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- GESTIÓN                                   -->
      <!-- ========================================== -->
      <div class="bg-senado-gold-lightest2 rounded-[4.5vw] md:rounded-[1.5vw] hover:shadow-lg transition-shadow overflow-hidden">
        <div class="bg-senado-gold-light text-black px-4 py-2 text-[4.2vw] md:text-[1.4vw] text-center font-[500]">GESTIÓN</div>
        <div class="p-4">
          <ul class="mt-3 space-y-2 text-[3.6vw] md:text-[1.2vw]">
            <li v-for="item in gestionItems" :key="item.link" class="flex items-center justify-between hover:text-senado-primary transition-colors text-gray-800">
              <NuxtLink :to="item.link" class="flex items-center gap-2 hover:text-senado-primary w-full">
                <span class="text-senado-gold-dark font-bold">></span>
                <span>{{ item.label }}</span>
              </NuxtLink>
              <span class="bg-senado-primary text-white text-[2.4vw] md:text-[0.8vw] px-2 py-0.5 rounded-full min-w-[9.6vw] md:min-w-[3.2vw] text-center font-medium">{{ item.count }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Datos estáticos
const legislacionItems = [
  { label: 'Proyectos de Ley en Tratamiento', count: 293 },
  { label: 'Proyectos de Ley Aprobados', count: 16 },
  { label: 'Leyes Sancionadas', count: 31 },
  { label: 'Proyectos de Ley con Modificaciones', count: 2 },
  { label: 'Proyectos de Ley Rechazados', count: 1 }
]

const fiscalizacionItems = [
  { label: 'Peticiones de Informe Escrito', link: '/peticiones-informe-escrito', count: 1614 },
  { label: 'Peticiones de Informe Oral', link: '/peticiones-informe-oral', count: 13 }
]

const gestionItems = [
  { label: 'Resoluciones Camarales', link: '/resoluciones-camarales', count: 46 },
  { label: 'Declaraciones Camarales', link: '/declaraciones-camarales', count: 8 },
  { label: 'Minutas de Comunicación', link: '/minutas-comunicacion', count: 178 }
]
</script>