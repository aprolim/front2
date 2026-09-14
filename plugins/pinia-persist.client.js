// plugins/pinia-persist.client.js
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia || nuxtApp.vueApp.config.globalProperties.$pinia

  if (pinia) {
    pinia.use(piniaPluginPersistedstate)
    console.log('✅ [Pinia] Persistencia habilitada')
  } else {
    console.warn('⚠️ [Pinia] No se pudo habilitar persistencia')
  }
})