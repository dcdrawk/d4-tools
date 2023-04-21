/**
 * Transform Functions
 */
interface ICoordinates {
  x: number
  y: number
}

export const getSkillTransform = (degrees: number, radius: number): string => {
  const { x, y } = getSkillPosition(degrees, radius)

  return `translate(${x}px, ${y}px)`
}

function getSkillPosition (degrees: number, radius: number): ICoordinates {
  const radians = (360 - degrees) * (Math.PI / 180)
  const x = radius * Math.cos(radians)
  const y = radius * Math.sin(radians)

  return { x, y }
}

/**
 * Distance Values
 */
export const skillItemDistance = 95

export const skillModifierDistance = 70

export const skillChoiceModifierDistance = 50

/**
 * Line Calculations
 */
export const getLineCoordinates = (parent: Element, el1: Element, el2: Element) => {
  const { x: x1, y: y1 } = getElementCenterCoordinates(parent, el1)
  const { x: x2, y: y2 } = getElementCenterCoordinates(parent, el2)

  return { x1, y1, x2, y2 }
}

export const getElementCenterCoordinates = (parent: Element, el: Element) => {
  const parentBox = parent?.getBoundingClientRect()
  const box = el?.getBoundingClientRect()

  const x = ((box?.left - parentBox?.left + box?.right - parentBox?.left) || 0) / 2
  const y = ((box?.top - parentBox?.top + box?.bottom - parentBox?.top) || 0) / 2

  return { x, y }
}

/**
 * Interfaces
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
  damageType?: string
  icon: string
  transform: string
  rank: number
  rankMax: number
  modifier: ISkillModifier
  modifiers?: ISkillModifier[]
  passive?: boolean
}

export interface IPassiveRequiredFor {
  name: string
  direction?: string
}

export interface ISkillPassive {
  name: string
  description: string
  descriptionValues: ISkillDescriptionValues
  icon: string
  transform: string
  rank: number
  rankMax: number
  connected: boolean
  direct?: boolean
  direction?: string
  requiredFor?: IPassiveRequiredFor[]
  path?: string
}

export interface ISkillPassiveGroup {
  name: string
  items: ISkillPassive[]
}

export interface ISkillTier {
  name: string
  rankRequired: number
  skills: ISkillItem[]
  passives: ISkillPassiveGroup[]
}

export function getSkillCount (tier: ISkillTier) {
  const skillTotal = tier?.skills?.reduce((accumulator: number, skill: any) => {
    if (skill.rank) {
      const modifierValue = skill.modifier.active ? 1 : 0
      const choiceModifierValue = skill.modifier.choiceModifiers.find((modifier: any) => modifier.active) ? 1 : 0

      return accumulator + skill.rank + modifierValue + choiceModifierValue
    }

    return accumulator
  }, 0) ?? 0

  const passiveTotal = tier?.passives?.reduce((accumulator: number, passive: any) => {
    if (passive.rank) return accumulator + passive.rank

    return accumulator
  }, 0) ?? 0

  return skillTotal + passiveTotal
}

interface IPassiveLine {
  active: boolean
  el: HTMLElement
  path?: string
  direction?: string
  name?: string
}

export function getPassiveLine (passive: ISkillPassive, group: ISkillPassiveGroup, nodeEl: HTMLElement, refs: any): IPassiveLine[] {
  if (passive.connected) return [{
    active: passive.rank > 0,
    el: nodeEl,
    direction: '',
    path: passive.path
  }]

  const connectedPassives = group.items.filter((passiveItem) => {
    return (passiveItem as ISkillPassive).requiredFor?.find(requirement => requirement.name === passive.name)
  })

  return connectedPassives.map((passiveItem: ISkillPassive) => {
    console.log(passiveItem.name, refs)
    return {
      active: passiveItem.rank > 0 && passive.rank > 0,
      el: refs[passiveItem.name]?.$el,
      name: passiveItem.name,
      direction: passiveItem.requiredFor?.find(requirement => requirement.name === passive.name)?.direction
    }
  })
}
