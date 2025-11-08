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
    {
      id: 'testimonial-slider',
      name: 'Testimonial Slider',
      category: 'content',
      semantics: {
        purpose: 'Display rotating customer testimonials with quotes and attribution',
        whenToUse: ['Social proof sections', 'Customer success stories', 'Trust building'],
      },
      props: {
        eyebrow: { type: 'string', required: false },
        headline: { type: 'string', required: true },
        testimonials: { type: 'Array<Testimonial>', required: true },
        align: { type: '"left"|"center"', default: 'left' },
        autoplay: { type: 'boolean', default: false },
        interval: { type: 'number', default: 5000, constraints: 'Range 1000-30000ms' },
      },
      a11y: {
        considerations: 'Ensure quotes have proper attribution; autoplay respects prefers-reduced-motion; provide keyboard navigation for dots/arrows.',
      },
      motion: {
        defaultPreset: 'slideIn',
        allowedPresets: ['slideIn', 'fadeUp'],
      },
      examples: [
        {
          title: 'Customer testimonials with autoplay',
          props: {
            eyebrow: 'What Our Customers Say',
            headline: 'Trusted by Thousands',
            align: 'center',
            autoplay: true,
            interval: 5000,
            testimonials: [
              {
                quote: 'This platform transformed how we handle customer onboarding. The results were immediate and impressive.',
                author: 'Sarah Chen',
                title: 'Head of Product, TechCorp',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
              },
              {
                quote: 'The best investment we made this year. Customer satisfaction scores increased by 40%.',
                author: 'Marcus Johnson',
                title: 'CEO, StartupXYZ',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
              },
            ],
          },
        },
      ],
    },
    {
      id: 'horizontal-scroll-gallery',
      name: 'Horizontal Scroll Gallery',
      category: 'media',
      semantics: {
        purpose: 'Pin viewport and horizontally scroll through image gallery with parallax',
        whenToUse: ['Photo essays', 'Portfolio showcases', 'Visual narratives', 'NYT-style immersive stories'],
      },
      props: {
        eyebrow: { type: 'string', required: false },
        introText: { type: 'string', required: true },
        outroText: { type: 'string', required: true },
        images: { type: 'Array<GalleryImage>', required: true, constraints: 'Min 3 images' },
        scrollDistance: { type: 'number', default: 4000, constraints: 'Range 1000-10000px' },
      },
      a11y: {
        considerations: 'Respects prefers-reduced-motion (disables parallax); provide alt text for all images; ensure text contrast meets WCAG standards.',
      },
      motion: {
        defaultPreset: 'horizontalScroll',
        allowedPresets: ['horizontalScroll'],
      },
      examples: [
        {
          title: 'Photo essay with varied image sizes',
          props: {
            eyebrow: 'Visual Story',
            introText: 'Exploring the intersection of design and narrative',
            outroText: 'A journey through composition and motion',
            scrollDistance: 4000,
            images: [
              { src: 'https://picsum.photos/600/750?random=1', width: 'w-[600px]', height: 'h-[750px]', offset: 'top-[5%]', speed: 0.5 },
              { src: 'https://picsum.photos/550/700?random=2', width: 'w-[550px]', height: 'h-[700px]', offset: 'top-[20%]', speed: 0.8 },
              { src: 'https://picsum.photos/700/550?random=3', width: 'w-[700px]', height: 'h-[550px]', offset: 'top-[10%]', speed: 0.6 },
            ],
          },
        },
      ],
    },
  ]

  return registry
})
