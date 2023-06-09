<template>
  <div class="skill-item-modifier w-[40px] h-[40px] z-auto">
    <BaseSVG
      :width="40"
      :height="40"
      class="absolute top-0 left-0"
    >
      <defs>
        <mask
          id="iconMask"
          x="0"
          y="0"
          width="100"
          height="100"
        >
          <rect
            width="18"
            height="18"
            class="translate-x-[11px] translate-y-[11px] rotate-45 origin-center"
            x="0"
            y="0"
            fill="white"
          />
        </mask>
      </defs>

      <g
        class="skill-item-modifier__svg cursor-pointer"
        @click.stop="$emit('click')"
        @contextmenu.prevent="$emit('contextmenu')"
        @mouseover="$emit('mouseover')"
        @mouseleave="$emit('mouseleave')"
        @mouseout="$emit('mouseout')"
      >
        <rect
          class="skill-item-modifier__outer-border opacity-0 transition-colors"
          width="24"
          height="24"
          transform="rotate(45, 12, 12)"
          fill="transparent"
          x="8"
          y="8"
          stroke="#3e403d"
          stroke-width="3"
        />
        <!-- Outer Square -->
        <rect
          class="skill-item-modifier__outer-square transition-colors"
          :class="outerSquareStyles"
          width="24"
          height="24"
          fill="#191f20"
          transform="rotate(45, 12, 12)"
          x="8"
          y="8"
          stroke="#3e403d"
          stroke-width="1"
        />

        <!-- Black Image Backdrop -->
        <rect
          width="18"
          height="18"
          fill="black"
          transform="rotate(45, 9, 9)"
          x="11"
          y="11"
        />

        <image
          v-if="icon"
          :href="icon"
          class="absolute left-[10px] top-0 transition-opacity"
          x="7"
          y="7"
          height="26"
          width="26"
          :opacity="iconOpacity"
          style="clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);"
        />

        <!-- 4 Corner Rectangles -->
        <rect
          width="3"
          height="3"
          fill="transparent"
          transform="rotate(45, 12, 12)"
          y="8"
          x="8"
          stroke="#3e403d"
          stroke-width="1"
        />

        <rect
          width="3"
          height="3"
          fill="transparent"
          transform="rotate(135, 12, 12)"
          y="8"
          x="8"
          stroke="#3e403d"
          stroke-width="1"
        />

        <rect
          width="3"
          height="3"
          fill="transparent"
          y="8"
          x="8"
          stroke="#3e403d"
          stroke-width="1"
          transform="rotate(225, 12, 12)"
        />

        <rect
          width="3"
          height="3"
          fill="transparent"
          y="8"
          x="8"
          stroke="#3e403d"
          stroke-width="1"
          transform="rotate(315, 12, 12)"
        />

        <!-- Inner Square -->
        <rect
          width="18"
          height="18"
          fill="transparent"
          transform="rotate(45, 9, 9)"
          y="11"
          x="11"
          stroke="#3e403d"
          stroke-width="1"
        />
      </g>
    </BaseSVG>

    <slot />
  </div>
</template>

<script lang="ts" setup>
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
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  tooltip: false,
  icon: ''
})

const outerSquareStyles = computed(() => ({
  'fill-[#191f20]': !props.active,
  'fill-red-800': props.active,
  'fill-[#e3d9c0]': props.highlight && !props.active
}))

const iconOpacity = computed<string>(() => props.active || props.tooltip || props.highlight ? '1' : '0.6')
</script>

<style scoped lang="postcss">
.skill-item-modifier__svg:hover {
  .skill-item-modifier__outer-border {
    @apply stroke-[#faecea] opacity-100;
  }
}
</style>
