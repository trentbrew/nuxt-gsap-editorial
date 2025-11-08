<script setup lang="ts">
import type { PropType } from 'vue'

type Testimonial = {
  quote: string
  author: string
  title?: string
  avatar?: string
}

const props = defineProps({
  eyebrow: { type: String, default: '' },
  headline: { type: String, required: true },
  testimonials: { type: Array as PropType<Testimonial[]>, required: true },
  align: { type: String as PropType<'left' | 'center'>, default: 'left' },
  autoplay: { type: Boolean, default: false },
  interval: { type: Number, default: 5000 },
})

const root = ref()
const sliderRef = ref()
const slidesRef = ref()
const currentIndex = ref(0)
const { $gsap } = useNuxtApp()
const { getDuration, getEasing, prefersReducedMotion } = useMotion()

// Navigation
const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.testimonials.length
}
const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.testimonials.length) % props.testimonials.length
}
const goTo = (index: number) => {
  currentIndex.value = index
}

// Autoplay
let autoplayInterval: NodeJS.Timeout | null = null
const startAutoplay = () => {
  if (props.autoplay && !prefersReducedMotion.value) {
    autoplayInterval = setInterval(next, props.interval)
  }
}
const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
}

watch(() => props.autoplay, (newVal) => {
  if (newVal) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
})

// Slider animation
const animateToSlide = (newIndex: number) => {
  if (!slidesRef.value || prefersReducedMotion.value) return
  const slides = slidesRef.value.children
  const offset = -newIndex * 100
  $gsap.to(slidesRef.value, {
    x: `${offset}%`,
    duration: getDuration('base'),
    ease: getEasing('snappy'),
  })
}

watch(currentIndex, (newIndex) => {
  animateToSlide(newIndex)
})

onMounted(() => {
  // Entrance animation
  if (!prefersReducedMotion.value) {
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
  }

  // Initialize slider position
  if (slidesRef.value) {
    $gsap.set(slidesRef.value, { x: '0%' })
  }

  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <section ref="root" class="section">
    <div class="container">
      <div :class="[align === 'center' ? 'text-center' : 'text-left', 'mb-12']">
        <p v-if="eyebrow" class="text-sm uppercase tracking-wide text-base-content/60 mb-3">{{ eyebrow }}</p>
        <h2 class="serif text-headline">{{ headline }}</h2>
      </div>

      <div ref="sliderRef" class="relative overflow-hidden rounded-2xl bg-base-200">
        <!-- Slides container -->
        <div ref="slidesRef" class="flex transition-none">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="w-full flex-shrink-0 p-8 md:p-12"
          >
            <div class="max-w-3xl mx-auto">
              <blockquote class="text-body md:text-xl leading-relaxed mb-6 text-base-content/90 italic">
                "{{ testimonial.quote }}"
              </blockquote>
              <div class="flex items-center gap-4">
                <div v-if="testimonial.avatar" class="w-12 h-12 rounded-full overflow-hidden bg-base-300">
                  <img
                    :src="testimonial.avatar"
                    :alt="testimonial.author"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p class="font-semibold text-base-content">{{ testimonial.author }}</p>
                  <p v-if="testimonial.title" class="text-sm text-base-content/70">{{ testimonial.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation dots -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <button
            v-for="(_, index) in testimonials"
            :key="index"
            @click="goTo(index)"
            :class="[
              'w-2 h-2 rounded-full transition-colors',
              index === currentIndex ? 'bg-primary' : 'bg-base-300 hover:bg-base-content/40'
            ]"
            :aria-label="`Go to slide ${index + 1}`"
          />
        </div>

        <!-- Arrow navigation (optional) -->
        <template v-if="testimonials.length > 1">
          <button
            @click="prev"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-base-100/80 hover:bg-base-100 flex items-center justify-center text-base-content transition-colors"
            aria-label="Previous testimonial"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            @click="next"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-base-100/80 hover:bg-base-100 flex items-center justify-center text-base-content transition-colors"
            aria-label="Next testimonial"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </template>
      </div>
    </div>
  </section>
</template>
