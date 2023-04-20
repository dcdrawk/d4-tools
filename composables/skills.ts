import { ISkillItem, ISkillPassiveGroup } from '@/utils/skills'

export { useSorcererBasicSkills } from './skills/sorcerer/sorcerer-basic'
export { useSorcererCoreSkills } from './skills/sorcerer/sorcerer-core'

export function getSkillCount (skills: (ISkillItem | ISkillPassiveGroup)[]) {
  return skills.reduce((accumulator: number, skill: any) => {
    if (skill.rank) {
      const modifierValue = skill.modifiers[0].active ? 1 : 0
      const choiceModifierValue = skill.modifiers[0].choiceModifiers.find((modifier: any) => modifier.active) ? 1 : 0
      return accumulator + skill.rank + modifierValue + choiceModifierValue
    }
    return accumulator
  }, 0)
}
