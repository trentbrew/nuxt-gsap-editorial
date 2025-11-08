import type { PageSpec } from '~/types/pagespec'
import { validatePageSpec } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || 'demo'

  const pages: Record<string, PageSpec> = {
    demo: {
      version: 1,
      page: {
        meta: {
          title: 'Demo Page',
          description: 'Rendered from a PageSpec JSON',
          ogImage: '/og.jpg',
        },
        theme: 'acme',
        sections: [
          {
            component: 'hero-with-parallax',
            props: {
              eyebrow: 'Investigations',
              headline: 'The Cost of Silence',
              subhead: 'A years-long look at how communities navigate accountability.',
              media:
                'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
              align: 'left',
            },
          },
          {
            component: 'text-block',
            props: {
              eyebrow: 'Chapter One',
              headline: 'JSON‑driven Motion',
              body: 'This section is rendered from a PageSpec JSON and animated via motion tokens. Swap themes to see colors and typography adapt automatically.',
              align: 'center',
            },
          },
          {
            component: 'feature-grid',
            props: {
              eyebrow: 'Why this starter',
              headline: 'Audited Motion Blocks',
              columns: 3,
              features: [
                { title: 'Tokens First', description: 'Motion and theme governed by audited tokens for consistency.' },
                { title: 'LLM Ready', description: 'Schemas + metadata ensure valid generations.' },
                { title: 'A11y Baseline', description: 'Reduced-motion safe with sensible defaults.' },
              ],
            },
          },
          {
            component: 'cta-section',
            props: {
              eyebrow: 'Ready to start?',
              headline: 'Compose scrollytelling pages from JSON',
              body: 'Use tokens and audited blocks to ship consistent, on-brand experiences.',
              primaryLabel: 'View Docs',
              primaryHref: '#',
              secondaryLabel: 'See Templates',
              secondaryHref: '#',
              align: 'center',
            },
          },
        ],
      },
    },
  }

  const spec = pages[slug] || pages.demo
  const result = await validatePageSpec(spec)
  if (!result.success) {
    setResponseStatus(event, 400)
    return { error: 'Invalid PageSpec', details: result.error }
  }
  return result.data
})
