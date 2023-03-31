<template>
  <div class="skill-item">
    <BaseSVG
      :width="56"
      :height="56"
    >
      <g
        class="cursor-pointer"
        @click="$emit('toggle')"
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

        <!-- Inner Square -->
        <rect
          width="38"
          height="38"
          fill="#191f20"
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
  'toggle'
])

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

const outerSquareBg = computed(() => props.active ? 'fill-red-700' : '!fill-[#191f20]')
</script>
