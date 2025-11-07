# Tailwind + DaisyUI Migration Plan

## Overview
Migrate from vanilla CSS to Tailwind + DaisyUI to enable JSON-driven theming and motion tokens per SPEC.md

**Scope:** Single-page scrollytelling experience (`index.vue`) + 3 utility components. Archive pages removed to focus on core implementation.

---

## Phase 1: Foundation Setup (Day 1)

### 1.1 Install DaisyUI
```bash
pnpm add -D daisyui@latest
```

### 1.2 Configure Tailwind + DaisyUI
**File:** `tailwind.config.ts`
```ts
import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Libre Baskerville', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '2rem',
        lg: '4rem',
        xl: '8rem',
      },
      colors: {
        accent: '#d4af37',
      },
    },
  },
  daisyui: {
    themes: [
      {
        acme: {
          primary: '#d4af37',
          secondary: '#666',
          accent: '#d4af37',
          neutral: '#121212',
          'base-100': '#fafafa',
          'base-200': '#ffffff',
          'base-content': '#121212',
        },
      },
    ],
  },
  plugins: [daisyui],
} satisfies Config
```

### 1.3 Create Theme System
**File:** `types/theme.ts`
```ts
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
```

**File:** `composables/useTheme.ts`
```ts
export const useTheme = () => {
  const currentTheme = useState<string>('theme', () => 'acme')
  
  const setTheme = (theme: string) => {
    currentTheme.value = theme
    if (process.client) {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }

  const getTheme = async (themeName: string): Promise<Theme> => {
    const { data } = await useFetch(`/api/themes/${themeName}`)
    return data.value as Theme
  }

  return {
    currentTheme,
    setTheme,
    getTheme,
  }
}
```

**File:** `server/api/themes/[theme].ts`
```ts
export default defineEventHandler((event) => {
  const theme = getRouterParam(event, 'theme')
  
  // Load from themes directory
  const themes: Record<string, Theme> = {
    acme: {
      name: 'acme',
      colors: {
        primary: '#d4af37',
        secondary: '#666',
        neutral: '#121212',
        background: '#fafafa',
      },
      brand: {
        name: 'Acme Corp',
        logo: '/logos/acme.svg',
      },
      motion: {
        easing: {
          smooth: 'power3.out',
          snappy: 'power2.inOut',
          elastic: 'elastic.out(1, 0.5)',
        },
        duration: {
          fast: 0.3,
          base: 0.6,
          slow: 1.2,
        },
        presets: {
          fadeUp: { duration: 0.8, ease: 'power3.out' },
          slideIn: { duration: 1, ease: 'power2.inOut' },
        },
      },
      grid: {
        container: '1200px',
        gap: '1rem',
      },
    },
  }
  
  return themes[theme] || themes.acme
})
```

---

## Phase 2: Motion Tokens (Day 1-2)

### 2.1 Create Motion Composable
**File:** `composables/useMotion.ts`
```ts
export const useMotion = () => {
  const { $gsap } = useNuxtApp()
  const { currentTheme, getTheme } = useTheme()
  const motionConfig = ref<MotionConfig | null>(null)
  const prefersReducedMotion = ref(false)

  onMounted(async () => {
    const theme = await getTheme(currentTheme.value)
    motionConfig.value = theme.motion
    
    if (process.client) {
      prefersReducedMotion.value = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    }
  })

  const getPreset = (name: string): MotionPreset => {
    return motionConfig.value?.presets[name] || { duration: 0.6, ease: 'power2.out' }
  }

  const getDuration = (key: string): number => {
    if (prefersReducedMotion.value) return 0.01
    return motionConfig.value?.duration[key] || 0.6
  }

  const getEasing = (key: string): string => {
    return motionConfig.value?.easing[key] || 'power2.out'
  }

  return {
    getPreset,
    getDuration,
    getEasing,
    prefersReducedMotion,
  }
}
```

---

## Phase 3: CSS Migration (Day 2-3)

### 3.1 Current File Inventory
- **CSS:** `assets/css/main.css` (132 lines)
- **Components:** 3 files (PreviewArea, PropertiesPanel, Timeline)
- **Pages:** 1 file (`index.vue` - 873 lines with 400+ lines of CSS)

### 3.2 Replace main.css
**File:** `assets/css/main.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply scroll-smooth;
  }
  
  body {
    @apply font-sans leading-relaxed text-neutral bg-base-100 overflow-x-hidden;
  }
}

@layer utilities {
  .text-display {
    @apply text-5xl md:text-7xl lg:text-8xl font-normal leading-tight tracking-tight font-serif;
  }
  
  .text-headline {
    @apply text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight;
  }
  
  .text-subhead {
    @apply text-xl md:text-2xl lg:text-3xl font-semibold leading-snug;
  }
  
  .text-body {
    @apply text-base md:text-lg leading-relaxed max-w-prose;
  }
  
  .text-caption {
    @apply text-sm text-secondary leading-snug;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  @apply w-2;
}
::-webkit-scrollbar-track {
  @apply bg-transparent;
}
::-webkit-scrollbar-thumb {
  @apply bg-secondary rounded;
}
::-webkit-scrollbar-thumb:hover {
  @apply bg-neutral;
}
```

### 3.3 Component Migration Order

**Total:** ~600 lines of scoped CSS to migrate

#### Priority 1: Utility Components (Optional - used for demo/testing)
1. **PreviewArea.vue** - 57 lines CSS → Tailwind (~30 min)
2. **PropertiesPanel.vue** - 75 lines CSS → Tailwind + DaisyUI forms (~45 min)
3. **Timeline.vue** - 64 lines CSS → Tailwind (~30 min)

#### Priority 2: Main Scrollytelling Page (Critical)
4. **index.vue** - 400+ lines CSS → Tailwind (~4-6 hours)
   - Complex layouts: hero, parallax, horizontal scroll, sticky sections
   - Multiple animation states
   - Responsive design considerations

### 3.4 Migration Pattern

**Before (Scoped CSS):**
```vue
<style scoped>
.preview-area {
  padding: 16px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  border-radius: 4px;
}
</style>
```

**After (Tailwind):**
```vue
<template>
  <div class="p-4 border border-gray-300 bg-gray-50 rounded">
    <!-- content -->
  </div>
</template>
```

---

## Phase 4: Component Registry (Day 4-5)

### 4.1 Motion Blocks Structure
```
components/
  blocks/
    Hero/
      HeroWithParallax.vue
      HeroWithParallax.meta.ts
    Features/
      FeatureGrid.vue
      FeatureGrid.meta.ts
    CTA/
      CTASection.vue
      CTASection.meta.ts
```

### 4.2 Block Metadata Example
**File:** `components/blocks/Hero/HeroWithParallax.meta.ts`
```ts
export default {
  id: 'hero-with-parallax',
  name: 'Hero with Parallax',
  category: 'hero',
  semantics: {
    purpose: 'Opening section with parallax scroll effect',
    whenToUse: [
      'Landing page headers',
      'Product launches',
      'Campaign pages',
    ],
  },
  props: {
    headline: {
      type: 'string',
      required: true,
      description: 'Main headline text',
    },
    motionPreset: {
      type: 'string',
      default: 'fadeUp',
      description: 'Motion preset from theme',
    },
  },
  a11y: {
    considerations: 'Respects prefers-reduced-motion; maintains keyboard navigation',
  },
}
```

### 4.3 Registry API
**File:** `server/api/components/registry.ts`
```ts
export default defineEventHandler(() => {
  const metas = import.meta.glob('~/components/blocks/**/*.meta.ts', {
    eager: true,
  })
  
  return Object.values(metas).map((m: any) => m.default)
})
```

---

## Phase 5: PageSpec Renderer (Day 5-6)

### 5.1 PageSpec Type
**File:** `types/pagespec.ts`
```ts
export interface PageSpec {
  meta: {
    title: string
    description: string
    ogImage?: string
  }
  theme: string
  sections: SectionSpec[]
}

export interface SectionSpec {
  component: string
  props: Record<string, any>
}
```

### 5.2 Page Renderer Component
**File:** `components/PageRenderer.vue`
```ts
<script setup lang="ts">
import type { PageSpec } from '~/types/pagespec'

const props = defineProps<{ spec: PageSpec }>()
const { setTheme } = useTheme()

onMounted(() => {
  setTheme(props.spec.theme)
})

const getComponent = (name: string) => {
  return resolveComponent(name)
}
</script>

<template>
  <div class="page-renderer">
    <component
      v-for="(section, i) in spec.sections"
      :key="i"
      :is="getComponent(section.component)"
      v-bind="section.props"
    />
  </div>
</template>
```

---

## Phase 6: Preview & Testing (Day 6-7)

### 6.1 Theme Preview Page
**File:** `pages/preview.vue`
```vue
<template>
  <div class="min-h-screen bg-base-100">
    <div class="navbar bg-base-200 shadow">
      <div class="flex-1">
        <span class="text-xl font-bold">Theme Preview</span>
      </div>
      <div class="flex-none">
        <select v-model="selectedTheme" class="select select-bordered" @change="switchTheme">
          <option value="acme">Acme</option>
          <option value="beta">Beta</option>
        </select>
      </div>
    </div>
    
    <div class="container mx-auto p-8">
      <h1 class="text-display">Display Text</h1>
      <h2 class="text-headline mt-4">Headline</h2>
      <p class="text-body mt-4">Body text with proper line height and spacing.</p>
      
      <div class="mt-8 grid grid-cols-4 gap-4">
        <div class="card bg-primary text-primary-content p-4">Primary</div>
        <div class="card bg-secondary text-secondary-content p-4">Secondary</div>
        <div class="card bg-accent text-accent-content p-4">Accent</div>
        <div class="card bg-neutral text-neutral-content p-4">Neutral</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { setTheme } = useTheme()
const selectedTheme = ref('acme')

const switchTheme = () => {
  setTheme(selectedTheme.value)
}

onMounted(() => {
  setTheme('acme')
})
</script>
```

---

## Migration Checklist

### Phase 1: Setup ✅
- [ ] Install DaisyUI
- [ ] Configure tailwind.config.ts
- [ ] Create theme types
- [ ] Build useTheme composable
- [ ] Create theme API endpoint

### Phase 2: Motion ✅
- [ ] Create motion types
- [ ] Build useMotion composable
- [ ] Add reduced-motion detection
- [ ] Create motion presets

### Phase 3: CSS Migration ✅
- [ ] Update main.css with Tailwind
- [ ] Migrate PreviewArea.vue
- [ ] Migrate PropertiesPanel.vue
- [ ] Migrate Timeline.vue
- [ ] Migrate animator.vue (largest file)
- [ ] Migrate remaining pages

### Phase 4: Component System ✅
- [ ] Create blocks directory structure
- [ ] Build 5 core Motion Blocks
- [ ] Add meta files for each block
- [ ] Create registry API
- [ ] Add Zod schemas

### Phase 5: PageSpec ✅
- [ ] Create PageSpec types
- [ ] Build PageRenderer component
- [ ] Create example PageSpecs
- [ ] Add validation

### Phase 6: Testing ✅
- [ ] Build preview page
- [ ] Test theme switching
- [ ] Test reduced motion
- [ ] Lighthouse audit
- [ ] Accessibility check

---

## Risk Mitigation

1. **Layout Shift During Migration**
   - Keep old CSS file temporarily
   - Migrate component-by-component
   - Test each component in isolation

2. **GSAP Integration**
   - Ensure Tailwind utilities don't conflict with GSAP transforms
   - Test ScrollTrigger with Tailwind classes

3. **Theme Switching Performance**
   - Use CSS variables for runtime theme changes
   - Minimize re-renders on theme switch

4. **DaisyUI Component Conflicts**
   - Namespace custom components
   - Use `@apply` sparingly for performance

---

## Next Actions

1. **Start:** Install DaisyUI and configure Tailwind
2. **Create:** Theme system infrastructure
3. **Migrate:** One component at a time (PreviewArea first)
4. **Test:** After each component migration
5. **Document:** Component patterns as you go
