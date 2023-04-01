<template>
  <div class="skill-item w-[55px] h-[55px]">
    <slot />
    <div
      class="skill-item__level absolute z-30 text-white translate-x-[28px] translate-y-11 font-semibold bg-gradient-to-l from-black/75 text-sm pr-[2px] select-none transition-opacity"
      :class="levelClass"
    >
      {{ level }}/{{  levelMax }}
    </div>
    <BaseSVG
      :width="56"
      :height="56"
      class="absolute top-0 left-0"
    >
      <g
        class="cursor-pointer relative"
        @click="$emit('click')"
        @contextmenu.prevent="$emit('right-click')"
      >
        <!-- Outer Circle -->
        <circle
          cx="28"
          cy="28"
          r="27.5"
          stroke="#3e403d"
          fill="#191f20"
          stroke-width="1"
        />

        <!-- Outer Square -->
        <rect
          class="transition-all"
          :class="outerSquareBg"
          width="45"
          height="45"
          fill="#191f20"
          y="5"
          x="5"
          stroke="#3e403d"
          stroke-width="1"
        />

        <!-- Black Image Backdrop -->
        <rect
          width="38"
          height="38"
          fill="#000"
          y="8.5"
          x="8.5"
        />

        <image
          v-if="icon"
          :href="icon"
          class="absolute left-[10px] top-0 transition-all"
          x="8.5"
          y="8.5"
          height="38"
          width="38"
          :opacity="iconOpacity"
        />

        <!-- Inner Square -->
        <rect
          width="38"
          height="38"
          fill="transparent"
          y="8.5"
          x="8.5"
          stroke="#3e403d"
          stroke-width="1"
        />

        <!-- Corner Squares -->
        <rect
          width="3.5"
          height="3.5"
          fill="transparent"
          y="5"
          x="5"
          stroke="#3e403d"
          stroke-width="1"
        />
        <rect
          width="3.5"
          height="3.5"
          fill="transparent"
          y="5"
          x="46.5"
          stroke="#3e403d"
          stroke-width="1"
        />
        <rect
          width="3.5"
          height="3.5"
          fill="transparent"
          y="46.5"
          x="5"
          stroke="#3e403d"
          stroke-width="1"
        />
        <rect
          width="3.5"
          height="3.5"
          fill="transparent"
          y="46.5"
          x="46.5"
          stroke="#3e403d"
          stroke-width="1"
        />
      </g>
    </BaseSVG>
  </div>
</template>

<script setup>
defineEmits([
  'click',
  'right-click'
])

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  level: {
    type: [String, Number],
    default: '0'
  },
  levelMax: {
    type: [String, Number],
    default: '5'
  }
})

const outerSquareBg = computed(() => props.active ? 'fill-red-700' : '!fill-[#191f20]')

const iconOpacity = computed(() => props.active ? '1' : '0.6')

const levelClass = computed(() => props.level <= 0 ? 'opacity-0' : 'opacity-100')
</script>

<style lang="postcss">
.skill-item {
  &:hover {
    .skill-item__level {
      @apply opacity-100;
    }
  }
}
</style>