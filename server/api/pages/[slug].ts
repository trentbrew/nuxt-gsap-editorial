import type { PageSpec } from '~/types/pagespec'
import { validatePageSpec } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || 'demo'

  const pages: Record<string, PageSpec> = {
    showcase: {
      version: 1,
      page: {
        meta: {
          title: 'Index Showcase',
          description: 'Complex scroll-driven narrative built with Motion Blocks',
          ogImage: '/og.jpg',
        },
        theme: 'acme',
        sections: [
          {
            component: 'hero-with-parallax',
            props: {
              eyebrow: 'Architecture Demo',
              headline: 'Building Immersive Stories',
              subhead: 'A complete recreation of the index page using Motion Blocks',
              media: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop',
              align: 'left',
            },
          },
          {
            component: 'horizontal-scroll-gallery',
            props: {
              eyebrow: 'Visual Narrative',
              introText: 'Exploring the intersection of design and narrative through motion',
              outroText: 'A journey through composition and temporal rhythm',
              scrollDistance: 4000,
              images: [
                { src: 'https://picsum.photos/600/750?random=1', width: 'w-[600px]', height: 'h-[750px]', offset: 'top-[5%]', speed: 0.5 },
                { src: 'https://picsum.photos/550/700?random=2', width: 'w-[550px]', height: 'h-[700px]', offset: 'top-[20%]', speed: 0.8 },
                { src: 'https://picsum.photos/700/550?random=3', width: 'w-[700px]', height: 'h-[550px]', offset: 'top-[10%]', speed: 0.6 },
                { src: 'https://picsum.photos/580/720?random=4', width: 'w-[580px]', height: 'h-[720px]', offset: 'top-[25%]', speed: 0.7 },
                { src: 'https://picsum.photos/650/600?random=5', width: 'w-[650px]', height: 'h-[600px]', offset: 'top-[15%]', speed: 0.9 },
                { src: 'https://picsum.photos/560/780?random=6', width: 'w-[560px]', height: 'h-[780px]', offset: 'top-[8%]', speed: 0.55 },
              ],
            },
          },
          {
            component: 'overlapping-cards',
            props: {
              eyebrow: 'Impact Metrics',
              headline: 'The Power of Scrollytelling',
              cards: [
                {
                  title: 'Engagement Metrics',
                  description: 'Interactive stories show significantly higher engagement rates compared to traditional linear content.',
                  stat1: { number: '340%', label: 'Increase' },
                  stat2: { number: '8.5min', label: 'Avg. Time' },
                },
                {
                  title: 'Memory Retention',
                  description: 'Visual storytelling elements improve information retention and recall by substantial margins.',
                  stat1: { number: '65%', label: 'Better Recall' },
                  stat2: { number: '2.5x', label: 'More Memorable' },
                },
                {
                  title: 'Emotional Impact',
                  description: 'Immersive narratives create stronger emotional connections between content and audience.',
                  stat1: { number: '89%', label: 'Connection' },
                  stat2: { number: '4.2x', label: 'Sharing Rate' },
                },
              ],
            },
          },
          {
            component: 'cta-section',
            props: {
              eyebrow: 'Ready to Build',
              headline: 'Create Complex Narratives with Simple JSON',
              body: 'Motion Blocks handle the complexity so you can focus on storytelling.',
              primaryLabel: 'View Code',
              primaryHref: '#',
              secondaryLabel: 'Explore Blocks',
              secondaryHref: '/preview',
              align: 'center',
            },
          },
        ],
      },
    },
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
            component: 'testimonial-slider',
            props: {
              eyebrow: 'What Our Customers Say',
              headline: 'Trusted by Storytellers',
              align: 'center',
              autoplay: true,
              interval: 6000,
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
                {
                  quote: 'Beautifully designed, incredibly powerful. Our editorial team loves the flexibility.',
                  author: 'Elena Rodriguez',
                  title: 'Creative Director, MediaCo',
                  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
                },
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
