<template>
  <div
    class="skill-item__tooltip absolute z-50 top-[40px] left-[40px] skill-item__tooltip w-[400px] flex flex-col text-white border-[#2d3c38] border-4 transition-opacity shadow-lg"
    :style="{ transform: `translate(${translateX}px, ${translateY}px)`}"
  >
    <div class="relative bg-[#151314] border-[#060604] border-2 p-4 select-none">
      <div class="relative w-full flex items-center justify-center -top-12 -mb-10">
        <SkillItem
          class="!block select-none"
          :icon="icon"
        />
      </div>
      <h4 class="font-display text-xl font-semibold text-center select-none">
        {{ name }}
      </h4>

      <hr class="border-gray-500 my-2 select-none">
      <!-- eslint-disable-next-line -->
      <p v-html="description" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  active: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  rank: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: 'Basic'
  },
  school: {
    type: String,
    default: ''
  },
  translateX: {
    type: Number,
    default: 0
  },
  translateY: {
    type: Number,
    default: 0
  }
})
</script>
