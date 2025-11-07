import type { MotionConfig, MotionPreset } from '~/types/theme'

export const useMotion = () => {
  const { $gsap } = useNuxtApp()
  const { currentTheme, getTheme } = useTheme()
  const motionConfig = ref<MotionConfig | null>(null)
  const prefersReducedMotion = ref(false)

  // Load motion config when composable is used
  const loadMotionConfig = async () => {
    const theme = await getTheme(currentTheme.value)
    if (theme) {
      motionConfig.value = theme.motion
    }
  }

  // Check for reduced motion preference
  onMounted(async () => {
    await loadMotionConfig()

    if (process.client) {
      prefersReducedMotion.value = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    }
  })

  const getPreset = (name: string): MotionPreset => {
    return (
      motionConfig.value?.presets[name] || {
        duration: 0.6,
        ease: 'power2.out',
      }
    )
  }

  const getDuration = (key: string): number => {
    if (prefersReducedMotion.value) return 0.01
    return motionConfig.value?.duration[key] || 0.6
  }

  const getEasing = (key: string): string => {
    return motionConfig.value?.easing[key] || 'power2.out'
  }

  // Helper to apply preset to GSAP animation
  const applyPreset = (
    target: any,
    presetName: string,
    additionalVars?: any
  ) => {
    const preset = getPreset(presetName)

    // Disable motion effects if reduced motion is preferred
    if (prefersReducedMotion.value) {
      return $gsap.set(target, { opacity: 1, ...additionalVars })
    }

    return $gsap.to(target, {
      ...additionalVars,
      duration: preset.duration,
      ease: preset.ease,
      stagger: preset.stagger,
    })
  }

  return {
    getPreset,
    getDuration,
    getEasing,
    applyPreset,
    prefersReducedMotion,
    motionConfig,
  }
}
