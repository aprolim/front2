<!-- pages/mision-vision-valores.vue -->
<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- 🔥 FONDO DE MARCA DE AGUA -->
    <div 
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="background-image: url('/background/fondo3.png');"
    ></div>
    
    <!-- Overlay con degradado sutil -->
    <div class="absolute inset-0 bg-gradient-to-b from-white/80 via-white/80 to-white/80"></div>
    
    <!-- Decoración superior -->
    <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-senado-primary via-senado-gold-dark to-senado-primary"></div>
    
    <!-- Contenido -->
    <div class="relative z-10 container mx-auto px-4 py-16 md:py-20">
      
      <!-- Encabezado -->
      <div class="text-center mb-16">
 
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-senado-primary leading-tight">
          Misión y <span class="text-senado-gold-dark relative">
            Visión
            <span class="absolute -bottom-2 left-0 right-0 h-1 bg-senado-gold-dark rounded-full"></span>
          </span>
        </h1>
        <p class="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
          Principios que guían nuestra labor legislativa
        </p>
      </div>

      <!-- Tarjetas -->
      <div class="max-w-5xl mx-auto space-y-10">
        
        <!-- Misión -->
        <div class="group relative bg-white/80 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden">
          <!-- Borde decorativo superior -->
          <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-senado-primary via-senado-gold-dark to-senado-primary"></div>
          
          <div class="p-8 md:p-12">
            <div class="flex items-start gap-5 mb-6">
              <div class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-senado-primary/20 to-senado-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ClientOnly>
                  <Icon name="mdi:bullseye-arrow" class="text-[2vw] text-senado-primary" />
                </ClientOnly>
              </div>
              <div>
                <span class="text-sm font-semibold text-senado-primary/60 uppercase tracking-wider">Nuestro propósito</span>
                <h2 class="text-3xl md:text-4xl font-bold text-senado-primary">Misión</h2>
              </div>
            </div>
            
            <div class="pl-0 md:pl-20">
              <div class="prose prose-lg max-w-none">
                <p class="text-gray-700 leading-relaxed text-lg md:text-xl font-medium text-justify">
                  Ejercer las funciones legislativa, fiscalizadora y de representación de la Cámara de Senadores, mediante la elaboración y aprobación de leyes, el control y fiscalización de la gestión pública, el acceso a la información y la representación territorial, promoviendo la participación ciudadana y contribuyendo al desarrollo integral del Estado Plurinacional de Bolivia, en el marco de la Constitución Política del Estado y la normativa vigente.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Visión -->
        <div class="group relative bg-white/80 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden">
          <!-- Borde decorativo superior -->
          <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-senado-gold-dark via-senado-primary to-senado-gold-dark"></div>
          
          <div class="p-8 md:p-12">
            <div class="flex items-start gap-5 mb-6">
              <div class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-senado-gold-dark/20 to-senado-gold-dark/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ClientOnly>
                  <Icon name="mdi:binoculars" class="text-[2vw] text-senado-gold-dark" />

                </ClientOnly>
              </div>
              <div>
                <span class="text-sm font-semibold text-senado-gold-dark/60 uppercase tracking-wider">Nuestra aspiración</span>
                <h2 class="text-3xl md:text-4xl font-bold text-senado-primary">Visión</h2>
              </div>
            </div>
            
            <div class="pl-0 md:pl-20">
              <div class="prose prose-lg max-w-none">
                <p class="text-gray-700 leading-relaxed text-lg md:text-xl font-medium text-justify">
                  Consolidar una Cámara de Senadores moderna, eficiente, transparente, digital y cercana a la ciudadanía, reconocida por la calidad de su labor legislativa, fiscalizadora y gestión, fortaleciendo la democracia, la participación ciudadana y el desarrollo integral del Estado Plurinacional de Bolivia.
                </p>
              </div>
            </div>
          </div>
        </div>


        <!-- Botón volver -->
        <div class="text-center pt-8">
          <NuxtLink 
            to="/" 
            class="inline-flex items-center gap-3 text-senado-primary hover:text-senado-primary-dark transition-all duration-300 text-base md:text-lg font-medium group"
          >
            <span class="w-10 h-10 rounded-full border-2 border-senado-primary/30 flex items-center justify-center group-hover:border-senado-primary group-hover:bg-senado-primary/5 transition-all duration-300">
              <ClientOnly>
                <Icon name="mdi:arrow-left" class="text-xl" />
                <template #fallback>
                  <span class="text-xl">←</span>
                </template>
              </ClientOnly>
            </span>
            Volver al inicio
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Decoración inferior -->
    <div class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-senado-primary via-senado-gold-dark to-senado-primary"></div>
  </div>
</template>

<script setup>
// No necesita lógica adicional
</script>

<style scoped>
/* Transiciones y efectos suaves */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Sombra personalizada para las tarjetas */
.shadow-xl {
  box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.15);
}

.shadow-2xl {
  box-shadow: 0 25px 80px -20px rgba(0, 0, 0, 0.25);
}

/* Borde izquierdo para la cita */
.border-l-3 {
  border-left-width: 3px;
}

/* Mejora de legibilidad del texto */
.prose p {
  line-height: 1.8;
}

/* Animación sutil al cargar */
.group {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>