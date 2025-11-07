import type { Theme } from '~/types/theme'

export default defineEventHandler((event) => {
  const theme = getRouterParam(event, 'theme')

  // Theme definitions
  const themes: Record<string, Theme> = {
    acme: {
      name: 'acme',
      colors: {
        'color-scheme': 'light',
        primary: '#d4af37',
        'primary-content': '#ffffff',
        secondary: '#666666',
        'secondary-content': '#ffffff',
        accent: '#d4af37',
        'accent-content': '#ffffff',
        neutral: '#121212',
        'neutral-content': '#ffffff',
        'base-100': '#fafafa',
        'base-200': '#ffffff',
        'base-300': '#e5e5e5',
        'base-content': '#121212',
      },
      brand: {
        name: 'The Chronicle',
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
          scaleIn: { duration: 0.6, ease: 'back.out(1.7)' },
        },
      },
      grid: {
        container: '1200px',
        gap: '1rem',
      },
    },
    beta: {
      name: 'beta',
      colors: {
        'color-scheme': 'light',
        primary: '#4338ca',
        'primary-content': '#ffffff',
        secondary: '#64748b',
        'secondary-content': '#ffffff',
        accent: '#0ea5e9',
        'accent-content': '#ffffff',
        neutral: '#1e293b',
        'neutral-content': '#ffffff',
        'base-100': '#f8fafc',
        'base-200': '#ffffff',
        'base-300': '#e2e8f0',
        'base-content': '#0f172a',
      },
      brand: {
        name: 'Beta Design Co.',
        logo: '/logos/beta.svg',
      },
      motion: {
        easing: {
          smooth: 'power2.out',
          snappy: 'power1.inOut',
          elastic: 'elastic.out(1, 0.3)',
        },
        duration: {
          fast: 0.25,
          base: 0.5,
          slow: 1,
        },
        presets: {
          fadeUp: { duration: 0.6, ease: 'power2.out' },
          slideIn: { duration: 0.8, ease: 'power1.inOut' },
          scaleIn: { duration: 0.5, ease: 'back.out(1.5)' },
        },
      },
      grid: {
        container: '1200px',
        gap: '1.5rem',
      },
    },
  }

  return themes[theme || 'acme'] || themes.acme
})
