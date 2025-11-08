<template>
  <div class="min-h-screen bg-base-100 text-base-content">
    <nav class="bg-base-200 shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-xl font-semibold">PageSpec Renderer</h1>
        <div class="flex items-center gap-3">
          <label class="text-sm">Theme</label>
          <select v-model="selectedTheme" @change="onThemeChange" class="select select-bordered select-sm">
            <option value="acme">Acme</option>
            <option value="beta">Beta</option>
          </select>
        </div>
      </div>
    </nav>

    <PageRenderer v-if="spec" :spec="spec" />
    <div v-else class="container mx-auto px-4 py-24 text-center text-secondary">Loading spec…</div>
  </div>
</template>

<script setup lang="ts">
import PageRenderer from '~/components/PageRenderer.vue'
import type { PageSpec } from '~/types/pagespec'

const route = useRoute()
const slug = computed(() => (route.params.slug as string) || 'demo')

const { data } = await useFetch<PageSpec>(() => `/api/pages/${slug.value}`)
const spec = computed(() => data.value)

const { setTheme, currentTheme } = useTheme()
const selectedTheme = ref(currentTheme.value || 'acme')

const onThemeChange = () => setTheme(selectedTheme.value)

onMounted(() => {
  setTheme(selectedTheme.value)
})
</script>
