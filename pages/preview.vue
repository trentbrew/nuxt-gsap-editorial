<template>
  <div class="min-h-screen bg-base-100">
    <!-- Theme Switcher Nav -->
    <nav class="bg-base-200 shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold">Theme Preview</h1>
          <div class="flex items-center gap-4">
            <label class="text-sm font-medium">Theme:</label>
            <select 
              v-model="selectedTheme" 
              @change="switchTheme"
              class="select select-bordered"
            >
              <option value="acme">Acme (Gold)</option>
              <option value="beta">Beta (Blue)</option>
            </select>
          </div>
        </div>
      </div>
    </nav>

    <!-- Typography Showcase -->
    <section class="section">
      <div class="container">
        <h2 class="text-headline mb-8">Typography</h2>
        <div class="space-y-6">
          <div>
            <p class="text-sm text-secondary mb-2">Display Text (.text-display)</p>
            <h1 class="text-display serif">The Art of Storytelling</h1>
          </div>
          <div>
            <p class="text-sm text-secondary mb-2">Headline (.text-headline)</p>
            <h2 class="text-headline">Chapter One: The Beginning</h2>
          </div>
          <div>
            <p class="text-sm text-secondary mb-2">Subhead (.text-subhead)</p>
            <h3 class="text-subhead">A Journey Through Time</h3>
          </div>
          <div>
            <p class="text-sm text-secondary mb-2">Body Text (.text-body)</p>
            <p class="text-body">
              In the digital age, storytelling has evolved beyond traditional boundaries. 
              Interactive narratives now shape how we consume and understand information.
            </p>
          </div>
          <div>
            <p class="text-sm text-secondary mb-2">Caption (.text-caption)</p>
            <p class="text-caption">Published March 15, 2024 • By Editorial Team</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Color Palette -->
    <section class="section bg-base-200">
      <div class="container">
        <h2 class="text-headline mb-8">Color Palette</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="space-y-2">
            <div class="w-full h-24 bg-primary rounded-lg shadow"></div>
            <p class="text-sm font-medium">Primary</p>
          </div>
          <div class="space-y-2">
            <div class="w-full h-24 bg-secondary rounded-lg shadow"></div>
            <p class="text-sm font-medium">Secondary</p>
          </div>
          <div class="space-y-2">
            <div class="w-full h-24 bg-accent rounded-lg shadow"></div>
            <p class="text-sm font-medium">Accent</p>
          </div>
          <div class="space-y-2">
            <div class="w-full h-24 bg-neutral rounded-lg shadow"></div>
            <p class="text-sm font-medium">Neutral</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Components Demo -->
    <section class="section">
      <div class="container">
        <h2 class="text-headline mb-8">Components</h2>
        
        <!-- Card Example -->
        <div class="bg-white p-12 rounded-2xl shadow-lg relative max-w-[600px] mx-auto mb-8">
          <div class="absolute -top-2.5 right-8 bg-accent text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">
            01
          </div>
          <h3 class="mb-4 serif text-2xl">Insight Card</h3>
          <p class="mb-8 text-body">
            This demonstrates how cards look with the current theme's accent color
            and typography settings.
          </p>
          <div class="flex gap-8 justify-center">
            <div class="text-center">
              <span class="block text-3xl font-bold text-accent">340%</span>
              <span class="text-sm text-secondary uppercase tracking-wider">Increase</span>
            </div>
            <div class="text-center">
              <span class="block text-3xl font-bold text-accent">8.5min</span>
              <span class="text-sm text-secondary uppercase tracking-wider">Avg. Time</span>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 justify-center mb-8">
          <button class="btn btn-primary">Primary Button</button>
          <button class="btn btn-secondary">Secondary Button</button>
          <button class="btn btn-accent">Accent Button</button>
        </div>
      </div>
    </section>

    <!-- Motion Preview -->
    <section class="section bg-base-200">
      <div class="container">
        <h2 class="text-headline mb-8">Motion Tokens</h2>
        <div class="bg-white p-8 rounded-xl">
          <div v-if="motionConfig" class="space-y-4">
            <div>
              <h3 class="font-bold mb-2">Durations:</h3>
              <div class="flex gap-4 text-sm">
                <span>Fast: {{ motionConfig.duration.fast }}s</span>
                <span>Base: {{ motionConfig.duration.base }}s</span>
                <span>Slow: {{ motionConfig.duration.slow }}s</span>
              </div>
            </div>
            <div>
              <h3 class="font-bold mb-2">Easings:</h3>
              <div class="flex gap-4 text-sm">
                <span v-for="(value, key) in motionConfig.easing" :key="key">
                  {{ key }}: {{ value }}
                </span>
              </div>
            </div>
            <div>
              <h3 class="font-bold mb-2">Presets:</h3>
              <div class="grid grid-cols-3 gap-4 text-sm">
                <div v-for="(preset, key) in motionConfig.presets" :key="key" class="bg-base-200 p-3 rounded">
                  <p class="font-bold">{{ key }}</p>
                  <p>Duration: {{ preset.duration }}s</p>
                  <p>Ease: {{ preset.ease }}</p>
                </div>
              </div>
            </div>
          </div>
          <p v-else class="text-secondary">Loading motion config...</p>
        </div>
      </div>
    </section>

    <!-- Back to Main -->
    <section class="section">
      <div class="container text-center">
        <NuxtLink to="/" class="btn btn-primary btn-lg">
          Back to Scrollytelling Page
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { setTheme, currentTheme } = useTheme()
const { motionConfig } = useMotion()
const selectedTheme = ref('acme')

const switchTheme = () => {
  setTheme(selectedTheme.value)
}

onMounted(() => {
  setTheme('acme')
})
</script>
