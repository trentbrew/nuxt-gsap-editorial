export interface BrandConfig {
  name: string
  logo: string
  logoAlt?: string
  favicon?: string
}

export interface MotionConfig {
  easing: Record<string, string>
  duration: Record<string, number>
  presets: Record<string, MotionPreset>
}

export interface MotionPreset {
  duration: number
  ease: string
  stagger?: number
}

export interface GridConfig {
  container: string
  gap: string
}

export interface Theme {
  name: string
  colors: Record<string, string>
  brand: BrandConfig
  motion: MotionConfig
  grid: GridConfig
}
