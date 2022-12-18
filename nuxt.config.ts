// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css', 'leaflet/dist/leaflet.css'],
  ssr: false,
  modules: [
    '@vueuse/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore'],
      },
    ],
    'nuxt-lodash',
    '~/modules/vuetify',
  ],
  imports: {
    dirs: ['stores'],
  },
  runtimeConfig: {
    public: {
      mapKey: process.env.MAP_KEY,
      token: process.env.TOKEN,
    },
  },
})
