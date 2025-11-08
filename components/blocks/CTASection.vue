<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  eyebrow: { type: String, default: '' },
  headline: { type: String, required: true },
  body: { type: String, default: '' },
  primaryLabel: { type: String, default: 'Get Started' },
  primaryHref: { type: String, default: '#' },
  secondaryLabel: { type: String, default: 'Learn More' },
  secondaryHref: { type: String, default: '#' },
  align: { type: String as PropType<'left' | 'center'>, default: 'center' },
})

const root = ref()
const { $gsap } = useNuxtApp()
const { getDuration, getEasing, prefersReducedMotion } = useMotion()

onMounted(() => {
  if (prefersReducedMotion.value) return
  $gsap.from(root.value, {
    y: 30,
    opacity: 0,
    duration: getDuration('base'),
    ease: getEasing('smooth'),
    scrollTrigger: {
      trigger: root.value,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  })
})
</script>

<template>
  <section ref="root" class="section">
    <div class="container">
      <div
        :class="[
          align === 'center' ? 'text-center mx-auto' : 'text-left',
          'bg-base-200 rounded-2xl p-10 md:p-14 shadow-lg max-w-4xl'
        ]"
      >
        <p v-if="eyebrow" class="text-sm uppercase tracking-wide text-base-content/60 mb-3">{{ eyebrow }}</p>
        <h2 class="serif text-headline mb-4">{{ headline }}</h2>
        <p v-if="body" class="text-body mb-8 text-base-content/70">{{ body }}</p>
        <div :class="['flex gap-4', align === 'center' ? 'justify-center' : '']">
          <a :href="primaryHref" class="btn btn-primary">{{ primaryLabel }}</a>
          <a :href="secondaryHref" class="btn btn-secondary">{{ secondaryLabel }}</a>
        </div>
      </div>
    </div>
  </section>
</template>
