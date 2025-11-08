<script setup lang="ts">
import type { PropType } from 'vue'

type GalleryImage = {
  src: string
  width: string
  height: string
  offset: string
  speed: number
}

const props = defineProps({
  eyebrow: { type: String, default: '' },
  introText: { type: String, required: true },
  outroText: { type: String, required: true },
  images: { type: Array as PropType<GalleryImage[]>, required: true },
  scrollDistance: { type: Number, default: 4000 },
})

const root = ref()
const introTextEl = ref()
const outroTextEl = ref()
const imageRefs = ref<HTMLElement[]>([])
const { $gsap, $ScrollTrigger } = useNuxtApp()
const { prefersReducedMotion } = useMotion()

const setImageRef = (el: any) => {
  if (el) imageRefs.value.push(el)
}

onMounted(() => {
  if (prefersReducedMotion.value) return

  // Pin the section while scrolling
  $ScrollTrigger.create({
    trigger: root.value,
    pin: true,
    start: 'top top',
    end: () => '+=' + props.scrollDistance,
  })

  // Individual image parallax - each moves at different speed
  imageRefs.value.forEach((imageEl, index) => {
    if (!imageEl) return
    
    const speed = props.images[index].speed
    const distance = -props.scrollDistance * speed
    
    $gsap.to(imageEl, {
      x: distance,
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: () => '+=' + props.scrollDistance,
        scrub: 1,
      },
    })
  })

  // Intro text fade out
  $gsap.to(introTextEl.value, {
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: root.value,
      start: 'top top+=300',
      end: 'top top+=1000',
      scrub: 1,
    },
  })

  // Outro text fade in
  $gsap.fromTo(
    outroTextEl.value,
    { opacity: 0 },
    {
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: () => 'top top+=' + (props.scrollDistance - 1000),
        end: () => 'top top+=' + props.scrollDistance,
        scrub: 1,
      },
    }
  )
})

onUnmounted(() => {
  // Kill any animations and ScrollTriggers for this component
  $gsap.killTweensOf(introTextEl.value)
  $gsap.killTweensOf(outroTextEl.value)
  imageRefs.value.forEach(el => $gsap.killTweensOf(el))
  $ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.trigger === root.value) {
      trigger.kill()
    }
  })
})
</script>

<template>
  <section ref="root" class="relative h-screen overflow-hidden bg-base-100">
    <!-- Intro text (fades out) -->
    <div
      ref="introTextEl"
      class="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
    >
      <div class="container max-w-2xl text-center px-8">
        <p v-if="eyebrow" class="text-sm uppercase tracking-wide text-base-content/60 mb-3">
          {{ eyebrow }}
        </p>
        <h2 class="serif text-headline text-base-content">{{ introText }}</h2>
      </div>
    </div>

    <!-- Horizontal scrolling images -->
    <div class="absolute inset-0 flex items-center">
      <div class="flex gap-8 pl-[50vw]">
        <div
          v-for="(image, index) in images"
          :key="index"
          :ref="setImageRef"
          :class="[
            'relative flex-shrink-0 overflow-hidden rounded-lg',
            image.width,
            image.height,
            image.offset
          ]"
        >
          <img
            :src="image.src"
            :alt="`Gallery image ${index + 1}`"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>

    <!-- Outro text (fades in) -->
    <div
      ref="outroTextEl"
      class="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-0"
    >
      <div class="container max-w-2xl text-center px-8">
        <h2 class="serif text-headline text-base-content">{{ outroText }}</h2>
      </div>
    </div>
  </section>
</template>
