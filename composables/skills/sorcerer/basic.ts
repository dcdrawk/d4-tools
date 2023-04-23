import { ISkillTier } from '@/utils/skills'

const type = 'Basic'

export const useSorcererBasicTier = (): Ref<ISkillTier> => {
  return useState('sorcererBasicTier', (): ISkillTier => ({
    name: 'basic',
    rankRequired: 0,
    skills: [{
      name: 'Spark',
      description: 'Launch a bolt of lightning that shocks an enemy <span class="text-orange-200">4</span> times, dealing <span class="text-orange-200">[{damage}]</span> damage each hit.',
      descriptionValues: {
        damage: '8%,8.8%,9.6%,10.4%,11.2%'
      },
      luckyHitChance: 9,
      type,
      school: 'Shock',
      damageType: 'Lightning',
      icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/basic/spark.png`,
      transform: getSkillTransform(165, skillItemDistance),
      rank: 0,
      rankMax: 5,
      modifier: {
        name: 'Enhanced Spark',
        description: 'Each time <span class="text-white">Spark</span> hits its primary target, it has a <span class="text-orange-200">20%</span> chance to hit up to 3 additional enemies, dealing <span class="text-orange-200">6%</span> damage. If there are no other enemies to hit, Spark instead deals <span class="text-orange-200">x20%</span> increased damage to its primary target.',
        transform: getSkillTransform(140, skillModifierDistance),
        active: false,
        choiceModifiers: [{
          name: 'Glinting Spark',
          description: '<span class="text-white">Spark</span> grants <span class="text-orange-200">+2%</span> increased Critical Strike Chance per cast for <span class="text-orange-200">3</span> seconds, up to <span class="text-orange-200">+10%.</span>',
          transform: getSkillTransform(175, skillChoiceModifierDistance),
          active: false
        }, {
          name: 'Flickering Spark',
          description: 'Each time <span class="text-white">Spark</span> hits an enemy it has a <span class="text-orange-200">3%</span> chance to form a <span class="underline">Crackling Energy</span>.',
          transform: getSkillTransform(95, skillChoiceModifierDistance),
          active: false
        }]
      }
    }, {
      name: 'Frost Bolt',
      description: 'Throw a bolt of frost at an enemy, dealing <span class="text-orange-200">[{damage}]</span> damage and <span class="underline">Chilling</span> them for <span class="text-orange-200">15%.</span>',
      descriptionValues: {
        damage: '35%,38.5%,42%,45.5%,49%'
      },
      luckyHitChance: 30,
      type,
      school: 'Frost',
      damageType: 'Cold',
      icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/basic/frost-bolt.png`,
      transform: getSkillTransform(115, skillItemDistance),
      rank: 0,
      rankMax: 5,
      modifier: {
        name: 'Enhanced Frost Bolt',
        description: '<span class="text-white">Frost Bolt</span> has a <span class="text-orange-200">15%</span> chance to explode on <span class="underline">Chilled</span> enemies, hitting surrounding enemies. Chance increased to <span class="text-orange-200">100%</span> against <span class="underline">Frozen</span> enemies.',
        transform: getSkillTransform(114, skillModifierDistance),
        active: false,
        choiceModifiers: [{
          name: 'Glinting Frost Bolt',
          description: '<span class="text-white">Frost Bolt</span> makes <span class="underline">Frozen</span> enemies <span class="underline">Vulnerable</span> for <span class="text-orange-200">3</span> seconds.',
          transform: getSkillTransform(165, skillChoiceModifierDistance),
          active: false
        }, {
          name: 'Flickering Frost Bolt',
          description: '<span class="text-white">Frost Bolt</span> makes <span class="underline">Frozen</span> enemies <span class="underline">Vulnerable</span> for <span class="text-orange-200">3</span> seconds.',
          transform: getSkillTransform(75, skillChoiceModifierDistance),
          active: false
        }]
      }
    }, {
      name: 'Fire Bolt',
      description: 'Hurl a flaming bolt, dealing <span class="text-orange-200">[{damage}]</span> damage and Burning for <span class="text-orange-200">[{burning damage}]</span>',
      descriptionValues: {
        damage: '10%,11%,12%,13%,14%',
        'burning damage': '40%,44%,48%,52%,56%'
      },
      luckyHitChance: 20,
      type,
      school: 'Pyromancy',
      damageType: 'Fire',
      icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/basic/fire-bolt.png`,
      transform: getSkillTransform(65, skillItemDistance),
      rank: 0,
      rankMax: 5,
      modifier: {
        name: 'Enhanced Fire Bolt',
        description: '<span class="text-white">Fire Bolt</span> pierces through Burning enemies.',
        transform: getSkillTransform(69, skillModifierDistance),
        active: false,
        choiceModifiers: [{
          name: 'Glinting Fire Bolt',
          description: 'Critical Strikes with <span class="text-white">Fire Bolt</span> increase the Burning damage you deal to the enemy by <span class="text-orange-200">x20%</span> for <span class="text-orange-200">4</span> seconds.',
          transform: getSkillTransform(110, skillChoiceModifierDistance),
          active: false
        }, {
          name: 'Flickering Fire Bolt',
          description: '<span class="text-white">Fire Bolt</span> generates <span class="text-orange-200">2</span> Mana when hitting a Burning enemy.',
          transform: getSkillTransform(15, skillChoiceModifierDistance),
          active: false
        }]
      }
    }, {
      name: 'Arc Lash',
      description: 'Unleash arcing lightning that deals <span class="text-orange-200">[{damage}]</span> damage to enemies in front of you. Every <span class="text-orange-200">10</span> times <span class="text-white">Arc Lash</span> swipes, it Stuns all enemies hit for <span class="text-orange-200">2</span> seconds.',
      descriptionValues: {
        damage: '42%,46.2%,50.4%,54.6%,58.8%'
      },
      luckyHitChance: 30,
      type,
      school: 'Shock',
      damageType: 'Lightning',
      icon: `${useRuntimeConfig().app.baseURL}img/skills/sorcerer/basic/arc-lash.png`,
      transform: getSkillTransform(15, skillItemDistance),
      rank: 0,
      rankMax: 5,
      modifier: {
        name: 'Enhanced Arc Lash',
        description: 'If <span class="text-white">Arc Lash</span>’s initial swipe Critically Strikes, it swipes an additional time.',
        transform: getSkillTransform(40, skillModifierDistance),
        active: false,
        choiceModifiers: [{
          name: 'Glinting Arc Lash',
          description: 'Hitting a Stunned enemy with <span class="text-white">Arc Lash</span> reduces your Cooldowns by <span class="text-orange-200">0.25</span> seconds.',
          transform: getSkillTransform(85, skillChoiceModifierDistance),
          active: false
        }, {
          name: 'Flickering Arc Lash',
          description: 'Gain <span class="text-orange-200">+6%</span> Movement Speed for <span class="text-orange-200">5</span> seconds per enemy hit with <span class="text-white">Arc Lash</span>, up to <span class="text-orange-200">+18%</span>.',
          transform: getSkillTransform(5, skillChoiceModifierDistance),
          active: false
        }]
      }
    }],
    passives: []
  }))
}
