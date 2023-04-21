<template>
  <div class="skill-item-passive w-[32px] h-[32px] z-0">
    <slot />

    <!-- Rank (shown on hover) -->
    <div
      class="skill-item-passive__rank pointer-events-none absolute z-30 text-white translate-x-[16px] translate-y-6 font-semibold bg-gradient-to-l from-black/75 text-sm pr-[2px] select-none transition-opacity"
      :class="rankClass"
    >
      {{ rank }}/{{ rankMax }}
    </div>

    <BaseSVG
      :width="32"
      :height="32"
    >
      <g
        class="skill-item-passive__svg cursor-pointer relative"
        @click="$emit('click')"
        @contextmenu.prevent="$emit('contextmenu')"
        @mouseover="$emit('mouseover')"
        @mouseleave="$emit('mouseleave')"
        @mouseout="$emit('mouseout')"
      >
        <!-- Outer Square -->
        <rect
          class="skill-item-passive__outer-square transition-colors"
          :class="outerSquareStyles"
          width="30"
          height="30"
          fill="#191f20"
          y="1"
          x="1"
          stroke="#3e403d"
          stroke-width="1"
        />

        <circle
          class="skill-item-passive__inner-circle transition-colors"
          cx="16"
          cy="16"
          r="15"
          stroke="#3e403d"
          fill="#3e403d"
          stroke-width="1"
        />

        <image
          v-if="icon"
          :href="icon"
          class="absolute left-[10px] top-0 transition-opacity transform-gpu"
          x="1"
          y="1"
          height="30"
          width="30"
          :opacity="iconOpacity"
        />
      </g>
    </BaseSVG>
  </div>
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
  highlight: false,
  tooltip: false,
  icon: '',
  rank: 0,
  rankMax: 5
})

const isActive = computed<boolean>(() => props.rank > 0)

const outerSquareStyles = computed(() => ({
  'fill-red-800': isActive.value,
  'fill-[#e3d9c0]': props.highlight && !isActive.value,
  'fill-[#191f20]': !isActive.value
}))

const iconOpacity = computed<string>(() => isActive.value || props.tooltip ? '1' : '0.6')

const rankClass = computed<string>(() => props.rank <= 0 ? 'opacity-0' : 'opacity-100')
</script>

<style scoped lang="postcss">
.skill-item-passive__svg:hover {
  .skill-item-passive {
    &__rank {
      @apply opacity-100;
    }

    &__inner-circle {
      @apply stroke-[#faecea];
    }
  }
}
</style>
