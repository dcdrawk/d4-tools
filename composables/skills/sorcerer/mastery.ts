import { ISkillTier } from '@/utils/skills'

const type = 'Mastery'

export const useSorcererMasteryTier = () => useState('sorcererMasteryTier', (): ISkillTier => ({
  name: 'Mastery',
  rankRequired: 16,
  skills: [{
    name: 'Blizzard',
    description: 'Summon a frigid blizzard that deals {damage} damage and continually <span class="underline">Chills</span> enemies for <span class="text-orange-200">18%</span> over <span class="text-orange-200">8</span> seconds.',
    descriptionValues: {
      damage: '120%,132%,144%,156%,168%'
    },
    luckyHitChance: 34,
    costText: 'Mana',
    costValue: '40',
    type,
    school: 'Frost',
    damageType: 'Cold',
    icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/mastery/blizzard.png`,
    transform: getSkillTransform(65, 135),
    rank: 0,
    rankMax: 5,
    modifier: {
      name: 'Enhanced Blizzard',
      description: '<span class="text-white">Blizzard</span> deals <span class="text-orange-200">x25%</span> increased damage to <span class="underline">Frozen</span> enemies.',
      transform: getSkillTransform(67.5, skillModifierDistance),
      active: false,
      choiceModifiers: [{
        name: 'Mage\'s Blizzard',
        description: 'When cast above <span class="text-orange-200">50</span> Mana, <span class="text-white">Blizzard\'s</span> duration is increased by <span class="text-orange-200">4</span> seconds.',
        transform: getSkillTransform(100, skillChoiceModifierDistance),
        active: false
      }, {
        name: 'Wizard\'s Blizzard',
        description: 'While you have an active <span class="text-white">Blizzard</span>, your Core Skills cost <span class="text-orange-200">10%</span> less Mana.',
        transform: getSkillTransform(25, skillChoiceModifierDistance),
        active: false
      }]
    }
  }, {
    name: 'Meteor',
    description: 'Summon a meteor that strikes the target location, dealing <span class="text-orange-200">{damage}</span> damage and Burning the ground for <span class="text-orange-200">{burning damage}</span> damage over <span class="text-orange-200">3</span> seconds.',
    descriptionValues: {
      damage: '50%,55%,60%,65%,70%',
      'burning damage': '35%,38.5%,42%,45.5%,49%'
    },
    luckyHitChance: 41,
    costText: 'Mana',
    costValue: '40',
    type,
    school: 'Pyromancy',
    damageType: 'Fire',
    icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/mastery/meteor.png`,
    transform: getSkillTransform(35, 135),
    rank: 0,
    rankMax: 5,
    modifier: {
      name: 'Enhanced Meteor',
      description: 'If a cast of <span class="text-white">Meteor</span> hits <span class="text-orange-200">3</span> or more enemies, there is a <span class="text-orange-200">30%</span> chance an additional Meteor falls on the same location.',
      transform: getSkillTransform(37.5, skillModifierDistance),
      active: false,
      choiceModifiers: [{
        name: 'Mage\'s Meteor',
        description: '<span class="text-white">Meteor</span> falls <span class="text-orange-200">30%</span> faster.',
        transform: getSkillTransform(-2.5, skillChoiceModifierDistance),
        active: false
      }, {
        name: 'Wizard\'s Meteor',
        description: '<span class="text-white">Meteor’s</span> impact Immobilizes enemies for <span class="text-orange-200">2</span> seconds.',
        transform: getSkillTransform(72.5, skillChoiceModifierDistance),
        active: false
      }]
    }
  }, {
    name: 'Firewall',
    description: 'Create a wall of flames that Burns enemies for <span class="text-orange-200">{damage}</span> damage over <span class="text-orange-200">8</span> seconds.',
    descriptionValues: {
      damage: '160%,176%,192%,208%,224%'
    },
    luckyHitChance: 41,
    costText: 'Mana',
    costValue: '30',
    type,
    school: 'Pyromancy',
    damageType: 'Fire',
    icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/mastery/firewall.png`,
    transform: getSkillTransform(-35, 135),
    rank: 0,
    rankMax: 5,
    modifier: {
      name: 'Enhanced Firewall',
      description: 'Enemies take <span class="text-orange-200">x25%</span> increased Burning damage from you while standing in <span class="text-white">Firewall</span>.',
      transform: getSkillTransform(-37.5, skillModifierDistance),
      active: false,
      choiceModifiers: [{
        name: 'Mage\'s Firewall',
        description: 'Enemies continue Burning for <span class="text-orange-200">3</span> seconds after leaving <span class="text-white">Firewall</span>.',
        transform: getSkillTransform(2.5, skillChoiceModifierDistance),
        active: false
      }, {
        name: 'Wizard\'s Firewall',
        description: 'You gain x5% increased Mana Regeneration per active <span class="text-white">Firewall</span>, up to <span class="text-orange-200">x25%</span>.',
        transform: getSkillTransform(-67.5, skillChoiceModifierDistance),
        active: false
      }]
    }
  }, {
    name: 'Ball Lightning',
    description: 'Discharge a ball of lightning that slowly moves forward, continually zapping enemies for <span class="text-orange-200">{damage}</span> damage.',
    descriptionValues: {
      damage: '18%'
    },
    luckyHitChance: 20,
    costText: 'Mana',
    costValue: '50',
    type,
    school: 'Shock',
    damageType: 'Lightning',
    icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/mastery/ball-lightning.png`,
    transform: getSkillTransform(-67.5, 135),
    rank: 0,
    rankMax: 5,
    modifier: {
      name: 'Enhanced Ball Lightning',
      description: '<span class="text-white">Ball Lightning\'s</span> damage rate is increased by <span class="text-orange-200">200%</span> of your Attack Speed Bonus.',
      transform: getSkillTransform(-65, skillModifierDistance),
      active: false,
      choiceModifiers: [{
        name: 'Mage\'s Ball Lightning',
        description: 'After hitting Close enemies <span class="text-orange-200">50</span> times with <span class="text-white">Ball Lightning</span>, your next cast of it Stuns enemies hit for <span class="text-orange-200">1</span> second.',
        transform: getSkillTransform(-25, skillChoiceModifierDistance),
        active: false
      }, {
        name: 'Wizard\'s Ball Lightning',
        description: 'If an enemy is hit at least <span class="text-orange-200">4</span> times by a cast of <span class="text-white">Ball Lightning</span>, a <span class="underline">Crackling Energy</span> is formed. Can only happen once per cast.',
        transform: getSkillTransform(-100, skillChoiceModifierDistance),
        active: false
      }]
    }
  }],
  passives: [
    {
      name: 'Icy Veil',
      items: [{
        name: 'Icy Veil',
        description: 'Your <span class="underline">Barriers</span> have a <span class="text-orange-200">+{barrier duration}</span> increased duration.',
        descriptionValues: {
          'barrier duration': '5%,10%,15%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/mastery/passive/icy-veil.webp`,
        transform: getSkillTransform(102.5, 130),
        rank: 0,
        rankMax: 3,
        connected: true,
        direct: false,
        path: 'M 250,250 L 250,160 L 222,160 L 222,125',
        requiredFor: [
          { name: 'Cold Front', direction: 'XY' },
          { name: 'Snap Freeze', direction: 'XY' }
        ]
      }, {
        name: 'Cold Front',
        description: 'While you have a <span class="underline">Barrier</span> active, you apply <span class="text-orange-200">x{increased chill}</span> more Chill.',
        descriptionValues: {
          'increased chill': '8%,16%,24%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/mastery/passive/invigorating-conduit.webp`,
        transform: getSkillTransform(90, 180),
        rank: 0,
        rankMax: 3,
        connected: false,
        direct: false
      }, {
        name: 'Snap Freeze',
        description: '<span class="text-orange-100">Lucky Hit:</span> <span class="text-white">Frost</span> Skills have a <span class="text-orange-200">{chance to freeze}</span> chance to instantly <span class="underline">Freeze</span>.',
        descriptionValues: {
          'chance to freeze': '3%,6%,9%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/mastery/passive/snap-freeze.webp`,
        transform: getSkillTransform(107.5, 189),
        rank: 0,
        rankMax: 3,
        connected: false,
        direct: false
      }]
    },
    {
      name: 'Inner Flames',
      items: [{
        name: 'Inner Flames',
        description: 'Your <span class="text-white">Pyromancy</span> Skills deal <span class="text-orange-200">{increased damage}</span> increased damage while you are <span class="underline">Healthy</span>.',
        descriptionValues: {
          'increased damage': '3%,6%,9%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/mastery/passive/inner-flames.webp`,
        transform: getSkillTransform(0, 110),
        rank: 0,
        rankMax: 3,
        connected: true,
        direct: true,
        requiredFor: [
          { name: 'Devouring Blaze' },
          { name: 'Crippling Flames' }
        ]
      }, {
        name: 'Devouring Blaze',
        description: 'You deal <span class="text-orange-200">{critical strike damage}</span> increased Critical Strike Damage against Burning enemies. If they are also Immobilized, this bonus is increased to <span class="text-orange-200">{bonus damage}</span>.',
        descriptionValues: {
          'critical strike damage': '10%,20%,30%',
          'bonus damage': '25%,50%,75%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/mastery/passive/devouring-blaze.webp`,
        transform: getSkillTransform(10, 170),
        rank: 0,
        rankMax: 3,
        connected: false,
        direct: false
      }, {
        name: 'Crippling Flames',
        description: '<span class="text-orange-100">Lucky Hit:</span> Your <span class="text-white">Pyromancy</span> Skills have a <span class="text-orange-200">{immobilize chance}</span> chance to Immobilize enemies for <span class="text-orange-200">2</span> seconds. This chance is doubled while you are <span class="underline">Healthy</span>.',
        descriptionValues: {
          'immobilize chance': '5%,10%,15%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/mastery/passive/crippling-flames.webp`,
        transform: getSkillTransform(-10, 170),
        rank: 0,
        rankMax: 3,
        connected: false,
        direct: false
      }]
    },
    {
      name: 'Static Discharge',
      items: [{
        name: 'Static Discharge',
        description: '<span class="text-orange-100">Lucky Hit:</span> Critical Strikes with Shock Skills have up to a <span class="text-orange-200">{chance to form}</span> chance to form a <span class="underline">Crackling Energy</span>.',
        descriptionValues: {
          'chance to form': '5%,10%,15%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/mastery/passive/static-discharge.webp`,
        transform: getSkillTransform(-102.5, 130),
        rank: 0,
        rankMax: 3,
        connected: true,
        direct: true,
        path: 'M 250,250 L 250,340 L 222,340 L 222,375',
        requiredFor: [
          { name: 'Invigorating Conduit', direction: 'XY' },
          { name: 'Shocking Impact', direction: 'XY' }
        ]
      }, {
        name: 'Invigorating Conduit',
        description: 'Upon absorbing <span class="underline">Crackling Energy</span>, you gain <span class="text-orange-200">{mana gain}</span> Mana.',
        descriptionValues: {
          'mana gain': '4,8,12'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/mastery/passive/invigorating-conduit.webp`,
        transform: getSkillTransform(-90, 180),
        rank: 0,
        rankMax: 3,
        connected: false,
        direct: false
      }, {
        name: 'Shocking Impact',
        description: 'Every time you Stun an enemy, you deal <span class="text-orange-200">{lightning damage}</span> Lightning Damage to them.',
        descriptionValues: {
          'lightning damage': '15%,30%,45%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/mastery/passive/shocking-impact.webp`,
        transform: getSkillTransform(-107.5, 189),
        rank: 0,
        rankMax: 3,
        connected: false,
        direct: false
      }]
    }
  ]
}))
