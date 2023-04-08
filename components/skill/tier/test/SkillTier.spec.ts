import { shallowMount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import SkillTier from '../SkillTier.vue'

let wrapper: VueWrapper

const createWrapper = (props = {}) => {
  wrapper = shallowMount(SkillTier, {
    props,
    global: {
      stubs: ['ClientOnly'],
      plugins: [createTestingPinia({
        stubActions: false
      })]
    }
  })
}

beforeEach(() => {
  createWrapper({
    skills: []
  })
})

describe('SkillTier.vue', () => {
  test('mounts correctly', () => {
    expect(wrapper).toBeDefined()
  })

  test('clicking a SkillItem increments the rank', () => {
    // wrapper.setProps
    // expect(wrapper).toBeDefined()
  })
})
