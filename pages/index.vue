<template>
  <div>
    <BaseSVG
      :width="500"
      :height="500"
      class="absolute"
    >
      <SkillLine
        v-for="(skill, index) in skills"
        :key="skill.name"
        :active="skill.active"
        :el1="skillTier?.$el"
        :el2="skillRefs[index]?.$el"
      />
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
        :style="{
          transform: skill.transform
        }"
        @toggle="skill.active = !skill.active"
      />
    </SkillTier>
  </div>
</template>

<script setup lang="ts">
const skillTier = ref()
const skillRefs = ref<any[]>([])

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

const skills = reactive([{
  name: 'spark',
  icon: '/img/skills/sorcerer/basic/spark.png',
  transform: getSkillTransform(165, 95),
  active: false
}, {
  name: 'frost-bolt',
  icon: '/img/skills/sorcerer/basic/frost-bolt.png',
  transform: getSkillTransform(115, 95),
  active: false
}, {
  name: 'fire-bolt',
  icon: '/img/skills/sorcerer/basic/fire-bolt.png',
  transform: getSkillTransform(65, 95),
  active: false
}, {
  name: 'arc-lash',
  icon: '/img/skills/sorcerer/basic/arc-lash.png',
  transform: getSkillTransform(15, 95),
  active: false
}])
</script>
