import {
  ISkillDescriptionValues,
  ISkillModifier,
  ISkillItem
} from '../utils/skills'

export const useTooltipStore = defineStore('tooltip', {
  state: () => ({
    visible: false as boolean,
    active: false as boolean,
    name: '' as string,
    category: '' as string,
    description: '' as string,
    descriptionValues: {} as ISkillDescriptionValues,
    costText: '' as string,
    costValue: '' as string,
    cooldown: '' as string,
    cooldownValues: '' as string,
    luckyHitChance: 0 as number,
    icon: '' as string,
    rank: 0 as number,
    rankMax: 0 as number,
    type: '' as string,
    school: '' as string,
    damageType: '' as string | undefined,
    modifier: {} as ISkillModifier | undefined,
    x: 0 as number,
    y: 0 as number
  }),

  actions: {
    setSkill (skill: ISkillItem, el: Element): void {
      const refBox = el.getBoundingClientRect()
      const offset = 20

      this.$reset()

      this.name = skill.name
      this.active = false
      this.rank = skill.rank
      this.rankMax = skill.rankMax
      this.school = skill.school
      this.type = skill.type
      this.damageType = skill.damageType
      this.description = skill.description
      this.descriptionValues = skill.descriptionValues
      this.cooldown = skill.cooldown || ''
      this.cooldownValues = skill.cooldownValues || ''
      this.modifier = skill.modifier
      this.icon = skill.icon
      this.category = 'skill'
      this.x = refBox.left + offset
      this.y = refBox.top + offset
      this.visible = true
    },

    setPassive (skill: ISkillItem, el: Element): void {
      const refBox = el.getBoundingClientRect()
      const offset = 20

      this.$reset()

      this.name = skill.name
      this.active = false
      this.rank = skill.rank
      this.rankMax = skill.rankMax
      this.school = ''
      this.type = ''
      this.damageType = ''
      this.description = skill.description
      this.descriptionValues = skill.descriptionValues
      this.modifier = undefined
      this.icon = skill.icon
      this.category = 'passive'
      this.x = refBox.left + offset
      this.y = refBox.top + offset
      this.visible = true
    },

    setModifier (modifier: any, el: Element, icon: string, choiceModifier = false): void {
      const refBox = el.getBoundingClientRect()
      const offset = 20

      this.$reset()

      this.name = modifier.name
      this.rank = 0
      this.rankMax = 0
      this.school = ''
      this.type = ''
      this.damageType = ''
      this.active = modifier.active
      this.description = modifier.description
      this.descriptionValues = {}
      this.modifier = undefined
      this.icon = icon
      this.category = choiceModifier ? 'choice-modifier' : 'modifier'
      this.x = refBox.left + offset
      this.y = refBox.top + offset
      this.visible = true
    }
  }
})
