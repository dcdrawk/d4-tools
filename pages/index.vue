<template>
  <div class="relative">
    <BaseSVG
      :width="500"
      :height="500"
      class="absolute top-0 left-0"
    >
      <g
        v-for="(skill, index) in skills"
        :key="skill.name"
      >
        <SkillLine
          :active="skill.active"
          :el1="skillTier?.$el"
          :el2="skillRefs[index]?.$el"
        />

        <g
          v-for="modifier in skill.modifiers"
          :key="modifier.name"
        >
          <SkillLine
            :active="modifier.active"
            :el1="skillRefs[index]?.$el"
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

    <SkillTier
      ref="skillTier"
      class="translate-x-[230px] translate-y-[230px]"
    >
      <SkillItem
        v-for="(skill, index) in skills"
        :key="skill.name"
        :ref="el => { skillRefs[index] = el }"
        :active="skill.active"
        :icon="skill.icon"
        class="absolute top-[12.5px] left-[12px]"
        :style="{ transform: skill.transform }"
        @toggle="skill.active = !skill.active"
      >
        <SkillItemUpgrade
          v-for="modifier in skill.modifiers"
          :key="modifier.name"
          :ref="el => { skillModifierRefs[modifier.name] = el }"
          :icon="skill.icon"
          class="absolute top-[10px] left-[10px]"
          :style="{ transform: modifier.transform }"
          :active="modifier.active"
          @toggle="modifier.active = !modifier.active"
        >
          <SkillItemUpgrade
            v-for="choiceModifier in modifier.choiceModifiers"
            :key="choiceModifier.name"
            :ref="el => { skillModifierRefs[choiceModifier.name] = el }"
            :icon="skill.icon"
            class="absolute top-0 left-0"
            :style="{ transform: choiceModifier.transform }"
            :active="choiceModifier.active"
            @toggle="choiceModifier.active = !choiceModifier.active"
          />
        </SkillItemUpgrade>
      </SkillItem>
    </SkillTier>
  </div>
</template>

<script setup lang="ts">
const skillTier = ref()
const skillRefs = ref<any[]>([])
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

const skills = reactive([{
  name: 'spark',
  icon: '/img/skills/sorcerer/basic/spark.png',
  transform: getSkillTransform(165, radiusSkill),
  active: false,
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
  name: 'frost-bolt',
  icon: '/img/skills/sorcerer/basic/frost-bolt.png',
  transform: getSkillTransform(115, radiusSkill),
  active: false,
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
  name: 'fire-bolt',
  icon: '/img/skills/sorcerer/basic/fire-bolt.png',
  transform: getSkillTransform(65, radiusSkill),
  active: false,
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
  name: 'arc-lash',
  icon: '/img/skills/sorcerer/basic/arc-lash.png',
  transform: getSkillTransform(15, radiusSkill),
  active: false,
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
</script>
