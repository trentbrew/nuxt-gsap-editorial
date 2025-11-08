<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  eyebrow: { type: String, default: '' },
  headline: { type: String, default: '' },
  body: { type: String, required: true },
  align: { type: String as PropType<'left' | 'center'>, default: 'left' },
  preset: { type: String, default: 'fadeUp' },
})

const root = ref()
const { $gsap } = useNuxtApp()
const { getDuration, getEasing, prefersReducedMotion } = useMotion()

onMounted(() => {
  if (prefersReducedMotion.value) return

  $gsap.from(root.value, {
    y: 40,
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
      <div :class="[align === 'center' ? 'text-center mx-auto' : 'text-left', 'max-w-3xl']">
        <p v-if="eyebrow" class="text-sm uppercase tracking-wide text-base-content/60 mb-3">{{ eyebrow }}</p>
        <h2 v-if="headline" class="serif text-headline mb-6">{{ headline }}</h2>
        <p class="text-body">{{ body }}</p>
      </div>
    </div>
  </section>
</template>
