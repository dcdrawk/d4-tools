<template>
  <BaseSVG
    :height="64"
    :width="64"
  >
    <g
      class="key-passive__svg cursor-pointer relative"
      @click="$emit('click')"
      @contextmenu.prevent="$emit('contextmenu')"
      @mouseover="$emit('mouseover')"
      @mouseleave="$emit('mouseleave')"
      @mouseout="$emit('mouseout')"
    >
      <rect
        class="key-passive__outer-square transition-colors "
        width="40"
        height="40"
        x="12"
        y="12"
        fill="#191f20"
        stroke="#3e403d"
        stroke-width="1.5"
      />

      <rect
        width="36"
        height="36"
        x="14"
        y="14"
        fill="#191f20"
        stroke="#3e403d"
        stroke-width="0.5"
      />
      <!-- L 11,37 -->
      <path
        d="
          M 0,32 L 11,27 C 11,20 20,11 27,11
          L 32,0 L 37,11 C 46,11 53,20 53,27
          L 64,32 L 53,37 C 53,44 46,53 37,53
          L 32,64 L 27,53 C 20,53 11,44 11,37
          L 0, 32
        "
        stroke="#3e403d"
        stroke-linejoin="round"
        stroke-width="1.5"
        :class="outerSquareStyles"
      />

      <circle
        cx="32"
        cy="32"
        r="18"
        stroke="#000"
        :class="outerSquareStyles"
      />

      <image
        v-if="icon"
        :href="icon"
        class="absolute left-[10px] top-0 transition-opacity"
        x="13"
        y="13"
        height="38"
        width="38"
        :opacity="iconOpacity"
      />

      <circle
        class="key-passive__inner-circle"
        cx="32"
        cy="32"
        r="18"
        stroke="#3e403d"
        fill="none"
      />

    <!-- <path
      d="M1,5 a2,2 0,0,0 2,-3 a3,3 0 0 1 2,3.5"
      stroke="black"
      fill="none"
      stroke-linejoin="miter"
      stroke-linejoin="arcs"
    /> -->
    </g>
  </BaseSVG>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'click'): void
  (e: 'contextmenu'): void
  (e: 'mouseover'): void
  (e: 'mouseleave'): void
  (e: 'mouseout'): void
}>()

interface Props {
  active?: boolean
  highlight?: boolean
  tooltip?: boolean
  icon?: string
  rank?: number
  rankMax?: number
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  tooltip: false,
  icon: '/img/skills/sorcerer/key-passive/combustion.webp',
  rank: 0,
  rankMax: 5
})

const isActive = computed<boolean>(() => props.rank > 0)

const outerSquareStyles = computed(() => ({
  'fill-red-800': isActive.value,
  'fill-[#e3d9c0]': props.highlight && !isActive.value,
  'fill-[#191f20]': !isActive.value
}))

const iconOpacity = computed<string>(() => isActive.value || props.tooltip || props.highlight ? '1' : '0.6')
</script>

<style scoped lang="postcss">
.key-passive__svg:hover {
  .key-passive {
    &__outer-square {
      @apply stroke-[#faecea];
    }
  }
}
</style>
