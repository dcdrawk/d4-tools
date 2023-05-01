<template>
  <defs>
    <filter id="inset-shadow">
      <feFlood flood-color="black" />
      <feComposite
        operator="out"
        in2="SourceGraphic"
      />
      <feGaussianBlur stdDeviation="3" />
      <feComposite
        operator="atop"
        in2="SourceGraphic"
      />
    </filter>
  </defs>

  <line
    class="shadow-lg"
    :x1="x1"
    :y1="y1"
    :x2="x2"
    :y2="y2"
    stroke="#3e403d"
    stroke-width="30"
    :data-percent="percentage"
    :data-previous-percent="percentagePrevious"
    :data-previous-x="filledLinePrevoius.x"
    :data-previous-y="filledLinePrevoius.y"
  />

  <line
    class="transition-all text-shadow shadow-red-200"
    :x1="x1"
    :y1="y1"
    :x2="x2"
    :y2="y2"
    stroke="#2c2c2c"
    stroke-width="16"
    filter="url(#inset-shadow)"
  />

  <line
    class="origin-top-right transition-all stroke-[#871B1E] shadow-[inset_0_0_0_3px_#252321]"
    :x1="x1"
    :y1="y1"
    :x2="filledLine.x"
    :y2="filledLine.y"
    stroke-width="16"
    filter="url(#inset-shadow)"
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
  rank?: number
  rankRequired: number
  rankStart?: number
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  rankStart: 0,
  rank: 0
})

const animating = ref(false)
const animationX1 = ref()
const animationY1 = ref()
const animationX2 = ref()
const animationY2 = ref()
const animationDuration = '250ms'
const animationKeySplines = '0.5 0 0.5 1;'

const { x1, y1, x2, y2 } = computed(() => getLineCoordinates(props.parent, props.el1, props.el2)).value

function getRankPercentage (rank: number, rankRequired: number, rankStart: number) {
  return Math.max(0, (
    Math.min(rank, rankRequired) - rankStart) / (rankRequired - rankStart)
  )
}

const percentage = computed(() => getRankPercentage(props.rank, props.rankRequired, props.rankStart))

const oldRank = ref(props.rank)

const percentagePrevious = computed(() => getRankPercentage(oldRank?.value, props.rankRequired, props.rankStart))

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

const rankCapped = computed(() => Math.min(props.rank, props.rankRequired))

watch(
  () => rankCapped.value,
  (newValue, oldValue) => {
    if (newValue === undefined || animating.value || props.rank < props.rankStart) return

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
