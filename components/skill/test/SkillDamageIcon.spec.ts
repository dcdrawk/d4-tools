import { shallowMount, VueWrapper } from '@vue/test-utils'
import { test, expect } from 'vitest'
import SkillDamageIcon from '../SkillDamageIcon.vue'

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = shallowMount(SkillDamageIcon as any, {
    global: {
      stubs: ['FontAwesomeIcon']
    }
  })
})

describe('BaseSVG.vue', () => {
  test('has correct default icon', () => {
    const iconWrapper = wrapper.find('font-awesome-icon-stub')

    expect(iconWrapper.attributes('icon')).toBe('fas,bolt')
    expect(iconWrapper.attributes('class')).toBe('text-blue-500/90')
  })

  test('displays correct fire icon', async () => {
    await wrapper.setProps({
      type: 'fire'
    })

    const iconWrapper = wrapper.find('font-awesome-icon-stub')

    expect(iconWrapper.attributes('icon')).toBe('fas,fire')
    expect(iconWrapper.attributes('class')).toBe('text-orange-500/90')
  })

  test('displays correct cold icon', async () => {
    await wrapper.setProps({
      type: 'cold'
    })

    const iconWrapper = wrapper.find('font-awesome-icon-stub')

    expect(iconWrapper.attributes('icon')).toBe('fas,snowflake')
    expect(iconWrapper.attributes('class')).toBe('text-teal-500/90')
  })
})
