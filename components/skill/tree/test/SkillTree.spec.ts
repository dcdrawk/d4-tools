import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
// import { faBullseye } from '@fortawesome/free-solid-svg-icons'
import SkillTree from '../SkillTree.vue'
// import { useTooltipStore } from '@/store/tooltip'
// import SkillItem from '../../SkillItem.vue'

let wrapper: VueWrapper

const cache: { [key: string]: {value: any}} = {}

const useStateMock = vi.fn((str: string, init: any) => {
  if (!cache[str]) {
    cache[str] = { value: init() }
  }
  return cache[str].value
})

vi.stubGlobal('useState', useStateMock)

const createWrapper = (props = {}) => {
  wrapper = mount(SkillTree, {
    props,
    shallow: true,
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            counter: { n: 20 } // start the counter at 20 instead of 0
          }
        })
      ]
    }
  })
}

beforeEach(() => {
  createWrapper({})
})

describe('SkillTree.vue', () => {
  test('when SkillTier emits increment-rank, increment the skill rank', async () => {
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillTier' })

    const skill = { rank: 0, rankMax: 5 }

    await skillItemWrapper.vm.$emit('increment-rank', skill)

    expect(skill.rank).toBe(1)
  })

  test('when SkillTier emits decrement-rank, do nothing if rank is 0', async () => {
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillTier' })

    const skill = { rank: 0, rankMax: 5 }

    await skillItemWrapper.vm.$emit('decrement-rank', skill)

    expect(skill.rank).toBe(0)
  })

  test('when SkillTier emits decrement-rank, do nothing if skill rank is 1 and has an active modifier', async () => {
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillTier' })

    const skill = { rank: 1, rankMax: 5, modifiers: [{ active: true }] }

    await skillItemWrapper.vm.$emit('decrement-rank', skill)

    expect(skill.rank).toBe(1)
  })

  test('when SkillTier emits decrement-rank, decrement skill rank if rank > 0', async () => {
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillTier' })

    const skill = { rank: 1, rankMax: 5, modifiers: [] }

    await skillItemWrapper.vm.$emit('decrement-rank', skill)

    expect(skill.rank).toBe(0)
  })

  test('when SkillTier emits activate-modifier, do nothing if parent rank is 0', async () => {
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillTier' })

    const parent = { rank: 0, rankMax: 5, modifiers: [] }
    const modifier = { active: false }

    await skillItemWrapper.vm.$emit('activate-modifier', { parent, modifier })

    expect(modifier.active).toBe(false)
  })

  test('when SkillTier emits activate-modifier, do nothing if modifier is active', async () => {
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillTier' })

    const parent = { rank: 2, rankMax: 5, modifiers: [] }
    const modifier = { active: true }

    await skillItemWrapper.vm.$emit('activate-modifier', { parent, modifier })

    expect(modifier.active).toBe(true)
  })
})
