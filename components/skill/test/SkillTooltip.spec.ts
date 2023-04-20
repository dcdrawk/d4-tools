import { mount, VueWrapper } from '@vue/test-utils'
import { test, expect } from 'vitest'
import SkillTooltip from '../SkillTooltip.vue'

let wrapper: VueWrapper

const createWrapper = (props = {}) => {
  wrapper = mount(SkillTooltip as any, {
    props,
    global: {
      stubs: ['SkillDamageIcon', 'SkillItem', 'SkillItemModifier', 'SkillPassive', 'FontAwesomeIcon']
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
    await wrapper.setProps({
      rank: 1
    })

    const rankWrapper = wrapper.find('.tooltip__rank')

    expect(rankWrapper.exists()).toBe(true)
  })

  test('damage type text is hidden if no damageType is provided', () => {
    const skillDamageWrapper = wrapper.find('.tooltip__damage-type')

    expect(skillDamageWrapper.exists()).toBe(false)
  })

  test('rank is shown when level is above 0', async () => {
    await wrapper.setProps({
      damageType: 'fire'
    })

    const skillDamageWrapper = wrapper.find('.tooltip__damage-type')

    expect(skillDamageWrapper.exists()).toBe(true)
  })

  test('displays multiple schools correctly', async () => {
    await wrapper.setProps({
      school: 'pyromancy,channeled',
      type: 'fire'
    })

    const schoolItemWrappers = wrapper.findAll('.tooltip__school-item')

    expect(schoolItemWrappers.length).toBe(2)
  })

  test('description text displays as-is if no descriptionValues are passed', async () => {
    await wrapper.setProps({
      description: 'Hello World'
    })

    const descriptionWrapper = wrapper.find('.tooltip__description')

    expect(descriptionWrapper.text()).toBe('Hello World')
  })

  test('description text displays with values when descriptionValues are passed', async () => {
    await wrapper.setProps({
      description: 'Hello {text}',
      descriptionValues: { text: 'World' }
    })

    const descriptionWrapper = wrapper.find('.tooltip__description')

    expect(descriptionWrapper.text()).toBe('Hello World')
  })

  test('displays the next rank text', async () => {
    await wrapper.setProps({
      description: 'Hello {text}',
      rank: 1,
      rankMax: 2,
      descriptionValues: { text: 'World1,World2' }
    })

    const nextRankWrapper = wrapper.find('.tooltip__next-rank')

    expect(nextRankWrapper.text()).toBe('Next Rank: textWorld2')
  })

  test('displays tooltip modifiers', async () => {
    await wrapper.setProps({
      description: 'Hello {text}',
      modifiers: [{
        active: true,
        description: 'My Modifier',
        choiceModifiers: [{
          active: false,
          description: 'Choice 1'
        }, {
          active: true,
          description: 'Choice 2'
        }]
      }]
    })

    const modifiersListWrapper = wrapper.find('.tooltip__modifiers-list')

    expect(modifiersListWrapper.text()).toBe('My ModifierChoice 2')
  })

  test('dispays the correct default icon', () => {
    const iconWrapper = wrapper.find('skill-item-modifier-stub')

    expect(iconWrapper.exists()).toBe(true)
  })

  test('dispays the correct modifier icon', async () => {
    await wrapper.setProps({
      category: 'modifier'
    })

    const iconWrapper = wrapper.find('skill-item-modifier-stub')

    expect(iconWrapper.exists()).toBe(true)
  })

  test('dispays the correct choice-modifier icon', async () => {
    await wrapper.setProps({
      category: 'choice-modifier'
    })

    const iconWrapper = wrapper.find('skill-item-modifier-stub')

    expect(iconWrapper.exists()).toBe(true)
  })

  test('dispays the correct passive icon', async () => {
    await wrapper.setProps({
      category: 'passive'
    })

    const iconWrapper = wrapper.find('skill-passive-stub')

    expect(iconWrapper.exists()).toBe(true)
  })

  test('dispays the correct skill icon', async () => {
    await wrapper.setProps({
      category: 'skill'
    })

    const iconWrapper = wrapper.find('skill-item-stub')

    expect(iconWrapper.exists()).toBe(true)
  })

  test('dispays "choose 1" text for when props.category is "choice-modifier"', async () => {
    await wrapper.setProps({
      category: 'choice-modifier'
    })

    expect(wrapper.text()).includes('You may only select one upgrade.')
  })

  test('dispays "Not Learned" text for when props.rank is 0', async () => {
    await wrapper.setProps({
      rank: 0
    })

    const notLearnedWrapper = wrapper.find('.tooltip__not-learned')

    expect(notLearnedWrapper.exists()).toBe(true)
  })

  test('hides "Not Learned" text for when props.rank is > 0', () => {
    createWrapper({
      name: 'hi',
      rank: 1,
      rankMax: 5,
      category: 'skill',
      damageType: 'fire'
    })

    expect(wrapper.find('.tooltip__not-learned').exists()).toBe(false)
  })
})
