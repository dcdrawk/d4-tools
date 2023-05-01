<template>
  <path
    :d="dpath"
    fill="none"
    stroke="#3e403d"
    stroke-width="10"
    :data-dir="direction"
  />
  <path
    class="transition-all"
    :class="lineStyles"
    :d="dpath"
    fill="none"
    stroke-width="5"
  />
</template>

<script setup lang="ts">
interface Props {
  active?: boolean
  highlight?: boolean
  el1: HTMLElement
  el2: HTMLElement
  parent: HTMLElement
  direct?: boolean
  direction?: string
  path?: string
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  highlight: false,
  direct: true,
  direction: '',
  path: ''
})

const { x: el1x, y: el1y } = computed(() => getElementCenterCoordinates(props.parent, props.el1)).value
const { x: el2x, y: el2y } = computed(() => getElementCenterCoordinates(props.parent, props.el2)).value

const dpath = computed(() => {
  if (props.path) return props.path
  const moveTo = `M ${el1x},${el1y}`
  if (props.direct) return `${moveTo} L ${el2x},${el2y}`

  switch (props.direction) {
    case ('XY'):
      return `${moveTo} L ${el2x},${el1y} L${el2x},${el2y}`

    case ('YX'):
    default:
      return `${moveTo} L ${el1x},${el2y} L${el2x},${el2y}`
  }
})

// const lineStroke = computed<string>(() => props.active ? 'stroke-red-800' : 'stroke-[#191f20]')
const lineStyles = computed(() => ({
  'stroke-[#191f20]': !props.active && !props.highlight,
  'stroke-[#e3d9c0]/40': props.highlight && !props.active,
  'stroke-red-800': props.active
}))
</script>
