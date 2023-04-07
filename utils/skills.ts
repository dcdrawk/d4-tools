interface ISkillPosition {
  x: number
  y: number
}

export const getSkillTransform = (degrees: number, radius: number): string => {
  const { x, y } = getSkillPosition(degrees, radius)

  return `translate(${x}px, ${y}px)`
}

function getSkillPosition (degrees: number, radius: number): ISkillPosition {
  const radians = (360 - degrees) * (Math.PI / 180)
  const x = radius * Math.cos(radians)
  const y = radius * Math.sin(radians)

  return { x, y }
}

export const skillItemDistance = 95

export const skillModifierDistance = 70

export const skillChoiceModifierDistance = 50

/**
 * Skill Interfaces
 */
export interface ISkillDescriptionValues {
  [key: string]: string
}

export interface ISkillChoiceModifier {
  name: string
  description: string
  transform: string
  active: boolean
}

export interface ISkillModifier extends ISkillChoiceModifier {
  choiceModifiers: ISkillChoiceModifier[]
}

export interface ISkillItem {
  name: string
  description: string
  descriptionValues: ISkillDescriptionValues
  type: string
  school: string
  damageType: string
  icon: string
  transform: string
  rank: number
  rankMax: number
  modifiers: ISkillModifier[]
}
