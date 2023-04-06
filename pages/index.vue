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

    <SkillTooltip
      v-if="tooltip.visible || tooltip.name === 'Enhanced Spark'"
      :name="tooltip.name"
      :active="tooltip.active"
      :rank="tooltip.rank"
      :rank-max="tooltip.rankMax"
      :description="tooltip.description"
      :description-values="tooltip.descriptionValues"
      :icon="tooltip.icon"
      :type="tooltip.type"
      :school="tooltip.school"
      :damage-type="tooltip.damageType"
      :modifiers="tooltip.modifiers"
      :category="tooltip.category"
      :translate-x="tooltip.x"
      :translate-y="tooltip.y"
    />

    <SkillTier
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
        @mouseleave="tooltip.visible = false"
        @mouseout="tooltip.visible = false"
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
          @mouseleave="tooltip.visible = false"
          @mouseout="tooltip.visible = false"
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
            @mouseleave="tooltip.visible = false"
            @mouseout="tooltip.visible = false"
          />
        </SkillItemModifier>
      </SkillItem>
    </SkillTier>
  </div>
</template>

<script setup lang="ts">
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
  type,
  school: 'Shock',
  damageType: 'Lightning',
  description: 'Launch a bolt of lightning that shocks an enemy <span class="text-orange-300">4</span> times, dealing <span class="text-orange-300">[{damage}%]</span> damage each hit.',
  descriptionValues: {
    damage: '8,8.8,9.6,10.4,11.2'
  },
  icon: '/img/skills/sorcerer/basic/spark.png',
  transform: getSkillTransform(165, radiusSkill),
  rank: 0,
  rankMax: 5,
  modifiers: [{
    name: 'Enhanced Spark',
    description: 'Each time Spark hits its primary target, it has a <span class="text-orange-300">20%</span> chance to hit up to 3 additional enemies, dealing <span class="text-orange-300">6%</span> damage. If there are no other enemies to hit, Spark instead deals <span class="text-orange-300">x20%</span> increased damage to its primary target.',
    transform: getSkillTransform(140, radiusModifier),
    active: false,
    choiceModifiers: [{
      name: 'Glinting Spark',
      description: 'Spark grants <span class="text-orange-300">+2%</span> increased Critical Strike Chance per cast for <span class="text-orange-300">3</span> seconds, up to <span class="text-orange-300">+10%.</span>',
      transform: getSkillTransform(175, radiusChoiceModifier),
      active: false
    }, {
      name: 'Flickering Spark',
      description: 'Each time Spark hits an enemy it has a <span class="text-orange-300">3%</span> chance to form a <span class="underline">Crackling Energy</span>.',
      transform: getSkillTransform(95, radiusChoiceModifier),
      active: false
    }]
  }]
}, {
  name: 'Frost Bolt',
  type,
  school: 'Frost',
  damageType: 'Cold',
  icon: '/img/skills/sorcerer/basic/frost-bolt.png',
  transform: getSkillTransform(115, radiusSkill),
  rank: 0,
  rankMax: 5,
  modifiers: [{
    name: 'enhanced-frost-bolt',
    transform: getSkillTransform(114, radiusModifier),
    active: false,
    choiceModifiers: [{
      name: 'glinting-frost-bolt',
      transform: getSkillTransform(165, radiusChoiceModifier),
      active: false
    }, {
      name: 'flickering-frost-bolt',
      transform: getSkillTransform(75, radiusChoiceModifier),
      active: false
    }]
  }]
}, {
  name: 'Fire Bolt',
  type,
  school: 'Pyromancy',
  damageType: 'Fire',
  icon: '/img/skills/sorcerer/basic/fire-bolt.png',
  transform: getSkillTransform(65, radiusSkill),
  rank: 0,
  rankMax: 5,
  modifiers: [{
    name: 'enhanced-fire-bolt',
    transform: getSkillTransform(69, radiusModifier),
    active: false,
    choiceModifiers: [{
      name: 'glinting-fire-bolt',
      transform: getSkillTransform(110, radiusChoiceModifier),
      active: false
    }, {
      name: 'flickering-fire-bolt',
      transform: getSkillTransform(15, radiusChoiceModifier),
      active: false
    }]
  }]
}, {
  name: 'Arc Lash',
  type,
  school: 'Shock',
  damageType: 'Lightning',
  icon: '/img/skills/sorcerer/basic/arc-lash.png',
  transform: getSkillTransform(15, radiusSkill),
  rank: 0,
  rankMax: 5,
  modifiers: [{
    name: 'enhanced-arc-lash',
    description: '',
    transform: getSkillTransform(40, radiusModifier),
    active: false,
    choiceModifiers: [{
      name: 'glinting-arc-lash',
      transform: getSkillTransform(85, radiusChoiceModifier),
      active: false
    }, {
      name: 'flickering-arc-lash',
      transform: getSkillTransform(5, radiusChoiceModifier),
      active: false
    }]
  }]
}])

function handleSkillClick (skill: any) {
  if (skill.rank < skill.rankMax) {
    skill.rank++
    tooltip.rank = skill.rank
  }
}

function handleSkillRightClick (skill: any) {
  if (skill.rank <= 0) return

  if (skill.rank === 1 && hasActiveModifiers(skill)) return

  skill.rank--

  tooltip.rank = skill.rank
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

  tooltip.active = true
  modifier.active = true
}

function handleModifierRightClick (modifier: any) {
  if (modifier.choiceModifiers && hasChoiceModifierSelected(modifier)) return

  tooltip.active = false
  modifier.active = false
}

const tooltip = reactive({
  visible: false,
  active: false,
  name: '',
  category: '',
  description: '',
  descriptionValues: {},
  icon: '',
  rank: 0,
  rankMax: 0,
  type,
  school: '',
  damageType: '',
  modifiers: [],
  x: 0,
  y: 0
})

function handleSkillMouseOver (skill: any) {
  if (tooltip.visible === true) return

  const ref = skillRefs.value[skill.name]
  const refBox = ref.$el.getBoundingClientRect()

  tooltip.name = skill.name
  tooltip.active = false
  tooltip.rank = skill.rank
  tooltip.rankMax = skill.rankMax
  tooltip.school = skill.school
  tooltip.damageType = skill.damageType
  tooltip.description = skill.description
  tooltip.descriptionValues = skill.descriptionValues
  tooltip.modifiers = skill.modifiers
  tooltip.icon = skill.icon
  tooltip.category = 'skill'

  const offset = 20

  tooltip.x = refBox.left + offset
  tooltip.y = refBox.top + offset
  tooltip.visible = true
}

function handleModifierMouseOver (modifier: any, icon: string, choiceModifier = false) {
  if (tooltip.visible === true) return

  tooltip.name = modifier.name
  tooltip.rank = 0
  tooltip.rankMax = 0
  tooltip.school = ''
  tooltip.damageType = ''
  tooltip.active = modifier.active
  tooltip.description = modifier.description
  tooltip.descriptionValues = {}
  tooltip.modifiers = []
  tooltip.icon = icon
  tooltip.category = choiceModifier ? 'choice-modifier' : 'modifier'

  const ref = skillModifierRefs.value[modifier.name]
  const refBox = ref.$el.getBoundingClientRect()
  const offset = 20

  tooltip.x = refBox.left + offset
  tooltip.y = refBox.top + offset
  tooltip.visible = true
}
</script>
