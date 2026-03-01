import { defineStore } from 'pinia'
import { ref, computed } from 'vue'    
import type { AuthUser, LoginCredentials } from '../types/Vehicle'


export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(
    JSON.parse(localStorage.getItem('auth_user') || 'null')
  )
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isLoggedIn = computed(() => !!user.value)
  const displayName = computed(() =>
    user.value ? `${user.value.firstName} ${user.value.lastName}` : ''
  )

  async function login(credentials: LoginCredentials): Promise<boolean> {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
          expiresInMins: 60,
        }),
      })
      if (!res.ok) {
        error.value = 'Invalid username or password'
        return false
      }
      const data: AuthUser = await res.json()
      user.value = data
      localStorage.setItem('auth_user', JSON.stringify(data))
      return true
    } catch {
      error.value = 'Network error. Please try again.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('auth_user')
  }

  return { user, isLoading, error, isLoggedIn, displayName, login, logout }
})