import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import SkillTree from '../SkillTree.vue'
import { useTooltipStore } from '@/store/tooltip'

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
    // shallow: true,
    global: {
      stubs: ['ClientOnly'],
      mocks: {
        useRuntimeConfig: vi.fn(() => {
          return { public: {}, app: { baseUrl: '/' } }
        })
      },
      plugins: [createTestingPinia({
        stubActions: false
      })]
    }
  })
}

beforeEach(() => {
  createWrapper({})
})

describe('SkillTree.vue', () => {
  test('when SkillTier emits increment-skill, increment the skill rank', async () => {
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillTier' })

    const skill = { rank: 0, rankMax: 5 }

    await skillItemWrapper.vm.$emit('increment-skill', skill)

    expect(skill.rank).toBe(1)
  })

  test('when SkillTier emits decrement-rank, do nothing if rank is 0', async () => {
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillTier' })

    const skill = { rank: 0, rankMax: 5 }

    await skillItemWrapper.vm.$emit('decrement-skill', skill)

    expect(skill.rank).toBe(0)
  })

  test('when SkillTier emits decrement-rank, do nothing if skill rank is 1 and has an active modifier', async () => {
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillTier' })

    const skill = { rank: 1, rankMax: 5, modifiers: [{ active: true }] }

    await skillItemWrapper.vm.$emit('decrement-skill', skill)

    expect(skill.rank).toBe(1)
  })

  test('when SkillTier emits decrement-skill, decrement skill rank if rank > 0', async () => {
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillTier' })

    const skill = { rank: 1, rankMax: 5, modifiers: [] }

    await skillItemWrapper.vm.$emit('decrement-skill', skill)

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

  test('when SkillTier emits activate-modifier, do nothing if parent is an in-active modifier', async () => {
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillTier' })

    const parent = { active: false, choiceModifiers: [] }
    const modifier = { active: false }

    await skillItemWrapper.vm.$emit('activate-modifier', { parent, modifier })

    expect(modifier.active).toBe(false)
  })

  test('when SkillTier emits activate-modifier, do nothing if another choice modifier is selected', async () => {
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillTier' })

    const parent = { active: true, choiceModifiers: [{ active: true }] }
    const modifier = { active: false }

    await skillItemWrapper.vm.$emit('activate-modifier', { parent, modifier })

    expect(modifier.active).toBe(false)
  })

  test('when SkillTier emits activate-modifier and parent is a SkillItem, set modifier.active to true', async () => {
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillTier' })

    const parent = { active: true, choiceModifiers: [{ active: false }] }
    const modifier = { active: false }
    const tooltipStore = useTooltipStore()

    await skillItemWrapper.vm.$emit('activate-modifier', { parent, modifier })

    expect(tooltipStore.active).toBe(true)
    expect(modifier.active).toBe(true)
  })

  test('when SkillTier emits activate-modifier and parent is a SkillModifier, set modifier.active to true', async () => {
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillTier' })

    const parent = { active: true }
    const modifier = { active: false }
    const tooltipStore = useTooltipStore()

    await skillItemWrapper.vm.$emit('activate-modifier', { parent, modifier })

    expect(tooltipStore.active).toBe(true)
    expect(modifier.active).toBe(true)
  })

  test('when SkillTier emits deactivate-modifier, do nothing if a ChoiceModifier is active', async () => {
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillTier' })

    const modifier = { active: true, choiceModifiers: [{ active: true }] }

    await skillItemWrapper.vm.$emit('deactivate-modifier', modifier)

    expect(modifier.active).toBe(true)
  })

  test('when SkillTier emits deactivate-modifier, set modifier.active to false', async () => {
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillTier' })

    const modifier = { active: true, choiceModifiers: [{ active: false }] }

    await skillItemWrapper.vm.$emit('deactivate-modifier', modifier)

    expect(modifier.active).toBe(false)
  })

  test('when SkillTier emits deactivate-modifier for a ChoiceModifier, set modifier.active to false', async () => {
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillTier' })

    const modifier = { active: true }

    await skillItemWrapper.vm.$emit('deactivate-modifier', modifier)

    expect(modifier.active).toBe(false)
  })

  test('when SkillTier emits increment-passive, increment a connected passive rank', async () => {
    const skillTier = wrapper.findComponent({ name: 'SkillTier' })

    const passiveGroup = {
      passive: {
        name: 'shponglese 1',
        connected: true,
        rank: 0,
        rankMax: 3
      },
      group: {
        name: 'shpongle',
        items: [{
          name: 'shponglese 1',
          connected: true,
          rank: 0,
          rankMax: 3
        },
        {
          name: 'shponglese 2',
          rank: 0,
          rankMax: 3
        }]
      }
    }

    await skillTier.vm.$emit('increment-passive', passiveGroup)

    expect(passiveGroup.passive.rank).toBe(1)
  })

  test('when SkillTier emits increment-passive, increment a passive rank if group requirements are met', async () => {
    const skillTier = wrapper.findComponent({ name: 'SkillTier' })

    const passiveGroup = {
      passive: {
        name: 'shponglese 2',
        rank: 0,
        rankMax: 3
      },
      group: {
        name: 'shpongle',
        items: [{
          name: 'shponglese 1',
          rank: 1,
          rankMax: 3,
          requiredFor: [{ name: 'shponglese 2' }]
        },
        {
          name: 'shponglese 2',
          rank: 0,
          rankMax: 3
        }]
      }
    }

    await skillTier.vm.$emit('increment-passive', passiveGroup)

    expect(passiveGroup.passive.rank).toBe(1)
  })

  test('when SkillTier emits increment-passive, do not increment if requirements are not met', async () => {
    const skillTier = wrapper.findComponent({ name: 'SkillTier' })

    const passiveGroup = {
      passive: {
        name: 'shponglese 2',
        rank: 0,
        rankMax: 3
      },
      group: {
        name: 'shpongle',
        items: [{
          name: 'shponglese 1',
          rank: 0,
          rankMax: 3,
          requiredFor: [{ name: 'shponglese 2' }]
        },
        {
          name: 'shponglese 2',
          rank: 0,
          rankMax: 3
        }]
      }
    }

    await skillTier.vm.$emit('increment-passive', passiveGroup)

    expect(passiveGroup.passive.rank).toBe(0)
  })

  test('when SkillTier emits decrement-passive, do nothing if rank is 0', async () => {
    const skillTier = wrapper.findComponent({ name: 'SkillTier' })

    const passiveGroup = {
      passive: {
        name: 'shponglese 1',
        rank: 0,
        rankMax: 3
      },
      group: {
        name: 'shpongle',
        items: [{
          name: 'shponglese 1',
          rank: 0,
          rankMax: 3
        }]
      }
    }

    await skillTier.vm.$emit('decrement-passive', passiveGroup)

    expect(passiveGroup.passive.rank).toBe(0)
  })

  test('when SkillTier emits decrement-passive, do nothing if rank is 0', async () => {
    const skillTier = wrapper.findComponent({ name: 'SkillTier' })

    const passiveGroup = {
      passive: {
        name: 'shponglese 1',
        rank: 2,
        rankMax: 3
      },
      group: {
        name: 'shpongle',
        items: [{
          name: 'shponglese 1',
          rank: 2,
          rankMax: 3
        }]
      }
    }

    await skillTier.vm.$emit('decrement-passive', passiveGroup)

    expect(passiveGroup.passive.rank).toBe(1)
  })

  test('when SkillTier emits decrement-passive, do nothing it has active requirements', async () => {
    const skillTier = wrapper.findComponent({ name: 'SkillTier' })

    const passiveGroup = {
      passive: {
        name: 'shponglese 1',
        rank: 1,
        rankMax: 3,
        requiredFor: [{ name: 'shponglese 2' }]
      },
      group: {
        name: 'shpongle',
        items: [{
          name: 'shponglese 1',
          rank: 1,
          rankMax: 3,
          requiredFor: [{ name: 'shponglese 2' }]
        }, {
          name: 'shponglese 2',
          rank: 1,
          rankMax: 3
        }]
      }
    }

    await skillTier.vm.$emit('decrement-passive', passiveGroup)

    expect(passiveGroup.passive.rank).toBe(1)
  })
})
