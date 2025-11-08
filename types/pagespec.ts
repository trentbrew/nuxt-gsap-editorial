export interface SectionSpec {
  component: string
  props?: Record<string, any>
}

export interface PageMetaSpec {
  title: string
  description?: string
  ogImage?: string
}

export interface PageSpec {
  version: 1
  page: {
    meta: PageMetaSpec
    theme: string
    sections: SectionSpec[]
  }
}
