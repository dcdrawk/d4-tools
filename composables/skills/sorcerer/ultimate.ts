import { ISkillTier } from '@/utils/skills'

const type = 'Ultimate'

export const useSorcererUltimateTier = () => useState('sorcererUltimateTier', (): ISkillTier => ({
  name: 'Ultimate',
  rankRequired: 23,
  skills: [{
    name: 'Deep Freeze',
    description: 'Encase yourself in ice, becoming <span class="underline">Immune</span> for <span class="text-orange-200">4</span> seconds, continually dealing <span class="text-orange-200">13%</span> damage, and <span class="underline">Chilling</span> enemies for <span class="text-orange-200">20%</span>. When Deep Freeze expires, it deals an additional <span class="text-orange-200">100%</span> damage. Casting <span class="text-white">Deep Freeze</span> again ends the effect early.',
    cooldown: '60',
    luckyHitChance: 5,
    type,
    school: 'Frost',
    damageType: 'Cold',
    icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/ultimate/deep-freeze.png`,
    transform: getSkillTransform(126, 120),
    rank: 0,
    rankMax: 1,
    modifier: {
      name: 'Prime Deep Freeze',
      description: 'When <span class="text-white">Deep Freeze</span> ends, gain <span class="text-orange-200">10%</span> of your Base Life as a <span class="underline">Barrier</span> for <span class="text-orange-200">6</span> seconds for each enemy you <span class="underline">Froze</span> while it was active.',
      transform: getSkillTransform(125, skillModifierDistance),
      active: false,
      choiceModifiers: [{
        name: 'Supreme Deep Freeze',
        description: 'When <span class="text-white">Deep Freeze</span> ends, your Non-<span class="text-white">Ultimate</span> Cooldowns are reduced by <span class="text-orange-200">50%</span>.',
        transform: getSkillTransform(90, skillChoiceModifierDistance),
        active: false
      }]
    }
  }, {
    name: 'Inferno',
    description: 'Summon a fiery serpent that continually constricts the target area, Burning enemies for <span class="text-orange-200">295%</span> damage over <span class="text-orange-200">8</span> seconds.',
    cooldown: '45',
    luckyHitChance: 38,
    type,
    school: 'Pyromancy',
    damageType: 'Fire',
    icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/ultimate/inferno.png`,
    transform: getSkillTransform(165, 100),
    rank: 0,
    rankMax: 1,
    modifier: {
      name: 'Prime Inferno',
      description: '<span class="text-white">Inferno</span> repeatedly Pulls enemies to its center.',
      transform: getSkillTransform(148.5, skillModifierDistance),
      active: false,
      choiceModifiers: [{
        name: 'Supreme Inferno',
        description: 'While <span class="text-white">Inferno</span> is active, your Pyromancy Skills cost no Mana.',
        transform: getSkillTransform(180, skillChoiceModifierDistance),
        active: false
      }]
    }
  }, {
    name: 'Unstable Currents',
    description: 'Lightning surges within you for <span class="text-orange-200">10</span> seconds. Whenever you cast a Shock Skill, a random <span class="text-white">Core</span>, <span class="text-white">Conjuration</span>, or <span class="text-white">Mastery Shock</span> Skill is also cast.',
    cooldown: '70',
    type,
    school: 'Shock',
    damageType: 'Lightning',
    icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/ultimate/unstable-currents.png`,
    transform: getSkillTransform(-126, 120),
    rank: 0,
    rankMax: 1,
    modifier: {
      name: 'Prime Unstable Currents',
      description: '<span class="text-white">Unstable Currents</span> increases your Attack Speed by <span class="text-orange-200">+25%</span> while active.',
      transform: getSkillTransform(-125, skillModifierDistance),
      active: false,
      choiceModifiers: [{
        name: 'Supreme Unstable Currents',
        description: 'While <span class="text-white">Unstable Currents</span> is active, <span class="underline">Crackling Energy</span> continually pulses and consumes no charges.',
        transform: getSkillTransform(-90, skillChoiceModifierDistance),
        active: false
      }]
    }
  }],
  passives: [
    // {
    //   name: '',
    //   items: [{
    //     name: '',
    //     description: '',
    //     descriptionValues: {
    //       maxMana: ''
    //     },
    //     icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/passive/devastation.webp`,
    //     transform: getSkillTransform(-137.5, 135),
    //     rank: 0,
    //     rankMax: 3,
    //     connected: true,
    //     direct: true,
    //     requiredFor: [
    //       { name: '' }
    //     ]
    //   }, {
    //     name: '',
    //     description: '',
    //     descriptionValues: {
    //       damage: ''
    //     },
    //     icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/passive/elemental-dominance.webp`,
    //     transform: getSkillTransform(-137.5, 215),
    //     rank: 0,
    //     rankMax: 3,
    //     connected: false,
    //     direct: true
    //   }]
    // }
  ]
}))
