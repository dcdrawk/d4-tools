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
    {
      name: 'Permafrost',
      items: [{
        name: 'Permafrost',
        description: '<span class="text-white">Frost</span> Skills deal <span class="text-orange-200">x{increased damage}</span> increased damage to Elites.',
        descriptionValues: {
          'increased damage': '5%,10%,15%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/ultimate/passive/permafrost.webp`,
        transform: getSkillTransform(90, 100),
        rank: 0,
        rankMax: 3,
        connected: true,
        direct: true,
        requiredFor: [
          { name: 'Icy Touch' },
          { name: 'Hoarfrost' }
        ]
      }, {
        name: 'Icy Touch',
        description: 'You deal <span class="text-orange-200">x{increased damage}</span> increased Cold Damage to <span class="underline">Vulnerable</span> enemies.',
        descriptionValues: {
          'increased damage': '4%,8%,12%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/ultimate/passive/icy-touch.webp`,
        transform: getSkillTransform(76, 150),
        rank: 0,
        rankMax: 3,
        connected: false,
        direct: true,
        requiredFor: [
          { name: 'Frigid Breeze' }
        ]
      }, {
        name: 'Hoarfrost',
        description: 'You deal <span class="text-orange-200">x{increased damage to chilled}</span> increased damage to <span class="underline">Chilled</span> enemies, and <span class="text-orange-200">x{increased damage to frozen}</span> increased damage to <span class="underline">Frozen</span> enemies.',
        descriptionValues: {
          'increased damage to chilled': '3%,6%,9%',
          'increased damage to frozen': '6%,12%,18%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/ultimate/passive/hoarfrost.webp`,
        transform: getSkillTransform(104, 150),
        rank: 0,
        rankMax: 3,
        connected: false,
        direct: true,
        requiredFor: [
          { name: 'Frigid Breeze' }
        ]
      }, {
        name: 'Frigid Breeze',
        description: '<span class="text-yellow-200">Lucky Hit:</span> Cold Damage against <span class="underline">Vulnerable</span> enemies has a <span class="text-orange-200">20%</span> chance to generate <span class="text-orange-200">{mana}</span> Mana.',
        descriptionValues: {
          mana: '5,10,15'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/ultimate/passive/frigid-breeze.webp`,
        transform: getSkillTransform(90, 205),
        rank: 0,
        rankMax: 3,
        connected: false,
        direct: false
      }]
    },

    {
      name: 'Fiery Surge',
      items: [{
        name: 'Fiery Surge',
        description: 'Killing a Burning enemy increases your Mana Regeneration by <span class="text-orange-200">+{mana regeneration}</span> for <span class="text-orange-200">3</span> seconds.',
        descriptionValues: {
          'mana regeneration': '10%,20%,30%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/ultimate/passive/fiery-surge.webp`,
        transform: getSkillTransform(-160, 105),
        rank: 0,
        rankMax: 3,
        connected: true,
        direct: true,
        requiredFor: [
          { name: 'Soulfire' },
          { name: 'Endless Pyre' }
        ]
      }, {
        name: 'Soulfire',
        description: 'After standing still for <span class="text-orange-200">1.5</span> seconds, your <span class="text-white">Pyromancy</span> Skills cost <span class="text-orange-200">{mana cost reduction}</span> less Mana.',
        descriptionValues: {
          'mana cost reduction': '5%,10%,15%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/ultimate/passive/soulfire.webp`,
        transform: getSkillTransform(180, 160),
        rank: 0,
        rankMax: 3,
        connected: false,
        direct: true,
        requiredFor: [
          { name: 'Warmth', direction: 'XY' }
        ]
      }, {
        name: 'Endless Pyre',
        description: 'You deal increased Burning damage to enemies for each second they remain Burning, up to <span class="text-orange-200">x{increased burning damage}</span> after <span class="text-orange-200">5</span> seconds.',
        descriptionValues: {
          'increased burning damage': '5%,10%,15%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/ultimate/passive/endless-pyre.webp`,
        transform: getSkillTransform(-155, 177.5),
        rank: 0,
        rankMax: 3,
        connected: false,
        direct: true,
        requiredFor: [
          { name: 'Warmth', direction: 'XY' }
        ]
      }, {
        name: 'Warmth',
        description: 'Every <span class="text-orange-200">1</span> second, you Heal for <span class="text-orange-200">{heal amount}</span> of your Maximum Life for each Nearby Burning enemy. Healing increased to <span class="text-orange-200">{boss heal amount}</span> from Bosses.',
        descriptionValues: {
          'heal amount': '0.3%,0.6%,0.9%',
          'boss heal amount': '0.6%,1.2%,1.8%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/ultimate/passive/warmth.webp`,
        transform: getSkillTransform(-170, 220),
        rank: 0,
        rankMax: 3,
        connected: false,
        direct: false
      }]
    },

    {
      name: 'Coursing Currents',
      items: [{
        name: 'Coursing Currents',
        description: 'Hitting enemies with <span class="text-white">Shock</span> Skills increases your Critical Strike Chance by <span class="text-orange-200">+{increased critical chance}</span>. Resets upon getting a Critical Strike.',
        descriptionValues: {
          'increased critical chance': '1%,2%,3%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/ultimate/passive/coursing-currents.webp`,
        transform: getSkillTransform(-90, 100),
        rank: 0,
        rankMax: 3,
        connected: true,
        direct: true,
        requiredFor: [
          { name: 'Conduction' },
          { name: 'Electrocution' }
        ]
      }, {
        name: 'Conduction',
        description: 'Critical Strikes with <span class="text-white">Shock</span> Skills increase your Movement Speed by <span class="text-orange-200">+{movement speed}</span> for <span class="text-orange-200">3</span> seconds.',
        descriptionValues: {
          'movement speed': '3%,6%,9%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/ultimate/passive/conduction.webp`,
        transform: getSkillTransform(-76, 150),
        rank: 0,
        rankMax: 3,
        connected: false,
        direct: true,
        requiredFor: [
          { name: 'Convulsions' }
        ]
      }, {
        name: 'Electrocution',
        description: 'Enemies deal <span class="text-orange-200">{decreased damage}</span> less damage for <span class="text-orange-200">5</span> seconds after being Critically Struck by your <span class="text-white">Shock</span> Skills.',
        descriptionValues: {
          'decreased damage': '5%,10%,15%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/ultimate/passive/electrocution.webp`,
        transform: getSkillTransform(-104, 150),
        rank: 0,
        rankMax: 3,
        connected: false,
        direct: true,
        requiredFor: [
          { name: 'Convulsions' }
        ]
      }, {
        name: 'Convulsions',
        description: '<span class="text-yellow-200">Lucky Hit:</span> <span class="text-white">Shock</span> Skills have a <span class="text-orange-200">{chance to stun}</span> chance to Stun enemies for <span class="text-orange-200">3</span> seconds.',
        descriptionValues: {
          'chance to stun': '3%,6%,9%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/ultimate/passive/convulsions.webp`,
        transform: getSkillTransform(-90, 205),
        rank: 0,
        rankMax: 3,
        connected: false,
        direct: false
      }]
    }
  ]
}))
