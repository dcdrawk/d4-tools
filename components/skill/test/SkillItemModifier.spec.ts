import { mount, VueWrapper } from '@vue/test-utils'
import { test, expect } from 'vitest'
import SkillItemModifier from '../SkillItemModifier.vue'

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = mount(SkillItemModifier as any, {
    // global: {
    //   mocks: {
    //     useActiveFill: () => 'fill-red-800'
    //   }
    // }
  })
})

describe('SkillItemModifier.vue', () => {
  test('outer square has the correct default styles', () => {
    const outerSquareWrapper = wrapper.find('.skill-item-modifier__outer-square')

    const outerSquareClass = outerSquareWrapper.attributes('class')

    expect(outerSquareClass).toContain('fill-[#191f20]')
  })

  test('outer square has the correct styles when props.active is true', async () => {
    await wrapper.setProps({
      active: true
    })

    const outerSquareWrapper = wrapper.find('.skill-item-modifier__outer-square')

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
      active: true,
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
