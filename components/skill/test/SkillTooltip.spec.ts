import { mount, VueWrapper } from '@vue/test-utils'
import { test, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import SkillTooltip from '../SkillTooltip.vue'
import { useTooltipStore } from '@/store/tooltip'

let wrapper: VueWrapper

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

const createWrapper = (props = {}) => {
  wrapper = mount(SkillTooltip as any, {
    props,
    global: {
      stubs: ['SkillDamageIcon', 'SkillItem', 'SkillItemModifier', 'SkillPassive', 'FontAwesomeIcon'],
      plugins: [createTestingPinia({
        stubActions: false,
        initialState: {
          tooltip: {
            ...testSkill
          }
        }
      })]
    }
  })
}

beforeEach(() => {
  createWrapper()
})

describe('SkillTooltip.vue', () => {
  test('no rank is shown when level is 0', () => {
    const rankWrapper = wrapper.find('.tooltip__rank')

    expect(rankWrapper.exists()).toBe(false)
  })

  test('rank is shown when level is above 0', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.rank = 1
    await nextTick()

    const rankWrapper = wrapper.find('.tooltip__rank')

    expect(rankWrapper.exists()).toBe(true)
  })

  test('damage type text is hidden if no damageType is provided', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.damageType = undefined

    await nextTick()

    const skillDamageWrapper = wrapper.find('.tooltip__damage-type')

    expect(skillDamageWrapper.exists()).toBe(false)
  })

  test('displays damageType text correctly', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.damageType = 'fire'

    await nextTick()

    const skillDamageWrapper = wrapper.find('.tooltip__damage-type')

    expect(skillDamageWrapper.exists()).toBe(true)
  })

  test('displays multiple schools correctly', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.school = 'pyromancy,channeled'
    tooltipStore.type = 'fire'

    await nextTick()

    const schoolItemWrappers = wrapper.findAll('.tooltip__school-item')

    expect(schoolItemWrappers.length).toBe(2)
  })

  test('displays cooldown if no cooldownValues are provided', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.cooldown = '69'

    await nextTick()

    const descriptionWrapper = wrapper.find('.tooltip__cooldown')

    expect(descriptionWrapper.text()).toBe('Cooldown: 69 seconds')
  })

  test('displays cooldown when using cooldownValues are provided', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.cooldownValues = '5,4,3,2,1'
    tooltipStore.rank = 2

    await nextTick()

    const descriptionWrapper = wrapper.find('.tooltip__cooldown')

    expect(descriptionWrapper.text()).toBe('Cooldown: 4 seconds')
  })

  test('displays cost text and value', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.costText = 'Cost'
    tooltipStore.costValue = '420'

    await nextTick()

    const descriptionWrapper = wrapper.find('.tooltip__cost')

    expect(descriptionWrapper.text()).toBe('Cost: 420')
  })

  test('displays lucky hit chance', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.luckyHitChance = 69

    await nextTick()

    const descriptionWrapper = wrapper.find('.tooltip__lucky')

    expect(descriptionWrapper.text()).toBe('Lucky Hit Chance: 69%')
  })

  test('description text displays as-is if no descriptionValues are passed', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.description = 'Hello World'
    tooltipStore.descriptionValues = undefined

    await nextTick()

    const descriptionWrapper = wrapper.find('.tooltip__description')

    expect(descriptionWrapper.text()).toBe('Hello World')
  })

  test('description text displays with values when descriptionValues are passed', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.description = 'Hello {text}'
    tooltipStore.descriptionValues = { text: 'World' }

    await nextTick()

    const descriptionWrapper = wrapper.find('.tooltip__description')

    expect(descriptionWrapper.text()).toBe('Hello World')
  })

  test('displays the next rank text', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.description = 'Hello {text}'
    tooltipStore.rank = 1
    tooltipStore.rankMax = 2
    tooltipStore.descriptionValues = { text: 'World1,World2' }

    await nextTick()

    const nextRankWrapper = wrapper.find('.tooltip__next-rank')

    expect(nextRankWrapper.text()).toBe('Next Rank: textWorld2')
  })

  test('displays tooltip modifiers', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.description = 'Hello {text}'
    tooltipStore.modifier = {
      name: 'my mod',
      transform: 'test 0',
      active: true,
      description: 'My Modifier',
      choiceModifiers: [{
        name: 'One',
        description: 'Choice 1',
        active: false,
        transform: 'test 1'
      }, {
        name: 'Two',
        description: 'Choice 2',
        active: true,
        transform: 'test 2'
      }]
    }

    await nextTick()

    const modifiersListWrapper = wrapper.find('.tooltip__modifiers-list')

    expect(modifiersListWrapper.text()).toBe('My ModifierChoice 2')
  })

  test('dispays the correct default icon', () => {
    const iconWrapper = wrapper.find('skill-item-modifier-stub')

    expect(iconWrapper.exists()).toBe(true)
  })

  test('dispays the correct modifier icon', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.category = 'modifier'

    await nextTick()

    const iconWrapper = wrapper.find('skill-item-modifier-stub')

    expect(iconWrapper.exists()).toBe(true)
  })

  test('dispays the correct choice-modifier icon', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.category = 'choice-modifier'

    await nextTick()

    const iconWrapper = wrapper.find('skill-item-modifier-stub')

    expect(iconWrapper.exists()).toBe(true)
  })

  test('dispays the correct passive icon', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.category = 'passive'

    await nextTick()

    const iconWrapper = wrapper.find('skill-passive-stub')

    expect(iconWrapper.exists()).toBe(true)
  })

  test('dispays the correct skill icon', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.category = 'skill'

    await nextTick()

    const iconWrapper = wrapper.find('skill-item-stub')

    expect(iconWrapper.exists()).toBe(true)
  })

  test('dispays "choose 1" text for when props.category is "choice-modifier"', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.category = 'choice-modifier'

    await nextTick()

    expect(wrapper.text()).includes('You may only select one upgrade.')
  })

  test('dispays "Not Learned" text for when props.rank is 0', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.rank = 0

    await nextTick()

    const notLearnedWrapper = wrapper.find('.tooltip__not-learned')

    expect(notLearnedWrapper.exists()).toBe(true)
  })

  test('hides "Not Learned" text for when props.rank is > 0', async () => {
    const tooltipStore = useTooltipStore()

    tooltipStore.rank = 1

    await nextTick()

    expect(wrapper.find('.tooltip__not-learned').exists()).toBe(false)
  })
})
