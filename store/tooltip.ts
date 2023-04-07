interface IDescriptionValues {
  [key: string]: string
}

interface IChoiceModifier {
  name: string
  description: string
  transform: string
  active: boolean
}

interface IModifier {
  name: string
  description: string
  transform: string
  active: boolean
  choiceModifiers: IChoiceModifier[]
}

interface ISkill {
  name: string
  description: string
  descriptionValues: IDescriptionValues
  type: string
  school: string
  damageType: string
  icon: string
  transform: string
  rank: number
  rankMax: number
  modifiers: IModifier[]
}

export const useTooltipStore = defineStore('tooltip', {
  state: () => ({
    visible: false as boolean,
    active: false as boolean,
    name: '' as string,
    category: '' as string,
    description: '' as string,
    descriptionValues: {} as IDescriptionValues,
    icon: '' as string,
    rank: 0 as number,
    rankMax: 0 as number,
    type: '' as string,
    school: '' as string,
    damageType: '' as string,
    modifiers: [] as IModifier[],
    x: 0 as number,
    y: 0 as number
  }),

  getters: {
    hasActiveModifiers (state): boolean {
      return !!state.modifiers.find((modifier: IModifier) => modifier.active)
    }
  },

  actions: {
    setSkill (skill: ISkill, el: Element): void {
      if (this.visible === true) return

      const refBox = el.getBoundingClientRect()
      const offset = 20

      this.name = skill.name
      this.active = false
      this.rank = skill.rank
      this.rankMax = skill.rankMax
      this.school = skill.school
      this.damageType = skill.damageType
      this.description = skill.description
      this.descriptionValues = skill.descriptionValues
      this.modifiers = skill.modifiers
      this.icon = skill.icon
      this.category = 'skill'
      this.x = refBox.left + offset
      this.y = refBox.top + offset
      this.visible = true
    },

    setModifier (modifier: any, el: Element, icon: string, choiceModifier = false): void {
      if (this.visible === true) return

      const refBox = el.getBoundingClientRect()
      const offset = 20

      this.name = modifier.name
      this.rank = 0
      this.rankMax = 0
      this.school = ''
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
