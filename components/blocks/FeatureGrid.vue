<script setup lang="ts">
import type { PropType } from 'vue'

type Feature = { title: string; description: string; icon?: string }

const props = defineProps({
  eyebrow: { type: String, default: '' },
  headline: { type: String, required: true },
  features: { type: Array as PropType<Feature[]>, required: true },
  columns: { type: Number, default: 3 },
  align: { type: String as PropType<'left'|'center'>, default: 'left' },
})

const root = ref()
const { $gsap } = useNuxtApp()
const { getDuration, getEasing, prefersReducedMotion } = useMotion()

onMounted(() => {
  if (prefersReducedMotion.value) return
  $gsap.from(root.value?.querySelectorAll('.feature-item'), {
    y: 20,
    opacity: 0,
    duration: getDuration('base'),
    ease: getEasing('smooth'),
    stagger: 0.08,
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
      <div :class="[align === 'center' ? 'text-center' : 'text-left', 'mb-8']">
        <p v-if="eyebrow" class="text-sm uppercase tracking-wide text-base-content/60 mb-3">{{ eyebrow }}</p>
        <h2 class="serif text-headline">{{ headline }}</h2>
      </div>
      <div :class="['grid gap-6 md:gap-8', columns === 2 ? 'md:grid-cols-2' : columns === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3']">
        <div v-for="(f, i) in features" :key="i" class="feature-item bg-base-200 rounded-xl p-6">
          <div v-if="f.icon" class="mb-3 text-accent">
            <span class="inline-block w-8 h-8">{{ f.icon }}</span>
          </div>
          <p class="font-semibold mb-1">{{ f.title }}</p>
          <p class="text-sm text-base-content/70">{{ f.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
