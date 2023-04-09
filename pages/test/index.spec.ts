import { mount, VueWrapper } from '@vue/test-utils'
import index from '../index.vue'

let wrapper: VueWrapper

const createWrapper = (props = {}) => {
  wrapper = mount(index, {
    props,
    shallow: true,
    global: {}
  })
}

beforeEach(() => {
  createWrapper({})
})

describe('pages/index.vue', () => {
  test('renders a SkillTree', () => {
    const skillTreeWrapper = wrapper.findComponent({ name: 'SkillTree' })

    expect(skillTreeWrapper.exists()).toBe(true)
  })
})
