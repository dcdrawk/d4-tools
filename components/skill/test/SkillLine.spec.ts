import { mount, VueWrapper } from '@vue/test-utils'
import SkillLine from '../SkillLine.vue'

let wrapper: VueWrapper

const createWrapper = (props = {}) => {
  wrapper = mount(SkillLine as any, {
    props
  })
  return wrapper
}

beforeEach(() => {
  wrapper = createWrapper({
    parent: {
      getBoundingClientRect: vi.fn(() => ({ left: 0, right: 0, top: 0, bottom: 0 }))
    },
    el1: {
      getBoundingClientRect: vi.fn(() => ({ left: 0, right: 0, top: 0, bottom: 0 }))
    },
    el2: {
      getBoundingClientRect: vi.fn(() => ({ left: 5, right: 10, top: 5, bottom: 10 }))
    }
  })
})

describe('SkillLine.vue', () => {
  test('renders the correct line coordinates when elements are provided', () => {
    const lineWrapper = wrapper.find('line')

    expect(lineWrapper.attributes('x1')).toBe('0')
    expect(lineWrapper.attributes('x2')).toBe('7.5')
    expect(lineWrapper.attributes('y1')).toBe('0')
    expect(lineWrapper.attributes('y2')).toBe('7.5')
  })

  test('renders the correct default stroke color', () => {
    const lineWrapper = wrapper.findAll('line')

    expect(lineWrapper[1].attributes('class')).includes('stroke-[#191f20]')
  })

  test('renders the correct active stroke color', async () => {
    const lineWrapper = wrapper.findAll('line')

    await wrapper.setProps({ active: true })

    expect(lineWrapper[1].attributes('class')).includes('stroke-red-800')
  })

  test('renders the correct highlight stroke color', async () => {
    const lineWrapper = wrapper.findAll('line')

    await wrapper.setProps({ highlight: true })

    expect(lineWrapper[1].attributes('class')).includes('stroke-[#e3d9c0]/50')
  })
})
