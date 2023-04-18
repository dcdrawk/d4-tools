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
    icon: '' as string,
    rank: 0 as number,
    rankMax: 0 as number,
    type: '' as string,
    school: '' as string,
    damageType: '' as string,
    modifiers: [] as ISkillModifier[],
    x: 0 as number,
    y: 0 as number
  }),

  actions: {
    setSkill (skill: ISkillItem, el: Element): void {
      const refBox = el.getBoundingClientRect()
      const offset = 20

      this.name = skill.name
      this.active = false
      this.rank = skill.rank
      this.rankMax = skill.rankMax
      this.school = skill.school || ''
      this.type = skill.type || ''
      this.damageType = skill.damageType || ''
      this.description = skill.description
      this.descriptionValues = skill.descriptionValues
      this.modifiers = skill.modifiers || []
      this.icon = skill.icon
      this.category = 'skill'
      this.x = refBox.left + offset
      this.y = refBox.top + offset
      this.visible = true
    },

    setPassive (skill: ISkillItem, el: Element): void {
      const refBox = el.getBoundingClientRect()
      const offset = 20

      this.name = skill.name
      this.active = false
      this.rank = skill.rank
      this.rankMax = skill.rankMax
      this.school = ''
      this.type = ''
      this.damageType = ''
      this.description = skill.description
      this.descriptionValues = skill.descriptionValues
      this.modifiers = []
      this.icon = skill.icon
      this.category = 'passive'
      this.x = refBox.left + offset
      this.y = refBox.top + offset
      this.visible = true
    },

    setModifier (modifier: any, el: Element, icon: string, choiceModifier = false): void {
      const refBox = el.getBoundingClientRect()
      const offset = 20

      this.name = modifier.name
      this.rank = 0
      this.rankMax = 0
      this.school = ''
      this.type = ''
      this.damageType = ''
      this.active = modifier.active
      this.description = modifier.description
      this.descriptionValues = {}
      this.modifiers = []
      this.icon = icon
      this.category = choiceModifier ? 'choice-modifier' : 'modifier'
      this.x = refBox.left + offset
      this.y = refBox.top + offset
      this.visible = true
    }
  }
})
