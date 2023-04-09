import { mount, VueWrapper } from '@vue/test-utils'
import { test, expect } from 'vitest'
import BaseSVG from '../BaseSVG.vue'

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = mount(BaseSVG as any)
})

describe('BaseSVG.vue', () => {
  test('has correct default viewbox', () => {
    const svg = wrapper.get('svg')
    const viewBox = svg.attributes('viewBox')

    expect(viewBox).toBe('0 0 0 0')
  })
})
