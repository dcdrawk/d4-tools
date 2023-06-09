<template>
  <div class="skill-item w-[56px] h-[56px] z-0">
    <slot />

    <!-- Rank (shown on hover) -->
    <div
      class="skill-item__rank pointer-events-none absolute z-30 text-white translate-x-[28px] translate-y-11 font-semibold bg-gradient-to-l from-black/75 text-sm pr-[2px] select-none transition-opacity"
      :class="rankClass"
    >
      {{ rank }}/{{ rankMax }}
    </div>

    <BaseSVG
      :width="56"
      :height="56"
    >
      <g
        class="skill-item__svg cursor-pointer relative"
        @click="$emit('click')"
        @contextmenu.prevent="$emit('contextmenu')"
        @mouseover="$emit('mouseover')"
        @mouseleave="$emit('mouseleave')"
        @mouseout="$emit('mouseout')"
      >
        <!-- Outer Circle -->
        <circle
          cx="28"
          cy="28"
          r="27.5"
          stroke="#3e403d"
          fill="#191f20"
          stroke-width="1"
        />

        <!-- Outer Square -->
        <rect
          class="skill-item__outer-square transition-colors"
          :class="outerSquareStyles"
          width="45"
          height="45"
          fill="#191f20"
          y="5"
          x="5"
          stroke="#3e403d"
          stroke-width="1"
        />

        <!-- Black Image Backdrop -->
        <rect
          width="38"
          height="38"
          fill="#000"
          y="8.5"
          x="8.5"
        />

        <image
          v-if="icon"
          :href="icon"
          class="absolute left-[10px] top-0 transition-opacity"
          x="8.5"
          y="8.5"
          height="38"
          width="38"
          :opacity="iconOpacity"
        />

        <!-- Inner Square -->
        <rect
          class="skill-item__inner-square"
          width="38"
          height="38"
          fill="transparent"
          y="8.5"
          x="8.5"
          stroke="#3e403d"
          stroke-width="1"
        />

        <!-- Corner Squares -->
        <rect
          width="3.5"
          height="3.5"
          fill="transparent"
          y="5"
          x="5"
          stroke="#3e403d"
          stroke-width="1"
        />
        <rect
          width="3.5"
          height="3.5"
          fill="transparent"
          y="5"
          x="46.5"
          stroke="#3e403d"
          stroke-width="1"
        />
        <rect
          width="3.5"
          height="3.5"
          fill="transparent"
          y="46.5"
          x="5"
          stroke="#3e403d"
          stroke-width="1"
        />
        <rect
          width="3.5"
          height="3.5"
          fill="transparent"
          y="46.5"
          x="46.5"
          stroke="#3e403d"
          stroke-width="1"
        />

        <!-- Highlight Square -->
        <rect
          class="skill-item__outer-square transition-colors"
          width="45"
          height="45"
          fill="transparent"
          y="5"
          x="5"
          stroke="#3e403d"
          stroke-width="1"
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

const iconOpacity = computed<string>(() => isActive.value || props.tooltip || props.highlight ? '1' : '0.6')

const rankClass = computed<string>(() => props.rank <= 0 ? 'opacity-0' : 'opacity-100')
</script>

<style scoped lang="postcss">
.skill-item__svg:hover {
  .skill-item {
    &__rank {
      @apply opacity-100;
    }

    &__outer-square {
      @apply stroke-[#faecea];
    }
  }
}
</style>
