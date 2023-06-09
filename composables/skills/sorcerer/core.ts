import { ISkillTier } from '@/utils/skills'

const type = 'Core'

export const useSorcererCoreTier = (): Ref<ISkillTier> => {
  return useState('sorcererCoreTier', (): ISkillTier => ({
    name: 'core',
    rankRequired: 2,
    skills: [{
      name: 'Incinerate',
      description: 'Channel a beam of fire, Burning enemies for <span class="text-orange-200">{burning damage}</span> damage per second. Damage per second increases over <span class="text-orange-200">4</span> seconds, up to <span class="text-orange-200">{burning damage maximum}</span>.',
      descriptionValues: {
        'burning damage': '36%,40%,44%,47%,51%',
        'burning damage maximum': '49%,55%,62%,69%,76%'
      },
      costText: 'Cost',
      costValue: '20 Mana per second',
      luckyHitChance: 40,
      type,
      school: 'Pyromancy,Channeled',
      damageType: 'Fire',
      icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/incinerate.png`,
      transform: getSkillTransform(90, 105),
      rank: 0,
      rankMax: 5,
      modifier: {
        name: 'Enhanced Incinerate',
        description: 'While channeling <span class="text-white">Incinerate</span> you Burn enemies around you for <span class="text-orange-200">15%</span> of the damage per second.',
        transform: getSkillTransform(90, skillModifierDistance),
        active: false,
        choiceModifiers: [{
          name: 'Destructive Incinerate',
          description: '<span class="text-white">Incinerate</span> grants <span class="text-orange-200">+2%</span> increased Critical Strike Chance per cast for <span class="text-orange-200">3</span> seconds, up to <span class="text-orange-200">+10%.</span>',
          transform: getSkillTransform(125, skillChoiceModifierDistance),
          active: false
        }, {
          name: 'Greater Incinerate',
          description: 'Every 4 seconds an enemy has been hit by <span class="text-white">Incinerate</span> they are Immobilized for <span class="text-orange-200">1</span> second.',
          transform: getSkillTransform(55, skillChoiceModifierDistance),
          active: false
        }]
      }
    }, {
      name: 'Fireball',
      description: 'Hurl an exploding ball of fire, dealing <span class="text-orange-200">[{damage}]</span> damage to surrounding enemies.',
      descriptionValues: {
        damage: '60%,66%,72%,78%,84%'
      },
      costText: 'Mana Cost',
      costValue: '40',
      luckyHitChance: 33,
      type,
      school: 'Pyromancy',
      damageType: 'Fire',
      icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/fireball.png`,
      transform: getSkillTransform(128, 110),
      rank: 0,
      rankMax: 5,
      modifier: {
        name: 'Enhanced Fireball',
        description: '<span class="text-white">Fireball\'s</span> radius is increased based on distance traveled, up to <span class="text-orange-200">50%.</span>',
        transform: getSkillTransform(128, skillModifierDistance),
        active: false,
        choiceModifiers: [{
          name: 'Destructive Fireball',
          description: '<span class="text-white">Fireball\'s</span> explosion\'s Critical Strike Damage is increased by <span class="text-orange-200">+10%.</span> Each enemy it hits increases this bonus by <span class="text-orange-200">+5%</span>, up to <span class="text-orange-200">+25%</span> total.',
          transform: getSkillTransform(90, skillChoiceModifierDistance),
          active: false
        }, {
          name: 'Greater Fireball',
          description: '<span class="text-white">Fireball</span> deals <span class="text-orange-200">10%</span> of the Burning damage you\'ve applied to enemies as additional direct damage.',
          transform: getSkillTransform(175, skillChoiceModifierDistance),
          active: false
        }]
      }
    }, {
      name: 'Frozen Orb',
      description: 'Unleash an orb that <span class="underline">Chills</span> for <span class="text-orange-200">34%</span> and expels piercing shards, dealing a total of <span class="text-orange-200">{shards damage}</span> damage. Upon expiration, Frozen Orb explodes, dealing <span class="text-orange-200">29%</span> damage and <span class="underline">Chilling</span> enemies for <span class="text-orange-200">{explosion damage}</span>.',
      descriptionValues: {
        'shards damage': '31.7%,34.9%,38%,42.1%,44.4%',
        'explosion damage': '29.2%,32.2%,35.1%,38%,41%'
      },
      costText: 'Mana Cost',
      costValue: '40',
      luckyHitChance: 20,
      type,
      school: 'Frost',
      damageType: 'Cold',
      icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/frozen-orb.png`,
      transform: getSkillTransform(165, 125),
      rank: 0,
      rankMax: 5,
      modifier: {
        name: 'Enhanced Frozen Orb',
        description: 'When cast above <span class="text-orange-200">50</span> Mana, <span class="text-white">Frozen Orb\'s</span> explosion damage is increased by <span class="text-orange-200">30%</span>.',
        transform: getSkillTransform(160, skillModifierDistance),
        active: false,
        choiceModifiers: [{
          name: 'Destructive Frozen Orb',
          description: '<span class="text-white">Frozen Orb\'s</span> explosion restores <span class="text-orange-200">5</span> Mana when hitting a Frozen enemy.',
          transform: getSkillTransform(-170, skillChoiceModifierDistance),
          active: false
        }, {
          name: 'Greater Frozen Orb',
          description: '<span class="text-white">Frozen Orb\'s</span> explosion has a <span class="text-orange-200">25%</span> chance to make all enemies hit <span class="underline">Vulnerable</span> for <span class="text-orange-200">2</span> seconds. Frozen Orb always makes <span class="underline">Frozen</span> enemies <span class="underline">Vulnerable</span>.',
          transform: getSkillTransform(110, skillChoiceModifierDistance),
          active: false
        }]
      }
    }, {
      name: 'Ice Shards',
      description: 'Launch <span class="text-orange-200">5</span> shards that deal <span class="text-orange-200">{damage}</span> damage each. Deals <span class="text-orange-200">25%</span> increased damage to <span class="underline">Frozen</span> enemies.',
      descriptionValues: {
        damage: '25%,27.5%,30%,32.5%,35%'
      },
      costText: 'Mana Cost',
      costValue: '30',
      luckyHitChance: 25,
      type,
      school: 'Frost',
      damageType: 'Cold',
      icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/ice-shards.png`,
      transform: getSkillTransform(-165, 125),
      rank: 0,
      rankMax: 5,
      modifier: {
        name: 'Enhanced Ice Shards',
        description: '<span class="text-white">Ice Shards</span> have a <span class="text-orange-200">15%</span> chance to ricochet to another enemy. <span class="text-white">Ice Shards</span> always ricochet off of <span class="underline">Frozen</span> enemies.',
        transform: getSkillTransform(-163, skillModifierDistance),
        active: false,
        choiceModifiers: [{
          name: 'Destructive Ice Shards',
          description: 'Hitting a Stunned enemy with <span class="text-white">Ice Shards</span> reduces your Cooldowns by <span class="text-orange-200">0.25</span> seconds.',
          transform: getSkillTransform(-115, skillChoiceModifierDistance),
          active: false
        }, {
          name: 'Greater Ice Shards',
          description: 'While you have a <span class="underline">Barrier</span> active, casts of <span class="text-white">Ice Shards</span> treat enemies as if they were <span class="underline">Frozen</span>.',
          transform: getSkillTransform(168, skillChoiceModifierDistance),
          active: false
        }]
      }
    }, {
      name: 'Chain Lightning',
      description: 'Unleash a stream of lightning that deals <span class="text-orange-200">{damage}</span> damage and chains between Nearby enemies and you up to <span class="text-orange-200">6</span> times, prioritizing enemies.',
      descriptionValues: {
        damage: '42%,46.2%,50.4%,54.6%,58.8%'
      },
      costText: 'Mana Cost',
      costValue: '35',
      luckyHitChance: 25,
      type,
      school: 'Shock',
      damageType: 'Lightning',
      icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/chain-lightning.png`,
      transform: getSkillTransform(-107.5, 125),
      rank: 0,
      rankMax: 5,
      modifier: {
        name: 'Enhanced Chain Lightning',
        description: '<span class="text-white">Chain Lightning</span> gains a <span class="text-orange-200">+3%</span> increased Critical Strike Chance per bounce.',
        transform: getSkillTransform(-115, skillModifierDistance),
        active: false,
        choiceModifiers: [{
          name: 'Destructive Chain Lightning',
          description: 'When <span class="text-white">Chain Lightning</span> Critically Strikes, it has a <span class="text-orange-200">25%</span> chance to form a <span class="underline">Crackling Energy</span>.',
          transform: getSkillTransform(-78, skillChoiceModifierDistance),
          active: false
        }, {
          name: 'Greater Chain Lightning',
          description: 'If <span class="text-white">Chain Lightning</span> bounces off of you, its next hit deals <span class="text-orange-200">25%</span> increased damage.',
          transform: getSkillTransform(-158, skillChoiceModifierDistance),
          active: false
        }]
      }
    }, {
      name: 'Charged Bolts',
      description: 'Release <span class="text-orange-200">5</span> bolts of lightning that course along the ground in an erratic pattern, dealing <span class="text-orange-200">{damage}</span> each.',
      descriptionValues: {
        damage: '17.5%,19.2%,21%,22.7%,24.5'
      },
      costText: 'Mana Cost',
      costValue: '40',
      luckyHitChance: 25,
      type,
      school: 'Shock',
      damageType: 'Lightning',
      icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/charged-bolts.png`,
      transform: getSkillTransform(-77, 120),
      rank: 0,
      rankMax: 5,
      modifier: {
        name: 'Enhanced Charged Bolts',
        description: 'Hitting an enemy at least <span class="text-orange-200">3<span> times with the same cast of <span class="text-white">Charged Bolts</span> releases a lightning nova, dealing <span class="text-orange-200">15%</span> damage to enemies around them.',
        transform: getSkillTransform(-80, skillModifierDistance),
        active: false,
        choiceModifiers: [{
          name: 'Destructive Charged Bolts',
          description: 'Hitting an enemy with <span class="text-white">Charged Bolts</span> reduces their damage dealt by <span class="text-orange-200">20%</span> for <span class="text-orange-200">3</span> seconds.',
          transform: getSkillTransform(-38, skillChoiceModifierDistance),
          active: false
        }, {
          name: 'Greater Charged Bolts',
          description: 'When you Stun an enemy, there\'s a <span class="text-orange-200">40%</span> chance to release <span class="text-orange-200">3</span> <span class="text-white">Charged Bolts</span> from them.',
          transform: getSkillTransform(-117, skillChoiceModifierDistance),
          active: false
        }]
      }
    }],
    passives: [{
      name: 'core-warding',
      items: [{
        name: 'Potent Warding',
        description: 'After casting a Non-<span class="text-white">Basic</span> Skill, you gain <span class="text-orange-200">{resistance}</span> Resistance to all elements and <span class="text-orange-200">{additional resistance}</span> additional Resistance to that Skill\'s element for <span class="text-orange-200">3</span> seconds.',
        descriptionValues: {
          resistance: '2%,4%,6%',
          'additional resistance': '1%,2%,3%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/passive/potent-warding.webp`,
        transform: getSkillTransform(0, 120),
        rank: 0,
        rankMax: 3,
        connected: true,
        direct: true
      }]
    }, {
      name: 'core-elemental',
      items: [{
        name: 'Devastation',
        description: 'Your Maximum Mana is increased by <span class="text-orange-200">{maxMana}</span>',
        descriptionValues: {
          maxMana: '3,6,9'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/passive/devastation.webp`,
        transform: getSkillTransform(-135, 135),
        rank: 0,
        rankMax: 3,
        connected: true,
        direct: true,
        requiredFor: [
          { name: 'Elemental Dominance' }
        ]
      }, {
        name: 'Elemental Dominance',
        description: 'Your<span class="text-white">Core</span> Skills, deal <span class="text-orange-200">{damage}</span>increased damage when cast above <span class="text-orange-200">50</span> Mana',
        descriptionValues: {
          damage: '4%,8%,12%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/passive/elemental-dominance.webp`,
        transform: getSkillTransform(-135, 215),
        rank: 0,
        rankMax: 3,
        connected: false,
        direct: true
      }]
    }]
  }))
}
