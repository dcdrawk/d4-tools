<template>
  <div>
    <BaseSVG
      :width="300"
      :height="300"
      class="absolute"
    >
      <SkillLine
        :x1="line.x1"
        :y1="line.y1"
        :x2="line.x2"
        :y2="line.y2"
        stroke="#3e403d"
        stroke-width="10"
      />
    </BaseSVG>
    <SkillTier
      ref="skillTier"
      class="translate-x-24 translate-y-24"
    >
      <SkillItem
        ref="skillItem"
        :active="activeSkill"
        class="absolute top-[12.5px] left-[12px] -translate-y-20 -translate-x-24"
        @toggle="activeSkill = !activeSkill"
      />
    </SkillTier>

    <!-- </BaseSVG> -->
  </div>
</template>

<script setup lang="ts">
// const props = defineProps()
const activeSkill = ref(false)
const skillTier = ref()
const skillItem = ref()

// console.log(skillTier.value)

const line = computed(() => {
  const { x1, y1, x2, y2 } = useLineCoordinates(skillTier.value?.$el, skillItem.value?.$el)

  return { x1, y1, x2, y2 }
})
</script>
