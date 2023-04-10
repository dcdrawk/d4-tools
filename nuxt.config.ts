// https://nuxt.com/docs/api/configuration/nuxt-config
const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://dcdrawk.github.io/d4-tools',
      siteName: 'D4 Tools',
      siteDescription: 'Unofficial Skill Calculator for Diablo 4',
      titleSeparator: '|',
      language: 'en'
    },
    app: {
      baseURL: isDev ? '/' : '/d4-tools/'
    }
  },

  sourcemap: false,

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '/assets/css/index.css'
  ],

  modules: [
    '@nuxt/image-edge',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-vitest'
  ],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'icon', type: 'image/png', href: isDev ? '/favicon-32x32.png' : '/d4-tools/favicon-32x32.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Arimo&family=Source+Serif+Pro&display=swap' }
      ]
    }
  },

  nitro: {
    baseURL: isDev ? '/' : '/d4-tools'
  },

  pinia: {
    autoImports: ['defineStore']
  },

  linkChecker: {
    trailingSlash: true
  }
})
