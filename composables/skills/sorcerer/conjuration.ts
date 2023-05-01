import { ISkillTier } from '@/utils/skills'

const type = 'conjuration'

export const useSorcererConjurationTier = () => useState('sorcererConjurationTier', (): ISkillTier => ({
  name: 'Conjuratoin',
  rankRequired: 11,
  skills: [{
    name: 'Hydra',
    description: 'Summon a <span class="text-orange-200">3</span>-headed hydra for <span class="text-orange-200">12</span> seconds. Each head spits fire at enemies, dealing <span class="text-orange-200">{damage}</span> damage. Maximum <span class="text-orange-200">1</span> active Hydras at a time.',
    descriptionValues: {
      damage: '30%,33%,36%,39%,42%'
    },
    luckyHitChance: 79,
    costText: 'Mana',
    costValue: '20',
    type,
    school: 'Pyromancy',
    damageType: 'Fire',
    icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/conjuration/hydra.png`,
    transform: getSkillTransform(90, 100),
    rank: 0,
    rankMax: 5,
    modifier: {
      name: 'Enhanced Hydra',
      description: 'While <span class="underline">Healthy</span>, your casts of Hydra gain <span class="text-orange-200">1</span> additional head.',
      transform: getSkillTransform(90, skillModifierDistance),
      active: false,
      choiceModifiers: [{
        name: 'Summoned Hydra',
        description: 'Hydra also Burns enemies for an additional <span class="text-orange-200">12%</span> of its Base damage dealt over <span class="text-orange-200">6</span> seconds.',
        transform: getSkillTransform(125, skillChoiceModifierDistance),
        active: false
      }, {
        name: 'Invoked Hydra',
        description: 'After you Critically Strike, your Hydras gain <span class="text-orange-200">+30%</span> Critical Strike Chance for <span class="text-orange-200">3</span> seconds.',
        transform: getSkillTransform(55, skillChoiceModifierDistance),
        active: false
      }]
    }
  }, {
    name: 'Ice Blades',
    description: 'Conjure a pair of ice blades for <span class="text-orange-200">6</span> seconds that rapidly slash enemies for <span class="text-orange-200">{damage}</span> damage and have a <span class="text-orange-200">30%</span> chance to make them <span class="underline>Vulnerable</span> for <span class="text-orange-200">2</span> seconds.',
    descriptionValues: {
      damage: '30.7%,33.7%,36.8%,39.9%,42.9%'
    },
    cooldown: '12',
    luckyHitChance: 72,
    type,
    school: 'Frost',
    damageType: 'Cold',
    icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/conjuration/ice-blades.png`,
    transform: getSkillTransform(180, 100),
    rank: 0,
    rankMax: 5,
    modifier: {
      name: 'Enhanced Ice Blades',
      description: '<span class="text-white">Ice Blades\'s</span> Cooldown is reduced by <span class="text-orange-200">1</span> second each time it hits a <span class="underline>Vulnerable</span> enemy.',
      transform: getSkillTransform(180, skillModifierDistance),
      active: false,
      choiceModifiers: [{
        name: 'Summoned Ice Blades',
        description: '<span class="text-orange-200">50%</span> of Enhanced <span class="text-white">Ice Blades\'s</span> Cooldown reduction is applied to your other Skills.',
        transform: getSkillTransform(-140, skillChoiceModifierDistance),
        active: false
      }, {
        name: 'Invoked Ice Blades',
        description: 'Your <span class="text-white">Ice Blades</span> gain <span class="text-orange-200">+10%</span> increased Attack Speed per active Ice Blades.',
        transform: getSkillTransform(140, skillChoiceModifierDistance),
        active: false
      }]
    }
  }, {
    name: 'Lightning Spear',
    description: 'Conjure a spear of lightning that seeks out enemies for <span class="text-orange-200">6</span> seconds, dealing <span class="text-orange-200">{damage}</span> damage per hit.',
    descriptionValues: {
      damage: '15%,16.5%,18%,19.5%,21%'
    },
    cooldown: '20',
    luckyHitChance: 35,
    type,
    school: 'Shock',
    damageType: 'Lightning',
    icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/conjuration/lightning-spear.png`,
    transform: getSkillTransform(-135, 100),
    rank: 0,
    rankMax: 5,
    modifier: {
      name: 'Enhanced Lightning Spear',
      description: 'After Critically Striking, <span class="text-white">Lightning Spear</span> gains a <span class="text-orange-200">+5%</span> increased stacking Critical Strike Chance for its duration.',
      transform: getSkillTransform(-135, skillModifierDistance),
      active: false,
      choiceModifiers: [{
        name: 'Summoned Lightning Spear',
        description: '<span class="underline>Collecting Crackling</span> Energy increases the damage of your next <span class="text-white">Lightning Spear</span> cast by <span class="text-orange-200">x20%</span>, up to <span class="text-orange-200">x100%</span>.',
        transform: getSkillTransform(-175, skillChoiceModifierDistance),
        active: false
      }, {
        name: 'Invoked Lightning Spear',
        description: '<span class="text-white">Lightning Spear Stuns</span> enemies for <span class="text-orange-200">2</span> seconds when Critically Striking.',
        transform: getSkillTransform(-100, skillChoiceModifierDistance),
        active: false
      }]
    }
  }],
  passives: []
  // passives: [{
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
  //       damage: '4%,8%,12%'
  //     },
  //     icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/passive/elemental-dominance.webp`,
  //     transform: getSkillTransform(-137.5, 215),
  //     rank: 0,
  //     rankMax: 3,
  //     connected: false,
  //     direct: true
  //   }]
  // }]
}))
