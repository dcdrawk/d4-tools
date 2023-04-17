<template>
  <line
    :x1="x1"
    :y1="y1"
    :x2="x2"
    :y2="y2"
    stroke="#3e403d"
    stroke-width="30"
    :data-test1="filledLine.x"
    :data-test2="filledLine.y"
    :data-percent="percentage"
  />
  <line
    class="transition-all"
    :x1="x1"
    :y1="y1"
    :x2="x2"
    :y2="y2"
    :class="lineStroke"
    stroke-width="15"
  />
  <line
    class="stroke-red-800 origin-top-right transition-all"
    :x1="x1"
    :y1="y1"
    :x2="filledLine.x"
    :y2="filledLine.y"
    stroke-width="15"
  >
    <animate
      ref="animationX"
      attributeName="x2"
      duration="5s"
      :from="filledLinePrevoius.x"
      :to="filledLine.x"
      begin="indefinite"
      :dur="animationDuration"
    />
    <animate
      ref="animationY"
      attributeName="y2"
      duration="5s"
      :from="filledLinePrevoius.y"
      :to="filledLine.y"
      begin="indefinite"
      :dur="animationDuration"
    />
  </line>
</template>

<script setup lang="ts">
// import { faRankingStar } from '@fortawesome/free-solid-svg-icons'

interface Props {
  active?: boolean
  el1: HTMLElement
  el2: HTMLElement
  parent: HTMLElement
  rank: number
  rankRequired: number
  rankStart?: number
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  rankStart: 0
})

const animationX = ref()
const animationY = ref()
const animationDuration = '0.5s'

const lineStroke = computed<string>(() => props.active ? 'stroke-red-800' : 'stroke-[#191f20]')
const { x1, y1, x2, y2 } = computed(() => getLineCoordinates(props.parent, props.el1, props.el2)).value

const percentage = computed(() => {
  return props.rank / props.rankRequired
})

const oldRank = ref(props.rank)

const percentagePrevious = computed(() => {
  return oldRank?.value / props.rankRequired
})

const filledLine = computed(() => {
  const x = x1 + (x2 - x1) * (percentage.value)
  const y = y1 + (y2 - y1) * (percentage.value)
  return { x, y }
})

const filledLinePrevoius = computed(() => {
  const x = x1 + (x2 - x1) * (percentagePrevious.value)
  const y = y1 + (y2 - y1) * (percentagePrevious.value)
  return { x, y }
})

watch(
  () => props.rank,
  (newValue, oldValue) => {
    if (newValue !== oldRank.value) {
      oldRank.value = oldValue
      animationX.value?.beginElement()
      animationY.value?.beginElement()
    }
  }
)
</script>
