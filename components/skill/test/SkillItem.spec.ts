import { mount, VueWrapper } from '@vue/test-utils'
import { test, expect } from 'vitest'
import SkillItem from '../SkillItem.vue'

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = mount(SkillItem as any, {
    // global: {
    //   // stubs: ['FontAwesomeIcon']
    //   mocks: {
    //     useActiveFill: () => 'fill-red-800'
    //   }
    // }
  })
})

describe('SkillItem.vue', () => {
  test('outer square has the correct default styles', () => {
    const outerSquareWrapper = wrapper.find('.skill-item__outer-square')

    const outerSquareClass = outerSquareWrapper.attributes('class')

    expect(outerSquareClass).toContain('fill-[#191f20]')
  })

  test('outer square has the correct styles when props.active is true', async () => {
    await wrapper.setProps({
      rank: 1
    })

    const outerSquareWrapper = wrapper.find('.skill-item__outer-square')

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

  test('rank is transparent by default', () => {
    const imageWrapper = wrapper.find('.skill-item__rank')

    expect(imageWrapper.attributes('class')).toContain('opacity-0')
  })

  test('rank is opaque when props.rank > 0', async () => {
    await wrapper.setProps({
      rank: 1
    })

    const imageWrapper = wrapper.find('.skill-item__rank')

    expect(imageWrapper.attributes('class')).toContain('opacity-100')
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
