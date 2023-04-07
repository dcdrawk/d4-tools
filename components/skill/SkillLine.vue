<template>
  <line
    :x1="x1"
    :y1="y1"
    :x2="x2"
    :y2="y2"
    stroke="#3e403d"
    stroke-width="10"
  />
  <line
    class="transition-all"
    :x1="x1"
    :y1="y1"
    :x2="x2"
    :y2="y2"
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
    type: [HTMLElement],
    required: true
  },
  el2: {
    type: [HTMLElement],
    required: true
  }
})

const lineStroke = computed(() => props.active ? 'stroke-red-800' : 'stroke-[#191f20]')
const { x1, y1, x2, y2 } = getLineCoordinates(props.el1, props.el2)
</script>
