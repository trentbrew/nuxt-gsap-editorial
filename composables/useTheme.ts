import type { Theme } from '~/types/theme'

export const useTheme = () => {
  const currentTheme = useState<string>('theme', () => 'acme')

  const setTheme = (theme: string) => {
    currentTheme.value = theme
    if (process.client) {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }

  const getTheme = async (themeName: string): Promise<Theme | null> => {
    try {
      const { data } = await useFetch(`/api/themes/${themeName}`)
      return data.value as Theme
    } catch (error) {
      console.error('Failed to load theme:', error)
      return null
    }
  }

  return {
    currentTheme,
    setTheme,
    getTheme,
  }
}
