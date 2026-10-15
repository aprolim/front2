// composables/useApi.js
// Cliente HTTP base. Adjunta el token JWT de localStorage y maneja errores.

export const useApi = () => {
  const getHeaders = () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    // En el navegador, leer el token
    if (process.client) {
      const token = localStorage.getItem('auth_token')
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }

    return headers
  }

  const handleResponse = async (response, url) => {
    if (response.status === 401) {
      // Token expirado o inválido
      if (process.client) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
      }
      throw new Error('Sesión expirada. Por favor, vuelve a iniciar sesión.')
    }

    if (!response.ok) {
      let mensaje = `Error ${response.status}`
      try {
        const data = await response.json()
        mensaje = data.message || mensaje
      } catch (e) {
        // Ignorar si no es JSON
      }
      throw new Error(mensaje)
    }

    const data = await response.json()
    return data.data !== undefined ? data.data : data
  }

  return {
    get: async (url) => {
      // Cache-buster para evitar respuestas cacheadas
      const separator = url.includes('?') ? '&' : '?'
      const finalUrl = `${url}${separator}_=${Date.now()}`

      const response = await fetch(finalUrl, {
        method: 'GET',
        headers: getHeaders(),
        cache: 'no-store'
      })
      return handleResponse(response, url)
    },

    post: async (url, body) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(body)
      })
      return handleResponse(response, url)
    },

    put: async (url, body) => {
      const response = await fetch(url, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(body)
      })
      return handleResponse(response, url)
    },

    patch: async (url, body) => {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(body)
      })
      return handleResponse(response, url)
    },

    del: async (url) => {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: getHeaders()
      })
      return handleResponse(response, url)
    }
  }
}