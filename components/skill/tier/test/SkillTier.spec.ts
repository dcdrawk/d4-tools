import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import SkillTier from '../SkillTier.vue'
import { useTooltipStore } from '@/store/tooltip'
// import SkillItem from '../../SkillItem.vue'

let wrapper: VueWrapper

const createWrapper = (props = {}) => {
  wrapper = mount(SkillTier, {
    props,
    global: {
      stubs: ['ClientOnly'],
      plugins: [createTestingPinia({
        stubActions: false
      })]
    }
  })
}

// const store = useTooltipStore()

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
  modifiers: [{
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
  }]
}

async function setTestSkill () {
  await wrapper.setProps({
    skills: [{ ...testSkill }]
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

  test('clicking a SkillItem emits the increment-rank event', async () => {
    await setTestSkill()

    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItem' })
    await skillItemWrapper.vm.$emit('click', {})

    expect(wrapper.emitted()).toHaveProperty('increment-rank')
  })

  test('right-clicking a SkillItem emits the decrement-rank event', async () => {
    await setTestSkill()

    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItem' })
    await skillItemWrapper.vm.$emit('right-click', {})

    expect(wrapper.emitted()).toHaveProperty('decrement-rank')
  })

  test('right-clicking a SkillItem emits the decrement-rank event', async () => {
    await setTestSkill()

    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItem' })
    await skillItemWrapper.vm.$emit('right-click', {})

    expect(wrapper.emitted()).toHaveProperty('decrement-rank')
  })

  test('mousing over a SkillItem sets the tooltip store', async () => {
    await setTestSkill()

    const store = useTooltipStore()

    const skillItemWrapper = wrapper.findComponent({ name: 'SkillItem' })
    await skillItemWrapper.vm.$emit('mouseover', {})

    expect(store.setSkill).toHaveBeenCalledTimes(1)
  })
})
