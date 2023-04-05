<template>
  <line
    :x1="line.x1"
    :y1="line.y1"
    :x2="line.x2"
    :y2="line.y2"
    stroke="#3e403d"
    stroke-width="10"
  />
  <line
    class="transition-all"
    :x1="line.x1"
    :y1="line.y1"
    :x2="line.x2"
    :y2="line.y2"
    :class="lineStroke"
    stroke-width="5"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  x1: {
    type: Number,
    default: 0
  },
  x2: {
    type: Number,
    default: 0
  },
  y1: {
    type: Number,
    default: 0
  },
  y2: {
    type: Number,
    default: 0
  },
  el1: {
    type: [Object, String],
    default: ''
  },
  el2: {
    type: [Object, String],
    default: ''
  }
})

const lineStroke = computed(() => props.active ? 'stroke-red-800' : 'stroke-[#191f20]')

const line = computed(() => {
  const { x1, y1, x2, y2 } = useLineCoordinates(props.el1, props.el2)

  return { x1, y1, x2, y2 }
})
</script>
