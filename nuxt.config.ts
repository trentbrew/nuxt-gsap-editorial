// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@hypernym/nuxt-gsap', '@nuxt/image'],
  gsap: {
    composables: true,
    extraPlugins: {
      scrollTrigger: true,
    },
  },
  css: ['~/assets/css/main.css'],
  image: {
    domains: ['images.unsplash.com', 'static01.nyt.com', 'picsum.photos'],
  },
});
