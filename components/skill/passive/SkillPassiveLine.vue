<template>
  <path
    :d="dpath"
    fill="none"
    stroke="red"
    stroke-width="2"
  />
</template>

<script setup lang="ts">
interface Props {
  active?: boolean
  el1: HTMLElement
  el2: HTMLElement
  parent: HTMLElement
  direct?: boolean
  direction?: string
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  direct: true,
  direction: ''
})

const { x: el1x, y: el1y } = computed(() => getElementCenterCoordinates(props.parent, props.el1)).value
const { x: el2x, y: el2y } = computed(() => getElementCenterCoordinates(props.parent, props.el2)).value

console.log(props.el1)
console.log(props.el2)
const dpath = computed(() => {
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
// const { x1, y1, x2, y2 } = computed(() => getLineCoordinates(props.parent, props.el1, props.el2)).value
</script>
