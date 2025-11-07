<script setup lang="ts">
// Set default light theme on mount
onMounted(() => {
  if (process.client) {
    document.documentElement.setAttribute('data-theme', 'acme')
  }
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
