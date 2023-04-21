import { mount, VueWrapper } from '@vue/test-utils'
import { test, expect } from 'vitest'
import SkillPassive from '../SkillPassive.vue'

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = mount(SkillPassive as any, {
    // global: {
    //   mocks: {
    //     useActiveFill: () => 'fill-red-800'
    //   }
    // }
  })
})

describe('SkillPassive.vue', () => {
  test('outer square has the correct default styles', () => {
    const outerSquareWrapper = wrapper.find('.skill-item-passive__outer-square')

    const outerSquareClass = outerSquareWrapper.attributes('class')

    expect(outerSquareClass).toContain('fill-[#191f20]')
  })

  test('outer square has the correct styles when props.active is true', async () => {
    await wrapper.setProps({
      rank: 1
    })

    const outerSquareWrapper = wrapper.find('.skill-item-passive__outer-square')

    expect(outerSquareWrapper.attributes('class')).toContain('fill-red-800')
  })

  test('image is translucent by default', async () => {
    await wrapper.setProps({
      icon: 'my-icon'
    })

    const imageWrapper = wrapper.find('image')

    expect(imageWrapper.attributes('opacity')).toEqual('0.6')
  })

  test('image is opaque when props.active is true', async () => {
    await wrapper.setProps({
      rank: 1,
      icon: 'my-icon'
    })

    const imageWrapper = wrapper.find('image')

    expect(imageWrapper.attributes('opacity')).toEqual('1')
  })

  test('the SVG group should emit mouse events', () => {
    const groupWrapper = wrapper.find('g')

    groupWrapper.trigger('click')
    groupWrapper.trigger('contextmenu')
    groupWrapper.trigger('mouseover')
    groupWrapper.trigger('mouseleave')
    groupWrapper.trigger('mouseout')

    expect(wrapper.emitted().click).toHaveLength(1)
    expect(wrapper.emitted().contextmenu).toHaveLength(1)
    expect(wrapper.emitted().mouseover).toHaveLength(1)
    expect(wrapper.emitted().mouseleave).toHaveLength(1)
    expect(wrapper.emitted().mouseout).toHaveLength(1)
  })
})
