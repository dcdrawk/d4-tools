<template>
  <div class="relative">
    <BaseSVG
      :width="500"
      :height="500"
      class="absolute top-0 left-0"
    >
      <g
        v-for="skill in skills"
        :key="skill.name"
      >
        <SkillLine
          :active="skill.rank > 0"
          :el1="skillTier?.$el"
          :el2="skillRefs[skill.name]?.$el"
        />

        <g
          v-for="modifier in skill.modifiers"
          :key="modifier.name"
        >
          <SkillLine
            :active="modifier.active"
            :el1="skillRefs[skill.name]?.$el"
            :el2="skillModifierRefs[modifier.name]?.$el"
          />
          <SkillLine
            v-for="choiceModifier in modifier.choiceModifiers"
            :key="choiceModifier.name"
            :active="choiceModifier.active"
            :el1="skillModifierRefs[modifier.name]?.$el"
            :el2="skillModifierRefs[choiceModifier.name]?.$el"
          />
        </g>
      </g>
    </BaseSVG>

    <SkillTierNode
      ref="skillTier"
      class="translate-x-[230px] translate-y-[230px]"
    >
      <SkillItem
        v-for="(skill) in skills"
        :key="skill.name"
        :ref="el => { skillRefs[skill.name] = el }"
        class="absolute top-[12.5px] left-[12px]"
        :style="{ transform: skill.transform }"
        :name="skill.name"
        :description="skill.description"
        :active="skill.rank > 0"
        :icon="skill.icon"
        :rank="skill.rank"
        :rank-max="skill.rankMax"
        @click="handleSkillClick(skill)"
        @right-click="handleSkillRightClick(skill)"
        @mouseover="handleSkillMouseOver(skill)"
        @mouseleave="tooltipStore.visible = false"
        @mouseout="tooltipStore.visible = false"
      >
        <SkillItemModifier
          v-for="modifier in skill.modifiers"
          :key="modifier.name"
          :ref="el => { skillModifierRefs[modifier.name] = el }"
          :icon="skill.icon"
          class="absolute top-[10px] left-[10px]"
          :style="{ transform: modifier.transform }"
          :active="modifier.active"
          @click="handleModifierClick(skill, modifier)"
          @right-click="handleModifierRightClick(modifier)"
          @mouseover="handleModifierMouseOver(modifier, skill.icon)"
          @mouseleave="tooltipStore.visible = false"
          @mouseout="tooltipStore.visible = false"
        >
          <SkillItemModifier
            v-for="choiceModifier in modifier.choiceModifiers"
            :key="choiceModifier.name"
            :ref="el => { skillModifierRefs[choiceModifier.name] = el }"
            :icon="skill.icon"
            class="absolute top-0 left-0"
            :style="{ transform: choiceModifier.transform }"
            :active="choiceModifier.active"
            @click="handleModifierClick(modifier, choiceModifier)"
            @right-click="handleModifierRightClick(choiceModifier)"
            @mouseover="handleModifierMouseOver(choiceModifier, skill.icon, true)"
            @mouseleave="tooltipStore.visible = false"
            @mouseout="tooltipStore.visible = false"
          />
        </SkillItemModifier>
      </SkillItem>
    </SkillTierNode>
  </div>
</template>

<script setup lang="ts">
import { useTooltipStore } from '@/store/tooltip'

const skillTier = ref()
const skillRefs = ref<any>({})
const skillModifierRefs = ref<any>({})

function getSkillPosition (degrees: number, radius: number) {
  const radians = (360 - degrees) * (Math.PI / 180)
  const x = radius * Math.cos(radians)
  const y = radius * Math.sin(radians)

  return { x, y }
}

function getSkillTransform (degrees: number, radius: number) {
  const { x, y } = getSkillPosition(degrees, radius)

  return `translate(${x}px, ${y}px)`
}

const radiusSkill = 95
const radiusModifier = 70
const radiusChoiceModifier = 50
const type = 'Basic'

const skills = reactive([{
  name: 'Spark',
  description: 'Launch a bolt of lightning that shocks an enemy <span class="text-orange-300">4</span> times, dealing <span class="text-orange-300">[{damage}]</span> damage each hit.',
  descriptionValues: {
    damage: '8%,8.8%,9.6%,10.4%,11.2%'
  },
  type,
  school: 'Shock',
  damageType: 'Lightning',
  icon: '/img/skills/sorcerer/basic/spark.png',
  transform: getSkillTransform(165, radiusSkill),
  rank: 0,
  rankMax: 5,
  modifiers: [{
    name: 'Enhanced Spark',
    description: 'Each time <span class="text-white">Spark</span> hits its primary target, it has a <span class="text-orange-300">20%</span> chance to hit up to 3 additional enemies, dealing <span class="text-orange-300">6%</span> damage. If there are no other enemies to hit, Spark instead deals <span class="text-orange-300">x20%</span> increased damage to its primary target.',
    transform: getSkillTransform(140, radiusModifier),
    active: false,
    choiceModifiers: [{
      name: 'Glinting Spark',
      description: '<span class="text-white">Spark</span> grants <span class="text-orange-300">+2%</span> increased Critical Strike Chance per cast for <span class="text-orange-300">3</span> seconds, up to <span class="text-orange-300">+10%.</span>',
      transform: getSkillTransform(175, radiusChoiceModifier),
      active: false
    }, {
      name: 'Flickering Spark',
      description: 'Each time <span class="text-white">Spark</span> hits an enemy it has a <span class="text-orange-300">3%</span> chance to form a <span class="underline">Crackling Energy</span>.',
      transform: getSkillTransform(95, radiusChoiceModifier),
      active: false
    }]
  }]
}, {
  name: 'Frost Bolt',
  description: 'Throw a bolt of frost at an enemy, dealing <span class="text-orange-300">[{damage}]</span> damage and <span class="underline">Chilling</span> them for <span class="text-orange-300">15%.</span>',
  descriptionValues: {
    damage: '35%,38.5%,42%,45.5%,49%'
  },
  type,
  school: 'Frost',
  damageType: 'Cold',
  icon: '/img/skills/sorcerer/basic/frost-bolt.png',
  transform: getSkillTransform(115, radiusSkill),
  rank: 0,
  rankMax: 5,
  modifiers: [{
    name: 'Enhanced Frost Bolt',
    description: '<span class="text-white">Frost Bolt</span> has a <span class="text-orange-300">15%</span> chance to explode on <span class="underline">Chilled</span> enemies, hitting surrounding enemies. Chance increased to <span class="text-orange-300">100%</span> against <span class="underline">Frozen</span> enemies.',
    transform: getSkillTransform(114, radiusModifier),
    active: false,
    choiceModifiers: [{
      name: 'Glinting Frost Bolt',
      description: '<span class="text-white">Frost Bolt</span> makes <span class="underline">Frozen</span> enemies <span class="underline">Vulnerable</span> for <span class="text-orange-300">3</span> seconds.',
      transform: getSkillTransform(165, radiusChoiceModifier),
      active: false
    }, {
      name: 'Flickering Frost Bolt',
      description: '<span class="text-white">Frost Bolt</span> makes <span class="underline">Frozen</span> enemies <span class="underline">Vulnerable</span> for <span class="text-orange-300">3</span> seconds.',
      transform: getSkillTransform(75, radiusChoiceModifier),
      active: false
    }]
  }]
}, {
  name: 'Fire Bolt',
  description: 'Hurl a flaming bolt, dealing <span class="text-orange-300">[{damage}]</span> damage and Burning for <span class="text-orange-300">[{burning damage}]</span>',
  descriptionValues: {
    damage: '10%,11%,12%,13%,14%',
    'burning damage': '40%,44%,48%,52%,56%'
  },
  type,
  school: 'Pyromancy',
  damageType: 'Fire',
  icon: '/img/skills/sorcerer/basic/fire-bolt.png',
  transform: getSkillTransform(65, radiusSkill),
  rank: 0,
  rankMax: 5,
  modifiers: [{
    name: 'Enhanced Fire Bolt',
    description: '<span class="text-white">Fire Bolt</span> pierces through Burning enemies.',
    transform: getSkillTransform(69, radiusModifier),
    active: false,
    choiceModifiers: [{
      name: 'Glinting Fire Bolt',
      description: 'Critical Strikes with <span class="text-white">Fire Bolt</span> increase the Burning damage you deal to the enemy by <span class="text-orange-300">x20%</span> for <span class="text-orange-300">4</span> seconds.',
      transform: getSkillTransform(110, radiusChoiceModifier),
      active: false
    }, {
      name: 'Flickering Fire Bolt',
      description: '<span class="text-white">Fire Bolt</span> generates <span class="text-orange-300">2</span> Mana when hitting a Burning enemy.',
      transform: getSkillTransform(15, radiusChoiceModifier),
      active: false
    }]
  }]
}, {
  name: 'Arc Lash',
  description: 'Unleash arcing lightning that deals <span class="text-orange-300">[{damage}]</span> damage to enemies in front of you. Every <span class="text-orange-300">10</span> times Arc Lash swipes, it Stuns all enemies hit for <span class="text-orange-300">2</span> seconds.',
  descriptionValues: {
    damage: '42%,46.2%,50.4%,54.6%,58.8%'
  },
  type,
  school: 'Shock',
  damageType: 'Lightning',
  icon: '/img/skills/sorcerer/basic/arc-lash.png',
  transform: getSkillTransform(15, radiusSkill),
  rank: 0,
  rankMax: 5,
  modifiers: [{
    name: 'enhanced-arc-lash',
    description: 'If <span class="text-white">Arc Lash</span>’s initial swipe Critically Strikes, it swipes an additional time.',
    transform: getSkillTransform(40, radiusModifier),
    active: false,
    choiceModifiers: [{
      name: 'Glinting Arc Lash',
      description: 'Hitting a Stunned enemy with <span class="text-white">Arc Lash</span> reduces your Cooldowns by <span class="text-orange-300">0.25</span> seconds.',
      transform: getSkillTransform(85, radiusChoiceModifier),
      active: false
    }, {
      name: 'Flickering Arc Lash',
      description: 'Gain <span class="text-orange-300">+6%</span> Movement Speed for <span class="text-orange-300">5</span> seconds per enemy hit with <span class="text-white">Arc Lash</span>, up to <span class="text-orange-300">+18%</span>.',
      transform: getSkillTransform(5, radiusChoiceModifier),
      active: false
    }]
  }]
}])

const tooltipStore = useTooltipStore()

function handleSkillClick (skill: any) {
  if (skill.rank < skill.rankMax) {
    skill.rank++
    tooltipStore.rank++
  }
}

function handleSkillRightClick (skill: any) {
  if (skill.rank <= 0) return

  if (skill.rank === 1 && hasActiveModifiers(skill)) return

  skill.rank--
  tooltipStore.rank--
}

function hasActiveModifiers (skill: any) {
  return !!skill.modifiers.find((modifier: any) => modifier.active)
}

function hasChoiceModifierSelected (modifier: any) {
  return !!modifier.choiceModifiers?.find((modifier: any) => modifier.active)
}

function handleModifierClick (parent: any, modifier: any) {
  if (parent.rank === 0) return
  if (modifier.active) return
  if ((parent.choiceModifiers && !parent.active)) return
  if (parent.choiceModifiers && hasChoiceModifierSelected(parent)) return

  tooltipStore.active = true
  modifier.active = true
}

function handleModifierRightClick (modifier: any) {
  if (modifier.choiceModifiers && hasChoiceModifierSelected(modifier)) return

  tooltipStore.active = false
  modifier.active = false
}

function handleSkillMouseOver (skill: any) {
  if (tooltipStore.visible === true) return

  const el = skillRefs.value[skill.name].$el

  tooltipStore.setSkill(skill, el)
}

function handleModifierMouseOver (modifier: any, icon: string, choiceModifier = false) {
  if (tooltipStore.visible === true) return

  const el = skillModifierRefs.value[modifier.name].$el

  tooltipStore.setModifier(modifier, el, icon, choiceModifier)
}
</script>
