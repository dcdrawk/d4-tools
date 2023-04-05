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
      v-if="tooltip.visible"
      :name="tooltip.name"
      :rank="tooltip.rank"
      :description="tooltip.description"
      :icon="tooltip.icon"
      :type="tooltip.type"
      :school="tooltip.school"
      :damage-type="tooltip.damageType"
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
        <SkillItemUpgrade
          v-for="modifier in skill.modifiers"
          :key="modifier.name"
          :ref="el => { skillModifierRefs[modifier.name] = el }"
          :icon="skill.icon"
          class="absolute top-[10px] left-[10px]"
          :style="{ transform: modifier.transform }"
          :active="modifier.active"
          @click="handleModifierClick(skill, modifier)"
          @right-click="handleModifierRightClick(modifier)"
        >
          <SkillItemUpgrade
            v-for="choiceModifier in modifier.choiceModifiers"
            :key="choiceModifier.name"
            :ref="el => { skillModifierRefs[choiceModifier.name] = el }"
            :icon="skill.icon"
            class="absolute top-0 left-0"
            :style="{ transform: choiceModifier.transform }"
            :active="choiceModifier.active"
            @click="handleModifierClick(modifier, choiceModifier)"
            @right-click="handleModifierRightClick(choiceModifier)"
          />
        </SkillItemUpgrade>
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
  description: 'Launch a bolt of lightning that shocks an enemy <span class="text-orange-500">4</span> times, dealing <span class="text-orange-500">[{1}%]</span> damage each hit.',
  descriptionValues: ['8,8.8,9.6,10.4,11.2'],
  icon: '/img/skills/sorcerer/basic/spark.png',
  transform: getSkillTransform(165, radiusSkill),
  rank: 0,
  rankMax: 5,
  modifiers: [{
    name: 'enhanced-spark',
    transform: getSkillTransform(140, radiusModifier),
    active: false,
    choiceModifiers: [{
      name: 'glinting-spark',
      transform: getSkillTransform(175, radiusChoiceModifier),
      active: false
    }, {
      name: 'flickering-spark',
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
    tooltip.description = getTooltipDescription(skill.description, skill.descriptionValues, skill.rank)
  }
}

function handleSkillRightClick (skill: any) {
  if (skill.rank <= 0) return

  if (skill.rank === 1 && hasActiveModifiers(skill)) return

  skill.rank--

  tooltip.rank = skill.rank
  tooltip.description = getTooltipDescription(skill.description, skill.descriptionValues, skill.rank)
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

  modifier.active = true
}

function handleModifierRightClick (modifier: any) {
  if (modifier.choiceModifiers && hasChoiceModifierSelected(modifier)) return
  modifier.active = false
}

const tooltip = reactive({
  visible: false,
  name: '',
  description: '',
  icon: '',
  rank: 0,
  type,
  school: '',
  damageType: '',
  x: 0,
  y: 0
})

function handleSkillMouseOver (skill: any) {
  if (tooltip.visible === true) return

  const ref = skillRefs.value[skill.name]
  const refBox = ref.$el.getBoundingClientRect()
  tooltip.name = skill.name
  tooltip.rank = skill.rank
  tooltip.school = skill.school
  tooltip.damageType = skill.damageType

  if (skill.descriptionValues) {
    tooltip.description = getTooltipDescription(skill.description, skill.descriptionValues, skill.rank)
  } else {
    tooltip.description = skill.description
  }

  tooltip.icon = skill.icon

  const offset = 20

  tooltip.x = refBox.left + offset
  tooltip.y = refBox.top + offset
  tooltip.visible = true
}

function getTooltipDescription (description: string, values: string[], rank: number) {
  let descValue = description

  values?.forEach((value, index) => {
    const valueArray = value.split(',')
    descValue = descValue.replace(`{${index + 1}}`, valueArray[Math.max(0, rank - 1)])
  })

  return descValue
}
</script>
