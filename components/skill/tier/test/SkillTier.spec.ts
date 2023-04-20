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
  description: 'Launch a bolt of lightning that shocks an enemy <span class="text-orange-300">4</span> times, dealing <span class="text-orange-300">[{damage}]</span> damage each hit.',
  descriptionValues: {
    damage: '8%,8.8%,9.6%,10.4%,11.2%'
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
    description: 'Each time <span class="text-white">Spark</span> hits its primary target, it has a <span class="text-orange-300">20%</span> chance to hit up to 3 additional enemies, dealing <span class="text-orange-300">6%</span> damage. If there are no other enemies to hit, Spark instead deals <span class="text-orange-300">x20%</span> increased damage to its primary target.',
    transform: '',
    active: false,
    choiceModifiers: [{
      name: 'Glinting Spark',
      description: '<span class="text-white">Spark</span> grants <span class="text-orange-300">+2%</span> increased Critical Strike Chance per cast for <span class="text-orange-300">3</span> seconds, up to <span class="text-orange-300">+10%.</span>',
      transform: '',
      active: false
    }, {
      name: 'Flickering Spark',
      description: 'Each time <span class="text-white">Spark</span> hits an enemy it has a <span class="text-orange-300">3%</span> chance to form a <span class="underline">Crackling Energy</span>.',
      transform: '',
      active: false
    }]
  }
}

const testLearnedSkill = {
  ...testSkill,
  rank: 2
}

const testTier = {
  name: 'basic',
  skills: [testSkill],
  rankRequired: 0,
  passives: []
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
  rankRequired: 2,
  passives: []
}

async function setTestTier (tier = testTier) {
  await wrapper.setProps({
    tier
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

  test('clicking a SkillItem emits the increment-skill event', async () => {
    await setTestTier()

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

  test('right-clicking a SkillItem does not emit decrement-skill event if allowUnlearnSkill is false', async () => {
    await setTestTier(testTierWithRank)

    await wrapper.setProps({
      higherTierInvested: true
    })

    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItem' })
    await skillItemWrapper.vm.$emit('contextmenu', {})

    expect(wrapper.emitted()).not.toHaveProperty('decrement-skill')
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

  test('mouseout from a SkillItem sets tooltipStore.visible to false', async () => {
    await setTestTier()

    const store = useTooltipStore()
    store.visible = true
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItem' })
    await skillItemWrapper.vm.$emit('mouseout', {})

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

  test('mouseout from a SkillItemModifier sets tooltipStore.visible to false', async () => {
    await setTestTier()

    const store = useTooltipStore()
    store.visible = true
    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItemModifier' })
    await skillItemWrapper.vm.$emit('mouseout', {})

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

  test('mouseout from a .choice-modifier sets tooltipStore.visible to false', async () => {
    await setTestTier()

    const store = useTooltipStore()
    store.visible = true
    const choiceModifierWrapper = wrapper.findComponent('.choice-modifier') as VueWrapper
    choiceModifierWrapper.vm.$emit('mouseout', {})

    expect(store.visible).toBe(false)
  })
})
