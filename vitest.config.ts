import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// import { defineVitestConfig } from 'nuxt-vitest/config'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '@/store/tooltip': ['useTooltipStore']
        }
      ],
      dts: '.nuxt/imports.d.ts'
    }),
    Components({
      dirs: ['./components'],
      extensions: ['vue'],
      dts: '.nuxt/components.d.ts'
    })
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, './')
    }
  },

  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      all: true,
      exclude: [
        'coverage/**',
        'dist/**',
        'packages/*/test{,s}/**',
        '**/*.d.ts',
        'cypress/**',
        'test{,s}/**',
        'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
        '.nuxt/**',
        '**/*{.,-}config.{js,cjs,mjs,ts,tsx,jsx}'
      ]
    }
  }
})
