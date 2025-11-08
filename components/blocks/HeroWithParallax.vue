<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  eyebrow: { type: String, default: '' },
  headline: { type: String, required: true },
  subhead: { type: String, default: '' },
  media: { type: String, required: true },
  align: { type: String as PropType<'left' | 'center'>, default: 'left' },
})

const root = ref()
const imgEl = ref()
const { $gsap } = useNuxtApp()
const { getDuration, getEasing, prefersReducedMotion } = useMotion()

onMounted(() => {
  $gsap.from(root.value, {
    opacity: 0,
    duration: getDuration('base'),
    ease: getEasing('smooth'),
  })

  if (prefersReducedMotion.value) return

  $gsap.to(imgEl.value, {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: root.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
})

onUnmounted(() => {
  // Kill any animations and ScrollTriggers for this component
  $gsap.killTweensOf(root.value)
  $gsap.killTweensOf(imgEl.value)
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.trigger === root.value) {
      trigger.kill()
    }
  })
})
</script>

<template>
  <section ref="root" class="section">
    <div class="container grid md:grid-cols-2 gap-8 items-center">
      <div :class="[align === 'center' ? 'text-center' : 'text-left']">
        <p v-if="eyebrow" class="text-sm uppercase tracking-wide text-base-content/60 mb-3">{{ eyebrow }}</p>
        <h1 class="serif text-display mb-4">{{ headline }}</h1>
        <p v-if="subhead" class="text-subhead text-base-content/70">{{ subhead }}</p>
      </div>
      <div ref="imgEl" class="relative overflow-hidden rounded-xl shadow-xl">
        <NuxtImg :src="media" alt="" width="1200" height="520" sizes="(max-width: 768px) 100vw, 50vw" class="w-full h-[420px] md:h-[520px] object-cover" />
      </div>
    </div>
  </section>
</template>
