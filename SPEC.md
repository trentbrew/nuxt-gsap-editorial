# Nuxt Scrollytelling Starter Kit — High‑Level Spec & Brief

## 0) One‑liner

A JSON‑driven, brand‑aware scrollytelling starter for Nuxt 3 that composes motion‑rich pages from reusable "Motion Blocks" using theme + motion tokens—no page‑level CSS.

---

## 1) Problem → Outcome

- **Problem**: Building polished scrollytelling pages is slow, bespoke, and brittle across brands; animation taste is inconsistent; LLMs struggle to produce production‑ready pages.
- **Outcome**: Ship on‑brand, accessible, animated pages by feeding a PageSpec JSON; teams and LLMs compose pages from audited Motion Blocks governed by theme + motion tokens.

---

## 2) Goals (v1)

1. **JSON PageSpec → Rendered Page** with Nuxt 3 SSR/ISR.
2. **Theme Engine** (DaisyUI colors, fonts, assets) + **Motion Tokens** (durations, easings, presets).
3. **Motion Blocks**: 6–8 audited components (Hero, FeatureGrid, Testimonial, CTA, TextBlock, LogoCloud, MediaReveal, StickyStep).
4. **LLM‑ready metadata** on every block (semantics, a11y, constraints) + JSON Schema validation.
5. **A11y & Reduced Motion** built‑in; no scroll‑jacking.
6. **DX**: registry endpoint, preview page, typed props, zod schemas, example templates.

**Non‑Goals (v1)**

- Visual editor, CMS, or drag‑and‑drop builder.
- Horizontal scroll experiences, WebGL shaders, or 3D scenes.
- Full design token system beyond DaisyUI + minimal grid tokens.

---

## 3) Users & Use Cases

- **Marketing/dev teams**: ship brand‑consistent landing pages fast.
- **LLMs/agents**: synthesize PageSpec from product copy + brand profile.
- **Agencies**: clone repo per client; swap theme; assemble with JSON.

Success looks like:

- 1 day → first branded landing page from seed JSON.
- CLS < 0.1, LCP < 2.5s on median device; 0 console errors.
- 80% of animation choices come from tokens/presets, not hand‑tuning.

---

## 4) Scope (MVP → v1)

### MVP (ship first)

- PageSpec JSON → `PageRenderer` SSR.
- Theme loader (colors/fonts/assets) + Motion tokens + prefers‑reduced‑motion guard.
- Blocks: **HeroWithParallax**, **FeatureGrid**, **TestimonialSlider**, **CTASection**, **TextBlock**.
- Component Registry + `/api/components/registry` + `/api/pages/[slug]`.
- Preview: theme switcher + motion preset browser.

### v1 (polish)

- Additional blocks: LogoCloud, StickyStep (pin + step), MediaReveal (scrubbed video/image), Timeline/Steps.
- Template presets: SaaS, Product Launch, Case Study.
- Font loader harden (FOIT/FOUT), icon set adapter, image responsive helpers.

Out of scope: visual editor, CMS, multi‑brand runtime switching in one page.

---

## 5) Architectural Overview

- **Nuxt 3 + Vue 3**: SSR/ISR; typed pages; composables for theme/motion/gsap.
- **GSAP + ScrollTrigger**: registered client‑only; block‑scoped triggers; teardown on unmount.
- **Tailwind + DaisyUI**: tokens applied via CSS variables; no page CSS.
- **Type Safety**: `types/*`, zod schemas per block; `validation.ts` for PageSpec.
- **Registry**: glob import of `*.meta.ts` to expose semantics + schemas.

---

## 6) Interfaces (minimal, stable v1)

### 6.1 PageSpec

```json
{
  "page": {
    "meta": { "title": "...", "description": "...", "ogImage": "/og.jpg" },
    "theme": "acme",
    "sections": [
      { "component": "hero-with-parallax", "props": { "headline": "..." } },
      { "component": "feature-grid", "props": { "features": [] } }
    ]
  }
}
```

### 6.2 Theme (brand + colors + motion)

```ts
interface Theme {
  name: string;
  colors: DaisyUIColors;
  brand: BrandConfig;
  motion: MotionConfig;
  grid: GridConfig;
}
```

### 6.3 Motion tokens

```ts
interface MotionConfig {
  easing: Record<string, string>;
  duration: Record<string, number>;
  presets: Record<string, MotionPreset>;
}
```

### 6.4 Block metadata (LLM‑optimized)

```ts
interface ComponentMeta {
  id: string;
  name: string;
  category: string;
  semantics: { purpose: string; whenToUse: string[] };
  props: Record<string, PropDefinition>;
  a11y: { considerations: string };
}
```

---

## 7) Motion Principles

- Tokens first (duration/ease/presets). Blocks map props → tokens.
- ScrollTrigger defaults: start ≥ `top 80%`; scrub off by default; pin only in StickyStep.
- Respect `prefers-reduced-motion`: disable parallax/scrub; keep fades only.
- Cap “dramatic” presets: ≤ 3 per page.

---

## 8) Accessibility & Performance

- WCAG AA color contrast via theme guidance.
- Keyboard reachable content; motion doesn’t block reading.
- Defer below‑fold blocks; `v-intersect` or route‑based code splitting for heavy blocks.
- Image helpers: responsive sizes; lazy; explicit width/height.
- Guard against layout shift: reserve space for hero media.

---

## 9) APIs & Runtime

- `GET /api/components/registry` → block meta + templates.
- `GET /api/pages/[slug]` → PageSpec.
- `GET /api/themes/[theme]` → Theme bundle.

---

## 10) Deliverables

- Repo with starter, example pages, `README` quickstart.
- 5 core Motion Blocks + zod schemas + meta.
- 2 brand themes (acme, beta) + base tokens.
- Preview app (theme inspector + preset list).
- Example templates (SaaS Landing, Product Launch).

---

## 11) Acceptance Criteria (v1)

- Render a provided PageSpec with **zero** page CSS and **zero** console errors.
- Switching theme in preview updates fonts, colors, logos, motion presets live.
- Reducing motion preference neutralizes parallax/scrub site‑wide.
- Lighthouse (mobile): Performance ≥ 85, A11y ≥ 95, Best Practices ≥ 95.
- Type‑safe builds (`nuxt typecheck`) + schema‑validated PageSpec (zod).

---

## 12) Risks & Mitigations

- **GSAP trigger leaks** → strict scoping + teardown in `useGSAP`.
- **Font FOIT/FOUT** → `display=swap`, preload critical weights.
- **LLM misuse of props** → strong zod schemas + LLM‑oriented meta examples.
- **Motion sickness** → token caps + reduced‑motion fallbacks.

---

## 13) Milestones (aggressive, 2 weeks)

- **Day 1–2**: Skeleton + theme engine + motion tokens + `useGSAP`.
- **Day 3–6**: 5 core blocks + meta + schemas + registry API.
- **Day 7–8**: PageSpec renderer + sample pages + templates.
- **Day 9–10**: Preview app + a11y/perf hardening.
- **Day 11–12**: Docs, examples, polish; lighthouse targets.
- **Day 13–14**: QA + dry‑run brand swap + release.

---

## 14) Open Questions

1. Do we want a minimal **StickyStep** in v1 (pin + step callbacks) or defer?
2. Ship a tiny **image helper** (Nuxt Image) now or keep plain `<img>`?
3. Include **LogoCloud** as core or as template‑only composition?
4. Do we expose a **CLI scaffold** for new brands/blocks?

---

## 15) Glossary

- **Motion Block**: A composable, audited component with GSAP behaviors.
- **Motion Tokens**: Brand‑scoped animation primitives (easing, duration, presets).
- **PageSpec**: JSON manifest describing sections and their props.
- **Semantics Meta**: LLM‑oriented guidance baked into each block.
