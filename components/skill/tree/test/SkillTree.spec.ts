import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
// import { faBullseye } from '@fortawesome/free-solid-svg-icons'
import SkillTree from '../SkillTree.vue'
// import { useTooltipStore } from '@/store/tooltip'
// import SkillItem from '../../SkillItem.vue'

let wrapper: VueWrapper

const cache: { [key: string]: {value: any}} = {}

vi.mock('useState', () => {
  return (str: string, init: Function) => {
    if (!cache[str]) {
      cache[str] = { value: init() }
    }
    return cache[str]
  }
})

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
      ],
      mocks: {
        useState: (str: string, init: Function) => {
          if (!cache[str]) {
            cache[str] = { value: init() }
          }
          return cache[str]
        }
      }
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
})
