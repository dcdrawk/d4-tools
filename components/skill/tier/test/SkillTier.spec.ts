import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import SkillTier from '../SkillTier.vue'
import { useTooltipStore } from '@/store/tooltip'

let wrapper: VueWrapper

const createWrapper = (props = {}) => {
  wrapper = mount(SkillTier, {
    props,
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

const testSkill = {
  name: 'Spark',
  description: '',
  descriptionValues: {
    damage: ''
  },
  type: 'Basic',
  school: 'Shock',
  damageType: 'Lightning',
  icon: '/img/skills/sorcerer/basic/spark.png',
  transform: '',
  rank: 0,
  rankMax: 5,
  modifier: {
    name: 'Enhanced Spark',
    description: '',
    transform: '',
    active: false,
    choiceModifiers: [{
      name: 'Glinting Spark',
      description: '',
      transform: '',
      active: false
    }, {
      name: 'Flickering Spark',
      description: '',
      transform: '',
      active: false
    }]
  }
}

const testLearnedSkill = {
  ...testSkill,
  rank: 2
}

const testLearnedSkillWithSelectedChoiceModifiers = {
  ...testSkill,
  rank: 2,
  modifier: {
    name: 'Enhanced Spark',
    description: '',
    transform: '',
    active: true,
    choiceModifiers: [{
      name: 'Glinting Spark',
      description: '',
      transform: '',
      active: true
    }, {
      name: 'Flickering Spark',
      description: '',
      transform: '',
      active: false
    }]
  }
}

const testTier = {
  name: 'basic',
  skills: [testSkill],
  rankRequired: 0,
  passives: [{
    name: 'crab damage',
    items: [{
      name: 'Passive',
      desription: 'test',
      transform: '',
      rank: 0,
      connected: true
    }]
  }]
}

const testTierWithRank = {
  name: 'basic',
  skills: [testLearnedSkill],
  rankRequired: 0,
  passives: []
}

const testTierRankUpNotAllowed = {
  name: 'basic',
  skills: [testSkill],
  rankRequired: 33,
  passives: []
}

const testTierRankDown = {
  name: 'basic',
  skills: [testLearnedSkill],
  rankRequired: 2,
  passives: []
}

const testTierWithChoiceMods = {
  name: 'basic',
  skills: [testLearnedSkillWithSelectedChoiceModifiers],
  rankRequired: 0,
  passives: []
}

async function setTestTier (tier = testTier) {
  await wrapper.setProps({
    tier
  })
}

beforeEach(() => {
  createWrapper({
    skills: [],
    rankRequired: 2
  })
})

describe('SkillTier.vue', () => {
  test('mounts correctly', () => {
    expect(wrapper).toBeDefined()
  })

  test('clicking a SkillItem emits the increment-skill event', async () => {
    await setTestTier(testTierWithChoiceMods)

    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItem' })
    await skillItemWrapper.vm.$emit('click', {})

    expect(wrapper.emitted()).toHaveProperty('increment-skill')
  })

  test('clicking a SkillItem does not emit an event if learning the skill is not allowed', async () => {
    await setTestTier(testTierRankUpNotAllowed)

    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItem' })
    await skillItemWrapper.vm.$emit('click', {})

    expect(wrapper.emitted()).not.toHaveProperty('increment-skill')
  })

  test('right-clicking a SkillItem emits the decrement-skill event', async () => {
    await setTestTier()

    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItem' })
    await skillItemWrapper.vm.$emit('contextmenu', {})

    expect(wrapper.emitted()).toHaveProperty('decrement-skill')
  })

  test('right-clicking a SkillItem does not emit an event if allowUnlearnSkill is false', async () => {
    await setTestTier(testTierWithRank)

    await wrapper.setProps({
      rankRequired: 0,
      higherTierInvested: true
    })

    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItem' })
    await skillItemWrapper.vm.$emit('contextmenu', {})

    expect(wrapper.emitted()).not.toHaveProperty('decrement-skill')
  })

  test('right-clicking a SkillItem does not emit an event if allowUnlearnSkill is false 2', async () => {
    await setTestTier(testTierRankDown)

    await wrapper.setProps({
      higherTierInvested: false,
      rankRequired: 25
    })

    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItem' })
    await skillItemWrapper.vm.$emit('contextmenu', {})

    expect(wrapper.emitted()).toHaveProperty('decrement-skill')
  })

  test('mouseover a SkillItem calls "setSkill" from the tooltip store', async () => {
    await setTestTier()

    const store = useTooltipStore()

    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItem' })
    await skillItemWrapper.vm.$emit('mouseover', {})

    expect(store.setSkill).toHaveBeenCalledTimes(1)
  })

  test('mouseover a SkillItem does not call "setSkill" if "tooltipStore.visible" is true', async () => {
    await setTestTier()

    const store = useTooltipStore()
    store.visible = true
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItem' })
    await skillItemWrapper.vm.$emit('mouseover', {})

    expect(store.setSkill).toHaveBeenCalledTimes(0)
  })

  test('mouseleave from a SkillItem sets tooltipStore.visible to false', async () => {
    await setTestTier()

    const store = useTooltipStore()
    store.visible = true
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItem' })
    await skillItemWrapper.vm.$emit('mouseleave', {})

    expect(store.visible).toBe(false)
  })

  test('clicking a SkillItemModifier emits the "activate-modifier" event', async () => {
    await setTestTier()

    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItemModifier' })
    await skillItemWrapper.vm.$emit('click', {})

    expect(wrapper.emitted()).toHaveProperty('activate-modifier')
  })

  test('right-clicking a SkillItemModifier emits the "deactivate-modifier" event', async () => {
    await setTestTier()

    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItemModifier' })
    await skillItemWrapper.vm.$emit('contextmenu', {})

    expect(wrapper.emitted()).toHaveProperty('deactivate-modifier')
  })

  test('mouseover a SkillItemModifier calls "setModifier" from the tooltip store', async () => {
    await setTestTier()

    const store = useTooltipStore()
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItemModifier' })
    await skillItemWrapper.vm.$emit('mouseover', {})

    expect(store.setModifier).toHaveBeenCalledTimes(1)
  })

  test('mouseover a SkillItemModifier does not call "setModifier" if tooltipStore.visible is true', async () => {
    await setTestTier()

    const store = useTooltipStore()
    store.visible = true
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItemModifier' })
    await skillItemWrapper.vm.$emit('mouseover', {})

    expect(store.setModifier).toHaveBeenCalledTimes(0)
  })

  test('mouseleave from a SkillItemModifier sets tooltipStore.visible to false', async () => {
    await setTestTier()

    const store = useTooltipStore()
    store.visible = true
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItemModifier' })
    await skillItemWrapper.vm.$emit('mouseleave', {})

    expect(store.visible).toBe(false)
  })

  test('clicking a SkillPassive emits the "increment-passive" event', async () => {
    await setTestTier()

    const skillItemWrapper = wrapper.findComponent({ name: 'SkillPassive' })
    await skillItemWrapper.vm.$emit('click', {})

    expect(wrapper.emitted()).toHaveProperty('increment-passive')
  })

  test('right-clicking a SkillPassive emits the "decrement-passive" event', async () => {
    await setTestTier()

    const skillItemWrapper = wrapper.findComponent({ name: 'SkillPassive' })
    await skillItemWrapper.vm.$emit('contextmenu', {})

    expect(wrapper.emitted()).toHaveProperty('decrement-passive')
  })

  test('mouseover a SkillPassive calls "setPassive" from the tooltip store', async () => {
    await setTestTier()

    const store = useTooltipStore()
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillPassive' })
    await skillItemWrapper.vm.$emit('mouseover', {})

    expect(store.setPassive).toHaveBeenCalledTimes(1)
  })

  test('mouseover a SkillPassive does not call "setPassive" if tooltipStore.visible is true', async () => {
    await setTestTier()

    const store = useTooltipStore()
    store.visible = true
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillPassive' })
    await skillItemWrapper.vm.$emit('mouseover', {})

    expect(store.setPassive).toHaveBeenCalledTimes(0)
  })

  test('mouseleave from a SkillPassive sets tooltipStore.visible to false', async () => {
    await setTestTier()

    const store = useTooltipStore()
    store.visible = true
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillPassive' })
    await skillItemWrapper.vm.$emit('mouseleave', {})

    expect(store.visible).toBe(false)
  })

  test('clicking a .choice-modifier emits the "activate-modifier" event', async () => {
    await setTestTier()

    const choiceModifierWrapper = wrapper.findComponent('.choice-modifier') as VueWrapper

    choiceModifierWrapper.vm.$emit('click', {})

    expect(wrapper.emitted()).toHaveProperty('activate-modifier')
  })

  test('right-clicking a .choice-modifier emits the "deactivate-modifier" event', async () => {
    await setTestTier()

    const choiceModifierWrapper = wrapper.findComponent('.choice-modifier') as VueWrapper

    choiceModifierWrapper.vm.$emit('contextmenu', {})

    expect(wrapper.emitted()).toHaveProperty('deactivate-modifier')
  })

  test('mouseover a .choice-modifier calls "setModifier" from the tooltip store', async () => {
    await setTestTier()

    const store = useTooltipStore()
    const choiceModifierWrapper = wrapper.findComponent('.choice-modifier') as VueWrapper
    choiceModifierWrapper.vm.$emit('mouseover', {})

    expect(store.setModifier).toHaveBeenCalledTimes(1)
  })

  test('mouseover a .choice-modifier does not call "setModifier" if tooltipStore.visible is true', async () => {
    await setTestTier()

    const store = useTooltipStore()
    store.visible = true
    const choiceModifierWrapper = wrapper.findComponent('.choice-modifier') as VueWrapper
    choiceModifierWrapper.vm.$emit('mouseover', {})

    expect(store.setModifier).toHaveBeenCalledTimes(0)
  })

  test('mouseleave from a .choice-modifier sets tooltipStore.visible to false', async () => {
    await setTestTier()

    const store = useTooltipStore()
    store.visible = true
    const choiceModifierWrapper = wrapper.findComponent('.choice-modifier') as VueWrapper
    choiceModifierWrapper.vm.$emit('mouseleave', {})

    expect(store.visible).toBe(false)
  })
})
