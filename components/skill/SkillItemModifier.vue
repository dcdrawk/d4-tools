<template>
  <div class="skill-item-upgrade w-[36px] h-[36px] z-auto">
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
            x="8"
            y="12"
            transform="rotate(45, 12, 12)"
            fill="white"
          />
        </mask>
      </defs>
      <g
        class="skill-item-upgrade__svg cursor-pointer"
        @click.stop="$emit('click')"
        @contextmenu.prevent="$emit('right-click')"
      >
        <rect
          class="skill-item-upgrade__outer-border opacity-0 transition-colors"
          :class="outerSquareBg"
          width="24"
          height="24"
          transform="rotate(45, 12, 12)"
          fill="#191f20"
          x="8"
          y="8"
          stroke="#3e403d"
          stroke-width="3"
        />
        <!-- Outer Square -->
        <rect
          class="skill-item-upgrade__outer-square transition-colors"
          :class="outerSquareBg"
          width="24"
          height="24"
          transform="rotate(45, 12, 12)"
          fill="#191f20"
          x="8"
          y="8"
          stroke="#3e403d"
          stroke-width="2"
        />

        <!-- Black Image Backdrop -->
        <rect
          width="18"
          height="18"
          fill="#000"
          transform="rotate(45, 12, 12)"
          x="8"
          y="12"
        />

        <image
          v-if="icon"
          :href="icon"
          class="absolute left-[10px] top-0 transition-opacity transform-gpu"
          x="7"
          y="7"
          height="26"
          width="26"
          :opacity="iconOpacity"
          mask="url(#iconMask)"
        />

        <!-- Inner Square -->
        <rect
          width="18"
          height="18"
          fill="transparent"
          transform="rotate(45, 12, 12)"
          y="12"
          x="8"
          stroke="#3e403d"
          stroke-width="1"
        />
      </g>
    </BaseSVG>

    <slot />
  </div>
</template>

<script lang="ts" setup>
defineEmits([
  'click',
  'right-click'
])

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  }
})

const outerSquareBg = computed(() => props.active ? useActiveFill() : '!fill-[#191f20]')

const iconOpacity = computed(() => props.active ? '1' : '0.6')
</script>

<style scoped lang="postcss">
.skill-item-upgrade__svg:hover {
  .skill-item-upgrade__outer-border {
    @apply stroke-[#faecea] opacity-100;
  }
}
</style>
