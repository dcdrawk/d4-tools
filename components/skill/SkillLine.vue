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
    :class="lineStyles"
    :stroke-width="strokeWidth"
  />
</template>

<script setup lang="ts">
interface Props {
  active?: boolean
  highlight?: boolean
  el1: HTMLElement
  el2: HTMLElement
  parent: HTMLElement
}

const props = withDefaults(defineProps<Props>(), {
  active: false
})

const lineStyles = computed(() => ({
  'stroke-[#191f20]': !props.active && !props.highlight,
  'stroke-[#e3d9c0]/50': props.highlight && !props.active,
  'stroke-red-800': props.active
}))

const strokeWidth = computed(() => props.active ? 5 : 4)

const { x1, y1, x2, y2 } = computed(() => getLineCoordinates(props.parent, props.el1, props.el2)).value
</script>
