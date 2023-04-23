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
    descriptionValues: {} as ISkillDescriptionValues | undefined,
    costText: '' as string | undefined,
    costValue: '' as string | undefined,
    cooldown: '' as string,
    cooldownValues: '' as string,
    luckyHitChance: 0 as number | undefined,
    icon: '' as string,
    rank: 0 as number,
    rankMax: 0 as number,
    type: '' as string,
    school: '' as string,
    damageType: '' as string | undefined,
    modifier: {} as ISkillModifier | undefined,
    x: 0 as number,
    y: 0 as number,
    reference: undefined as ComponentPublicInstance | undefined
  }),

  actions: {
    setSkill (skill: ISkillItem, reference: ComponentPublicInstance): void {
      this.$reset()

      this.name = skill.name
      this.rank = skill.rank
      this.rankMax = skill.rankMax
      this.school = skill.school
      this.type = skill.type
      this.damageType = skill.damageType
      this.description = skill.description
      this.descriptionValues = skill.descriptionValues
      this.costText = skill.costText
      this.costValue = skill.costValue
      this.luckyHitChance = skill.luckyHitChance
      this.cooldown = skill.cooldown || ''
      this.cooldownValues = skill.cooldownValues || ''
      this.modifier = skill.modifier
      this.icon = skill.icon
      this.category = 'skill'
      this.reference = reference
      this.visible = true
    },

    setPassive (skill: ISkillItem, reference: ComponentPublicInstance): void {
      this.$reset()

      this.name = skill.name
      this.rank = skill.rank
      this.rankMax = skill.rankMax
      this.description = skill.description
      this.descriptionValues = skill.descriptionValues
      this.icon = skill.icon
      this.category = 'passive'
      this.reference = reference
      this.visible = true
    },

    setModifier (modifier: any, reference: ComponentPublicInstance, icon: string, choiceModifier = false): void {
      this.$reset()

      this.name = modifier.name
      this.active = modifier.active
      this.description = modifier.description
      this.icon = icon
      this.category = choiceModifier ? 'choice-modifier' : 'modifier'
      this.reference = reference
      this.visible = true
    }
  }
})
