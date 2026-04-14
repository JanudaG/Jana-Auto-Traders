import { ref, watch, onMounted } from 'vue'

const isDark = ref(false)

export function useDarkMode() {
  onMounted(() => {
    const stored = localStorage.getItem('dark_mode')
    isDark.value = stored === 'true'
    applyDark(isDark.value)
  })

  function applyDark(value: boolean) {
    if (value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  watch(isDark, (val) => {
    applyDark(val)
    localStorage.setItem('dark_mode', String(val))
  })

  function toggle() {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
}
