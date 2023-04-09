import { shallowMount, VueWrapper } from '@vue/test-utils'
import { test, expect } from 'vitest'
import App from '../app.vue'

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = shallowMount(App as any, {
    global: {
      stubs: ['NuxtPage']
    }
  })
})

describe('App.vue', () => {
  test('renders a nuxt page', () => {
    const pageStubWrapper = wrapper.find('nuxt-page-stub')

    expect(pageStubWrapper).toBeDefined()
  })
})
