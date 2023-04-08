import { shallowMount, VueWrapper } from '@vue/test-utils'
import { test, expect } from 'vitest'
import SkillTooltip from '../SkillTooltip.vue'

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = shallowMount(SkillTooltip as any, {
    global: {
      stubs: ['SkillDamageIcon', 'SkillItem', 'SkillItemModifier', 'FontAwesomeIcon']
    }
  })
})

describe('SkillTooltip.vue', () => {
  test('wrapper is defined', () => {
    expect(wrapper).toBeDefined()
  })

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
        description: 'My Modifier'
      }]
    })

    const modifiersListWrapper = wrapper.find('.tooltip__modifiers-list')

    expect(modifiersListWrapper.text()).toBe('My Modifier')
  })

  test('dispays the correct default icon', () => {
    const iconWrapper = wrapper.find('skill-item-modifier-stub')

    expect(iconWrapper.exists()).toBe(true)
  })

  test('dispays the correct skill icon', async () => {
    await wrapper.setProps({
      category: 'skill'
    })

    const iconWrapper = wrapper.find('skill-item-stub')

    expect(iconWrapper.exists()).toBe(true)
  })
})
