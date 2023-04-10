import { ISkillItem } from '@/utils/skills'

const type = 'Core'

export const useSorcererCoreSkills = (): Ref<ISkillItem[]> => {
  return useState('sorcererCoreSkills', (): ISkillItem[] => [{
    name: 'Incinerate',
    description: 'Channel a beam of fire, Burning enemies for <span class="text-orange-300">{burning damage}</span> damage per second. Damage per second increases over <span class="text-orange-300">4</span> seconds, up to <span class="text-orange-300">{burning damage maximum}</span>.',
    descriptionValues: {
      'burning damage': '36%,40%,44%,47%,51%',
      'burning damage maximum': '49%,55%,62%,69%,76%'
    },
    type,
    school: 'Pyromancy,Channeled',
    damageType: 'Fire',
    icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/incinerate.png`,
    transform: getSkillTransform(90, 105),
    rank: 0,
    rankMax: 5,
    modifiers: [{
      name: 'Enhanced Incinerate',
      description: 'While channeling <span class="text-white">Incinerate</span> you Burn enemies around you for <span class="text-orange-300">15%</span> of the damage per second.',
      transform: getSkillTransform(90, skillModifierDistance),
      active: false,
      choiceModifiers: [{
        name: 'Destructive Incinerate',
        description: '<span class="text-white">Incinerate</span> grants <span class="text-orange-300">+2%</span> increased Critical Strike Chance per cast for <span class="text-orange-300">3</span> seconds, up to <span class="text-orange-300">+10%.</span>',
        transform: getSkillTransform(125, skillChoiceModifierDistance),
        active: false
      }, {
        name: 'Greater Incinerate',
        description: 'Every 4 seconds an enemy has been hit by <span class="text-white">Incinerate</span> they are Immobilized for <span class="text-orange-300">1</span> second.',
        transform: getSkillTransform(55, skillChoiceModifierDistance),
        active: false
      }]
    }]
  }, {
    name: 'Fireball',
    description: 'Hurl an exploding ball of fire, dealing <span class="text-orange-300">[{damage}]</span> damage to surrounding enemies.',
    descriptionValues: {
      damage: '60%,66%,72%,78%,84%'
    },
    type,
    school: 'Pyromancy',
    damageType: 'Fire',
    icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/fireball.png`,
    transform: getSkillTransform(128, 110),
    rank: 0,
    rankMax: 5,
    modifiers: [{
      name: 'Enhanced Fireball',
      description: '<span class="text-white">Fireball\'s</span> radius is increased based on distance traveled, up to <span class="text-orange-300">50%.</span>',
      transform: getSkillTransform(128, skillModifierDistance),
      active: false,
      choiceModifiers: [{
        name: 'Destructive Fireball',
        description: '<span class="text-white">Fireball\'s</span> explosion\'s Critical Strike Damage is increased by <span class="text-orange-300">+10%.</span> Each enemy it hits increases this bonus by <span class="text-orange-300">+5%</span>, up to <span class="text-orange-300">+25%</span> total.',
        transform: getSkillTransform(90, skillChoiceModifierDistance),
        active: false
      }, {
        name: 'Greater Fireball',
        description: '<span class="text-white">Fireball</span> deals <span class="text-orange-300">10%</span> of the Burning damage you\'ve applied to enemies as additional direct damage.',
        transform: getSkillTransform(175, skillChoiceModifierDistance),
        active: false
      }]
    }]
  }, {
    name: 'Frozen Orb',
    description: 'Unleash an orb that <span class="underline">Chills</span> for <span class="text-orange-300">34%</span> and expels piercing shards, dealing a total of <span class="text-orange-300">{shards damage}</span> damage. Upon expiration, Frozen Orb explodes, dealing <span class="text-orange-300">29%</span> damage and <span class="underline">Chilling</span> enemies for <span class="text-orange-300">{explosion damage}</span>.',
    descriptionValues: {
      'shards damage': '31.7%,34.9%,38%,42.1%,44.4%',
      'explosion damage': '29.2%,32.2%,35.1%,38%,41%'
    },
    type,
    school: 'Frost',
    damageType: 'Cold',
    icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/frozen-orb.png`,
    transform: getSkillTransform(165, 125),
    rank: 0,
    rankMax: 5,
    modifiers: [{
      name: 'Enhanced Frozen Orb',
      description: 'When cast above <span class="text-orange-300">50</span> Mana, <span class="text-white">Frozen Orb\'s</span> explosion damage is increased by <span class="text-orange-300">30%</span>.',
      transform: getSkillTransform(160, skillModifierDistance),
      active: false,
      choiceModifiers: [{
        name: 'Destructive Frozen Orb',
        description: '<span class="text-white">Frozen Orb\'s</span> explosion restores <span class="text-orange-300">5</span> Mana when hitting a Frozen enemy.',
        transform: getSkillTransform(-170, skillChoiceModifierDistance),
        active: false
      }, {
        name: 'Greater Frozen Orb',
        description: '<span class="text-white">Frozen Orb\'s</span> explosion has a <span class="text-orange-300">25%</span> chance to make all enemies hit <span class="underline">Vulnerable</span> for <span class="text-orange-300">2</span> seconds. Frozen Orb always makes <span class="underline">Frozen</span> enemies <span class="underline">Vulnerable</span>.',
        transform: getSkillTransform(110, skillChoiceModifierDistance),
        active: false
      }]
    }]
  }, {
    name: 'Ice Shards',
    description: 'Launch <span class="text-orange-300">5</span> shards that deal <span class="text-orange-300">{damage}</span> damage each. Deals <span class="text-orange-300">25%</span> increased damage to <span class="underline">Frozen</span> enemies.',
    descriptionValues: {
      damage: '25%,27.5%,30%,32.5%,35%'
    },
    type,
    school: 'Frost',
    damageType: 'Cold',
    icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/core/ice-shards.png`,
    transform: getSkillTransform(-165, 125),
    rank: 0,
    rankMax: 5,
    modifiers: [{
      name: 'Enhanced Ice Shards',
      description: '<span class="text-white">Ice Shards</span> have a <span class="text-orange-300">15%</span> chance to ricochet to another enemy. <span class="text-white">Ice Shards</span> always ricochet off of <span class="underline">Frozen</span> enemies.',
      transform: getSkillTransform(-163, skillModifierDistance),
      active: false,
      choiceModifiers: [{
        name: 'Destructive Ice Shards',
        description: 'Hitting a Stunned enemy with <span class="text-white">Ice Shards</span> reduces your Cooldowns by <span class="text-orange-300">0.25</span> seconds.',
        transform: getSkillTransform(-115, skillChoiceModifierDistance),
        active: false
      }, {
        name: 'Greater Ice Shards',
        description: 'While you have a <span class="underline">Barrier</span> active, casts of <span class="text-white">Ice Shards</span> treat enemies as if they were <span class="underline">Frozen</span>.',
        transform: getSkillTransform(168, skillChoiceModifierDistance),
        active: false
      }]
    }]
  }])
}
