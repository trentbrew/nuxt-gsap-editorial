import type { ComponentMeta } from '~/types/meta'

export default defineEventHandler(() => {
  const registry: ComponentMeta[] = [
    {
      id: 'text-block',
      name: 'Text Block',
      category: 'content',
      semantics: {
        purpose: 'Display short-form editorial copy with optional eyebrow and headline',
        whenToUse: ['Introductions', 'Section breaks', 'Short narrative copy'],
      },
      props: {
        eyebrow: { type: 'string', required: false },
        headline: { type: 'string', required: false },
        body: { type: 'string', required: true },
        align: { type: '"left"|"center"', default: 'left', constraints: 'Center alignment for short copy only' },
      },
      a11y: {
        considerations: 'Ensure text contrast meets WCAG AA against theme background',
      },
      motion: {
        defaultPreset: 'fadeUp',
        allowedPresets: ['fadeUp', 'slideIn', 'scaleIn'],
      },
      examples: [
        {
          title: 'Centered intro',
          props: {
            eyebrow: 'Chapter One',
            headline: 'The Beginning',
            body: 'In the digital age, storytelling evolves beyond the page.',
            align: 'center',
          },
        },
      ],
    },
    {
      id: 'hero-with-parallax',
      name: 'Hero With Parallax',
      category: 'hero',
      semantics: {
        purpose: 'Large editorial hero with parallax media and headline',
        whenToUse: ['Section openers', 'Landing page hero'],
      },
      props: {
        eyebrow: { type: 'string', required: false },
        headline: { type: 'string', required: true },
        subhead: { type: 'string', required: false },
        media: { type: 'string', required: true },
        align: { type: '"left"|"center"', default: 'left' },
      },
      a11y: {
        considerations:
          'Provide descriptive alt text for media when not purely decorative; ensure headings form a logical outline.',
      },
      motion: {
        defaultPreset: 'parallax',
        allowedPresets: ['parallax', 'fadeUp'],
      },
      examples: [
        {
          title: 'Editorial hero',
          props: {
            eyebrow: 'Investigations',
            headline: 'The Cost of Silence',
            subhead: 'A years-long look at how communities navigate accountability.',
            media:
              'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
            align: 'left',
          },
        },
      ],
    },
    {
      id: 'cta-section',
      name: 'CTA Section',
      category: 'cta',
      semantics: {
        purpose: 'Prominent call-to-action with headline and two buttons',
        whenToUse: ['Conversion moments', 'End of section or page'],
      },
      props: {
        eyebrow: { type: 'string', required: false },
        headline: { type: 'string', required: true },
        body: { type: 'string', required: false },
        primaryLabel: { type: 'string', default: 'Get Started' },
        primaryHref: { type: 'string', default: '#' },
        secondaryLabel: { type: 'string', default: 'Learn More' },
        secondaryHref: { type: 'string', default: '#' },
        align: { type: '"left"|"center"', default: 'center' },
      },
      a11y: {
        considerations: 'Buttons must be reachable via keyboard and have discernible text.',
      },
      motion: {
        defaultPreset: 'fadeUp',
        allowedPresets: ['fadeUp', 'slideIn'],
      },
      examples: [
        {
          title: 'Centered CTA',
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
    {
      id: 'feature-grid',
      name: 'Feature Grid',
      category: 'content',
      semantics: {
        purpose: 'Summarize key features in a responsive grid',
        whenToUse: ['Benefits overview', 'Capabilities summary'],
      },
      props: {
        eyebrow: { type: 'string', required: false },
        headline: { type: 'string', required: true },
        features: { type: 'Array<Feature>', required: true },
        columns: { type: '2|3|4', default: 3 },
        align: { type: '"left"|"center"', default: 'left' },
      },
      a11y: {
        considerations: 'Use real text for headings/descriptions; ensure focus order is logical.',
      },
      motion: {
        defaultPreset: 'fadeUp',
        allowedPresets: ['fadeUp'],
      },
      examples: [
        {
          title: 'Three-column features',
          props: {
            eyebrow: 'Why this starter',
            headline: 'Audited Motion Blocks',
            columns: 3,
            features: [
              { title: 'Tokens First', description: 'Motion and theme governed by tokens.' },
              { title: 'LLM Ready', description: 'Schemas + metadata for valid generations.' },
              { title: 'A11y Baseline', description: 'Reduced-motion safe defaults.' },
            ],
          },
        },
      ],
    },
  ]

  return registry
})
