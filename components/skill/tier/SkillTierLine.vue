<template>
  <defs>
    <filter
      id="shadowFilter"
      x="0"
      y="0"
      width="200%"
      height="200%"
    >
      <feOffset
        result="offOut"
        in="SourceAlpha"
        dx="0"
        dy="0"
      />
      <feGaussianBlur
        result="blurOut"
        in="offOut"
        stdDeviation="2"
      />
      <feBlend
        in="SourceGraphic"
        in2="blurOut"
        mode="normal"
      />
    </filter>
  </defs>
  <line
    class="shadow-lg shadow-red-500"
    :x1="x1"
    :y1="y1"
    :x2="x2"
    :y2="y2"
    stroke="#3e403d"
    stroke-width="30"
    filter="url(#shadowFilter)"
  />
  <line
    class="transition-all text-shadow shadow-red-200"
    :x1="x1"
    :y1="y1"
    :x2="x2"
    :y2="y2"
    stroke="#191f20"
    stroke-width="15"
  />

  <line
    class="origin-top-right transition-all stroke-[#541113]"
    :x1="x1"
    :y1="y1"
    :x2="filledLine.x"
    :y2="filledLine.y"
    stroke-width="15"
  >
    <animate
      ref="animationX1"
      attributeName="x2"
      duration="5s"
      :from="filledLinePrevoius.x"
      :to="filledLine.x"
      begin="indefinite"
      calcMode="spline"
      keyTimes="0; 0.25"
      :keySplines="animationKeySplines"
      :dur="animationDuration"
    />
    <animate
      ref="animationY1"
      attributeName="y2"
      duration="5s"
      :from="filledLinePrevoius.y"
      :to="filledLine.y"
      begin="indefinite"
      calcMode="spline"
      keyTimes="0; 0.25"
      :keySplines="animationKeySplines"
      :dur="animationDuration"
    />
  </line>

  <line
    class="origin-top-right transition-all stroke-[#871B1E]"
    :x1="x1"
    :y1="y1"
    :x2="filledLine.x"
    :y2="filledLine.y"
    stroke-width="13"
  >
    <animate
      ref="animationX2"
      attributeName="x2"
      duration="5s"
      :from="filledLinePrevoius.x"
      :to="filledLine.x"
      begin="indefinite"
      calcMode="spline"
      keyTimes="0; 0.25"
      :keySplines="animationKeySplines"
      :dur="animationDuration"
    />
    <animate
      ref="animationY2"
      attributeName="y2"
      duration="5s"
      :from="filledLinePrevoius.y"
      :to="filledLine.y"
      begin="indefinite"
      calcMode="spline"
      keyTimes="0; 0.25"
      :keySplines="animationKeySplines"
      :dur="animationDuration"
    />
  </line>
</template>

<script setup lang="ts">
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

const animating = ref(false)
const animationX1 = ref()
const animationY1 = ref()
const animationX2 = ref()
const animationY2 = ref()
const animationDuration = '250ms'
const animationKeySplines = '0.5 0 0.5 1;'

const { x1, y1, x2, y2 } = computed(() => getLineCoordinates(props.parent, props.el1, props.el2)).value

const percentage = computed(() => {
  return Math.max(0, (
    Math.min(props.rank, props.rankRequired) - props.rankStart) / (props.rankRequired - props.rankStart)
  )
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

const rankCapped = computed(() => {
  if (props.rank < props.rankStart) return props.rankStart
  return Math.min(props.rank, props.rankRequired)
})

watch(
  () => rankCapped.value,
  (newValue, oldValue) => {
    if (newValue === undefined || animating.value) return

    oldRank.value = oldValue

    animationX1.value?.beginElement()
    animationY1.value?.beginElement()
    animationX2.value?.beginElement()
    animationY2.value?.beginElement()

    animating.value = true

    setTimeout(() => {
      animating.value = false
    }, 150)
  }
)
</script>