export interface PropDefinition {
  type: string
  required?: boolean
  default?: any
  constraints?: string
}

export interface ComponentMeta {
  id: string // e.g. 'text-block'
  name: string // e.g. 'Text Block'
  category: 'hero' | 'content' | 'media' | 'cta' | 'sticky'
  semantics: {
    purpose: string
    whenToUse: string[]
  }
  props: Record<string, PropDefinition>
  a11y: {
    considerations: string
  }
  motion?: {
    defaultPreset?: string
    allowedPresets?: string[]
  }
  examples?: Array<{ title: string; props: Record<string, any> }>
}
