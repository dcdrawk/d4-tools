import { ISkillTier } from '@/utils/skills'

const type = 'Defensive'

export const useSorcererDefensiveTier = (): Ref<ISkillTier> => {
  return useState('sorcererDefensiveTier', (): ISkillTier => ({
    name: 'defensive',
    rankRequired: 6,
    skills: [{
      name: 'Flame Shield',
      description: 'Engulf yourself in flames for <span class="text-orange-300">{duration}</span> seconds, Burning surrounding enemies for <span class="text-orange-300">{burning damage}</span> damage per second. While <span class="text-white">Flame Shield<span> is active, you are <span class="underline">Immune</span>.',
      descriptionValues: {
        'burning damage': '23.4%,25.7%,28.1%,30.4%,32.8%',
        duration: '2,2.2,2.4,2.6,2.8'
      },
      cooldown: '20',
      luckyHitChance: 50,
      type,
      school: 'Pyromancy',
      damageType: 'Fire',
      icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/defensive/flame-shield.png`,
      transform: getSkillTransform(90, 105),
      rank: 0,
      rankMax: 5,
      modifier: {
        name: 'Enhanced Flame Shield',
        description: '<span class="text-white">Flame Shield</span> grants <span class="text-orange-300">+25%</span> Movement Speed while active.',
        transform: getSkillTransform(90, skillModifierDistance),
        active: false,
        choiceModifiers: [{
          name: 'Mystical Flame Shield',
          description: 'You gain <span class="text-orange-300">25%</span> Mana Cost Reduction while <span class="text-white">Flame Shield</span> is active.',
          transform: getSkillTransform(125, skillChoiceModifierDistance),
          active: false
        }, {
          name: 'Shimmering Flame Shield',
          description: '<span class="text-white">Flame Shield</span> Heals you for <span class="text-orange-300">50%</span> of your missing Life.',
          transform: getSkillTransform(55, skillChoiceModifierDistance),
          active: false
        }]
      }
    }, {
      name: 'Teleport',
      description: 'Transform into lightning, becoming <span class="underline">Unstoppable</span> and surging to the target location, dealing <span class="text-orange-300">{damage}</span> damage around you upon arrival.',
      descriptionValues: {
        damage: '25%,27.5%,30%,32.5%,35%'
      },
      cooldownValues: '11,10.45,9.9,9.35,8.8',
      luckyHitChance: 40,
      type,
      school: 'Shock',
      damageType: 'Lightning',
      icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/defensive/teleport.png`,
      transform: getSkillTransform(45, 105),
      rank: 0,
      rankMax: 5,
      modifier: {
        name: 'Enhanced Teleport',
        description: 'Teleport\'s Cooldown is decreased by <span class="text-orange-300">0.5</span> seconds per enemy hit, up to <span class="text-orange-300">3</span> seconds.',
        transform: getSkillTransform(45, skillModifierDistance),
        active: false,
        choiceModifiers: [{
          name: 'Mystical',
          description: 'For 4 seconds after <span class="text-white">Teleporting</span>, <span class="underline">Crackling Energy</span> hits <span class="text-orange-300">2</span> additional enemies.',
          transform: getSkillTransform(85, skillChoiceModifierDistance),
          active: false
        }, {
          name: 'Shimmering',
          description: 'After <span class="text-white">Teleporting</span>, you gain <span class="text-orange-300">30%</span> Damage Reduction for <span class="text-orange-300">5</span> seconds.',
          transform: getSkillTransform(0, skillChoiceModifierDistance),
          active: false
        }]
      }
    }, {
      name: 'Ice Armor',
      description: 'A <span class="underline">Barrier</span> of ice forms around you for <span class="text-orange-300">6</span> seconds, absorbing <span class="text-orange-300">{damage}</span> of your Base Life in damage. While <span class="text-white">Ice Armor</span> is active, <span class="text-orange-300">10%</span> of your damage dealt is added to its <span class="underline">Barrier</span>.',
      descriptionValues: {
        damage: '30%,33%,36%,39%,42%'
      },
      cooldown: '20',
      type,
      school: 'Frost',
      damageType: '',
      icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/defensive/ice-armor.png`,
      transform: getSkillTransform(-45, 105),
      rank: 0,
      rankMax: 5,
      modifier: {
        name: 'Enhanced Ice Armor',
        description: 'While <span class="text-white">Ice Armor</span> is active, your Mana Regeneration is increased by <span class="text-orange-300">x25%</span>.',
        transform: getSkillTransform(-45, skillModifierDistance),
        active: false,
        choiceModifiers: [{
          name: 'Mystical Ice Armor',
          description: 'Damage against <span class="underline">Vulnerable</span> enemies contributes <span class="text-orange-300">100%</span> more to <span class="text-white">Ice Armor\'s</span> <span class="underline">Barrier</span>.',
          transform: getSkillTransform(2.5, skillChoiceModifierDistance),
          active: false
        }, {
          name: 'Shimmering Ice Armor',
          description: '',
          transform: getSkillTransform(-75, skillChoiceModifierDistance),
          active: false
        }]
      }
    }, {
      name: 'Frost Nova',
      description: 'Unleash a torrent of frost, <span class="underline">Freezing</span> enemies around you for <span class="text-orange-300">2</span> seconds.',
      cooldownValues: '15,14.25,13.5,12.75,12',
      type,
      school: 'Frost',
      damageType: '',
      icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/defensive/frost-nova.png`,
      transform: getSkillTransform(-90, 105),
      rank: 0,
      rankMax: 5,
      modifier: {
        name: 'Enhanced Frost Nova',
        description: 'Killing enemies <span class="underline">Frozen</span> by <span class="text-white">Frost Nova</span> reduces its Cooldown by <span class="text-orange-300">2<span> seconds, up to <span class="text-orange-300">6</span> seconds per cast.',
        transform: getSkillTransform(-90, skillModifierDistance),
        active: false,
        choiceModifiers: [{
          name: 'Mystical Frost Nova',
          description: '<span class="text-white">Frost Nova</span> makes enemies <span class="underline">Vulnerable</span> for <span class="text-orange-300">4</span> seconds, increased to <span class="text-orange-300">8</span> seconds against Bosses.',
          transform: getSkillTransform(-125, skillChoiceModifierDistance),
          active: false
        }, {
          name: 'Shimmering Frost Nova',
          description: '<span class="text-white">Frost Nova</span> generates <span class="text-orange-300">4</span>1 Mana per enemy hit.',
          transform: getSkillTransform(-55, skillChoiceModifierDistance),
          active: false
        }]
      }
    }],
    passives: [{
      name: 'defensive-elemental',
      items: [{
        name: 'Elemental Attunement',
        description: 'Lucky Hit: Critical Strikes have a {reset chance} chance to reset the Cooldown of one of your Defensive Skills. Can only happen once every 10 seconds.',
        descriptionValues: {
          'reset chance': '5%,10%,15%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/defensive/passive/elemental-attunement.webp`,
        transform: getSkillTransform(180, 115),
        rank: 0,
        rankMax: 3,
        connected: true,
        direct: true
      }]
    }, {
      name: 'defensive-damage',
      items: [{
        name: 'Glass Cannon',
        description: 'You deal {increased damage} increased damage, but take {damage received} more damage.',
        descriptionValues: {
          'increased damage': '6%,12%,18%',
          'damage received': '3%,6%,9%'
        },
        icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/defensive/passive/glass-cannon.webp`,
        transform: getSkillTransform(0, 115),
        rank: 0,
        rankMax: 3,
        connected: true,
        direct: true
      }]
    }]
  }))
}
