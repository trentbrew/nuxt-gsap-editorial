<script setup lang="ts">
import type { PropType } from 'vue'

type CardData = {
  title: string
  description: string
  stat1?: { number: string; label: string }
  stat2?: { number: string; label: string }
}

const props = defineProps({
  eyebrow: { type: String, default: '' },
  headline: { type: String, required: true },
  cards: { type: Array as PropType<CardData[]>, required: true },
})

const root = ref()
const pinnedCards = ref()
const cardRefs = ref<HTMLElement[]>([])
const contentRefs = ref<HTMLElement[]>([])
const { $gsap, $ScrollTrigger } = useNuxtApp()
const { prefersReducedMotion } = useMotion()

const setCardRef = (el: any) => {
  if (el) cardRefs.value.push(el)
}

const setContentRef = (el: any) => {
  if (el) contentRefs.value.push(el)
}

onMounted(() => {
  if (prefersReducedMotion.value) return

  // Pin the cards container while content scrolls
  $ScrollTrigger.create({
    trigger: root.value,
    start: 'top top',
    end: 'bottom bottom',
    pin: pinnedCards.value,
    pinSpacing: false,
  })

  // Animate content items on scroll
  contentRefs.value.forEach((item) => {
    $gsap.from(item, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })
  })

  // Card stacking animation
  cardRefs.value.forEach((card, index) => {
    const trigger = contentRefs.value[index]

    // Start all cards stacked below (hidden)
    $gsap.set(card, { yPercent: 100, opacity: 0, scale: 0.9 })

    // Animate each card up when its section enters
    $gsap.to(card, {
      yPercent: 0,
      opacity: 1,
      scale: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: trigger,
        start: 'top center',
        end: 'center center',
        scrub: 1,
      },
    })

    // Scale down and fade previous cards as next section enters
    if (index < cardRefs.value.length - 1) {
      const nextTrigger = contentRefs.value[index + 1]
      $gsap.to(card, {
        scale: 0.95,
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: nextTrigger,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
      })
    }
  })
})

onUnmounted(() => {
  // Kill all animations and ScrollTriggers
  cardRefs.value.forEach(card => $gsap.killTweensOf(card))
  contentRefs.value.forEach(item => $gsap.killTweensOf(item))
  $ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.trigger === root.value || trigger.pin === pinnedCards.value) {
      trigger.kill()
    }
  })
})
</script>

<template>
  <section ref="root" class="relative min-h-[300vh] bg-base-200">
    <div class="container mx-auto px-6 py-16">
      <!-- Header -->
      <div class="mb-16 text-center">
        <p v-if="eyebrow" class="text-sm uppercase tracking-wide text-base-content/60 mb-3">
          {{ eyebrow }}
        </p>
        <h2 class="serif text-headline">{{ headline }}</h2>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 items-start">
        <!-- Left: Pinned cards -->
        <div ref="pinnedCards" class="relative h-[500px]">
          <div
            v-for="(card, index) in cards"
            :key="index"
            :ref="setCardRef"
            class="absolute inset-0 bg-base-100 rounded-2xl p-8 shadow-xl"
          >
            <h3 class="text-2xl font-bold mb-4">{{ card.title }}</h3>
            <p class="text-base-content/70 mb-6">{{ card.description }}</p>
            <div v-if="card.stat1 || card.stat2" class="grid grid-cols-2 gap-4">
              <div v-if="card.stat1" class="text-center p-4 bg-base-200 rounded-lg">
                <div class="text-3xl font-bold text-primary">{{ card.stat1.number }}</div>
                <div class="text-sm text-base-content/60 mt-1">{{ card.stat1.label }}</div>
              </div>
              <div v-if="card.stat2" class="text-center p-4 bg-base-200 rounded-lg">
                <div class="text-3xl font-bold text-secondary">{{ card.stat2.number }}</div>
                <div class="text-sm text-base-content/60 mt-1">{{ card.stat2.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Scrolling content -->
        <div class="space-y-[100vh]">
          <div
            v-for="(card, index) in cards"
            :key="index"
            :ref="setContentRef"
            class="min-h-[80vh] flex items-center"
          >
            <div class="max-w-md">
              <div class="text-6xl font-bold text-primary/20 mb-4">{{ index + 1 }}</div>
              <h3 class="text-3xl font-bold mb-4">{{ card.title }}</h3>
              <p class="text-lg text-base-content/80">{{ card.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
