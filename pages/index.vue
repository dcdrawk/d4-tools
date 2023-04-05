<template>
  <div class="relative">
    <!-- {{ tooltipVisible }} -->
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
          :active="skill.level > 0"
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

    <div
      v-if="tooltipVisible"
      class="skill-item__tooltip absolute z-50 top-[40px] left-[40px] skill-item__tooltip w-[400px] flex flex-col text-white border-[#2d3c38] border-4 transition-opacity shadow-lg"
      :style="{ transform: `translate(${tooltipX}px, ${tooltipY}px)`}"
    >
      <div class="relative bg-[#151314] border-[#060604] border-2 p-4 select-none">
        <div class="relative w-full flex items-center justify-center -top-12 -mb-10">
          <SkillItem
            class="!block select-none"
            :icon="tooltipIcon"
          />
        </div>
        <!-- <div class="absolute -top-9 left-1/2 -translate-x-8 w-16 h-16 rounded-full bg-gray-800 border border-spacing-0 border-gray-500 pt-2 pl-2">
          <img
            :src="tooltipIcon"
            class="w-12 h-12 border-2 border-gray-600"
          >
        </div> -->
        <h4 class="font-display text-xl font-semibold text-center select-none">
          {{ tooltipName }}
        </h4>

        <hr class="border-gray-500 my-2 select-none">
        <!-- eslint-disable-next-line -->
        <p v-html="tooltipDescription" />
      </div>
    </div>

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
        :active="skill.level > 0"
        :icon="skill.icon"
        :level="skill.level"
        :level-max="skill.levelMax"
        @click="handleSkillClick(skill)"
        @right-click="handleSkillRightClick(skill)"
        @mouseover="handleSkillMouseOver(skill)"
        @mouseleave="tooltipVisible = false"
        @mouseout="tooltipVisible = false"
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
  description: 'Launch a bolt of lightning that shocks an enemy <span class="text-orange-500">4</span> times, dealing <span class="text-orange-500">[{1}%]</span> damage each hit.',
  descriptionValues: ['8,8.8,9.6,10.4,11.2'],
  icon: '/img/skills/sorcerer/basic/spark.png',
  transform: getSkillTransform(165, radiusSkill),
  level: 0,
  levelMax: 5,
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
  icon: '/img/skills/sorcerer/basic/frost-bolt.png',
  transform: getSkillTransform(115, radiusSkill),
  level: 0,
  levelMax: 5,
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
  icon: '/img/skills/sorcerer/basic/fire-bolt.png',
  transform: getSkillTransform(65, radiusSkill),
  level: 0,
  levelMax: 5,
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
  icon: '/img/skills/sorcerer/basic/arc-lash.png',
  transform: getSkillTransform(15, radiusSkill),
  level: 0,
  levelMax: 5,
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
  if (skill.level < skill.levelMax) {
    skill.level++
    tooltipDescription.value = getTooltipDescription(skill.description, skill.descriptionValues, skill.level)
  }
}

function handleSkillRightClick (skill: any) {
  if (skill.level <= 0) return

  if (skill.level === 1 && hasActiveModifiers(skill)) return

  skill.level--

  tooltipDescription.value = getTooltipDescription(skill.description, skill.descriptionValues, skill.level)
}

function hasActiveModifiers (skill: any) {
  return !!skill.modifiers.find((modifier: any) => modifier.active)
}

function hasChoiceModifierSelected (modifier: any) {
  return !!modifier.choiceModifiers?.find((modifier: any) => modifier.active)
}

function handleModifierClick (parent: any, modifier: any) {
  if (parent.level === 0) return
  if (modifier.active) return
  if ((parent.choiceModifiers && !parent.active)) return
  if (parent.choiceModifiers && hasChoiceModifierSelected(parent)) return
  modifier.active = true
}

function handleModifierRightClick (modifier: any) {
  if (modifier.choiceModifiers && hasChoiceModifierSelected(modifier)) return
  modifier.active = false
}

const tooltipVisible = ref(false)
const tooltipName = ref('')
const tooltipDescription = ref('')
const tooltipIcon = ref('')

const tooltipX = ref(0)
const tooltipY = ref(0)

function handleSkillMouseOver (skill: any) {
  if (tooltipVisible.value === true) return
  const ref = skillRefs.value[skill.name]
  const refBox = ref.$el.getBoundingClientRect()
  tooltipName.value = skill.name
  if (skill.descriptionValues) {
    tooltipDescription.value = getTooltipDescription(skill.description, skill.descriptionValues, skill.level)
  } else {
    tooltipDescription.value = skill.description
  }
  tooltipIcon.value = skill.icon
  const offset = 20
  tooltipX.value = refBox.left + offset
  tooltipY.value = refBox.top + offset
  tooltipVisible.value = true
}

function getTooltipDescription (description: string, values: string[], level: number) {
  let descValue = description
  values?.forEach((value, index) => {
    const valueArray = value.split(',')
    descValue = descValue.replace(`{${index + 1}}`, valueArray[Math.max(0, level - 1)])
  })

  return descValue
}
</script>
