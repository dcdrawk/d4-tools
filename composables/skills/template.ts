import { ISkillTier } from '@/utils/skills'

const type = 'type'

export const skillTemplate = () => useState('', (): ISkillTier => ({
  name: '',
  rankRequired: 0,
  skills: [{
    name: '',
    description: '',
    descriptionValues: {
      '': ''
    },
    cooldown: '',
    cooldownValues: '',
    luckyHitChance: 0,
    costText: '',
    costValue: '',
    type,
    school: '',
    damageType: '',
    icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/incinerate.png`,
    transform: getSkillTransform(90, 105),
    rank: 0,
    rankMax: 5,
    modifier: {
      name: '',
      description: '',
      transform: getSkillTransform(90, skillModifierDistance),
      active: false,
      choiceModifiers: [{
        name: '',
        description: '',
        transform: getSkillTransform(125, skillChoiceModifierDistance),
        active: false
      }, {
        name: '',
        description: '',
        transform: getSkillTransform(55, skillChoiceModifierDistance),
        active: false
      }]
    }
  }],
  passives: [{
    name: '',
    items: [{
      name: '',
      description: '',
      descriptionValues: {
        maxMana: ''
      },
      icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/passive/devastation.webp`,
      transform: getSkillTransform(-137.5, 135),
      rank: 0,
      rankMax: 3,
      connected: true,
      direct: true,
      requiredFor: [
        { name: '' }
      ]
    }, {
      name: '',
      description: '',
      descriptionValues: {
        damage: ''
      },
      icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/passive/elemental-dominance.webp`,
      transform: getSkillTransform(-137.5, 215),
      rank: 0,
      rankMax: 3,
      connected: false,
      direct: true
    }]
  }]
}))
