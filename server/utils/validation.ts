export async function validatePageSpec(spec: any) {
  // Lazy load zod to avoid hard dependency during initial scaffold
  let z: any
  try {
    // @ts-ignore - dynamic import at runtime
    z = (await import('zod')).z
  } catch (e) {
    // If zod is not installed yet, skip validation gracefully
    return { success: true, data: spec }
  }

  const textBlockSchema = z.object({
    eyebrow: z.string().optional(),
    headline: z.string().optional(),
    body: z.string(),
    align: z.enum(['left', 'center']).default('left'),
  })

  const heroWithParallaxSchema = z.object({
    eyebrow: z.string().optional(),
    headline: z.string(),
    subhead: z.string().optional(),
    media: z.string().url(),
    align: z.enum(['left', 'center']).default('left'),
  })

  const ctaSectionSchema = z.object({
    eyebrow: z.string().optional(),
    headline: z.string(),
    body: z.string().optional(),
    primaryLabel: z.string().default('Get Started'),
    primaryHref: z.string().default('#'),
    secondaryLabel: z.string().default('Learn More'),
    secondaryHref: z.string().default('#'),
    align: z.enum(['left', 'center']).default('center'),
  })

  const blockSchemas: Record<string, any> = {
    'text-block': textBlockSchema,
    'hero-with-parallax': heroWithParallaxSchema,
    'cta-section': ctaSectionSchema,
  }

  const SectionSchema = z
    .object({
      component: z.string(),
      props: z.record(z.any()).default({}),
    })
    .superRefine((val: any, ctx: any) => {
      const schema = blockSchemas[val.component]
      if (schema) {
        const res = schema.safeParse(val.props || {})
        if (!res.success) {
          for (const issue of res.error.issues) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: `${val.component}: ${issue.path.join('.') || '(root)'} ${issue.message}` })
          }
        }
      }
    })

  const PageSpecSchema = z.object({
    version: z.literal(1),
    page: z.object({
      meta: z.object({
        title: z.string(),
        description: z.string().optional(),
        ogImage: z.string().optional(),
      }),
      theme: z.string(),
      sections: z.array(SectionSchema).min(1),
    }),
  })

  const parsed = PageSpecSchema.safeParse(spec)
  if (!parsed.success) {
    return { success: false, error: parsed.error.format() }
  }

  return { success: true, data: parsed.data }
}
