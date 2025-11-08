<script setup lang="ts">
import type { PageSpec } from '~/types/pagespec'
import TextBlock from '~/components/blocks/TextBlock.vue'
import HeroWithParallax from '~/components/blocks/HeroWithParallax.vue'
import CTASection from '~/components/blocks/CTASection.vue'
import FeatureGrid from '~/components/blocks/FeatureGrid.vue'

const props = defineProps<{ spec: PageSpec }>()

// Map ComponentMeta.id -> Vue component
const componentsMap: Record<string, any> = {
  'text-block': TextBlock,
  'hero-with-parallax': HeroWithParallax,
  'cta-section': CTASection,
  'feature-grid': FeatureGrid,
}

const resolve = (id: string) => componentsMap[id]
</script>

<template>
  <div>
    <component
      v-for="(section, idx) in props.spec.page.sections"
      :key="idx + '-' + section.component"
      :is="resolve(section.component)"
      v-bind="section.props || {}"
    />
  </div>
</template>
