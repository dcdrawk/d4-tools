import { shallowMount, VueWrapper } from '@vue/test-utils'
import { test, expect } from 'vitest'
import TheFooter from '../TheFooter.vue'

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = shallowMount(TheFooter as any)
})

describe('TheFooter.vue', () => {
  test('renders a footer element', () => {
    const footerWrapper = wrapper.find('footer')

    expect(footerWrapper.exists()).toBe(true)
  })
})
