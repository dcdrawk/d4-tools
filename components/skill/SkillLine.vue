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
export interface Props {
  active?: boolean
  el1: HTMLElement,
  el2: HTMLElement
}

const props = withDefaults(defineProps<Props>(), {
  active: false
})

const lineStroke = computed<string>(() => props.active ? 'stroke-red-800' : 'stroke-[#191f20]')
const { x1, y1, x2, y2 } = getLineCoordinates(props.el1, props.el2)
</script>
