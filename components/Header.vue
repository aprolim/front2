<template>
  <header class="bg-senado-blue-700 text-white shadow-lg">
    <div class="container-senado py-4 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold">Senado de Bolivia</h1>
      </div>
      
      <button @click="toggleMenu" class="text-3xl md:hidden">
        ☰
      </button>
      
      <nav class="hidden md:flex gap-6">
        <a href="/" class="hover:underline">Inicio</a>
        <a href="/actividad" class="hover:underline">Actividad</a>
        <a href="/senadores" class="hover:underline">Senadores</a>
        <a href="/noticias" class="hover:underline">Noticias</a>
      </nav>
    </div>
    
    <div v-if="menuAbierto" class="md:hidden bg-senado-blue-800 p-4">
      <nav class="flex flex-col gap-3">
        <a href="/" class="hover:underline">Inicio</a>
        <a href="/actividad" class="hover:underline">Actividad</a>
        <a href="/senadores" class="hover:underline">Senadores</a>
        <a href="/noticias" class="hover:underline">Noticias</a>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuAbierto: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuAbierto = !this.menuAbierto
    }
  }
}
</script>