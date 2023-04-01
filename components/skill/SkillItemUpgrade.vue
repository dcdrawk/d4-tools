<template>
  <div class="skill-item-upgrade w-[36px] h-[36px] z-20">
    <BaseSVG
      :width="36"
      :height="36"
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
            x="6"
            y="10"
            transform="rotate(45, 12, 12)"
            fill="white"
          />
        </mask>
      </defs>
      <g
        class="cursor-pointer"
        @click="$emit('toggle')"
      >
        <!-- Outer Square -->
        <rect
          class="cursor-pointer transition-colors"
          :class="outerSquareBg"
          width="24"
          height="24"
          transform="rotate(45, 12, 12)"
          fill="#191f20"
          x="6"
          y="6"
          stroke="#3e403d"
          stroke-width="2"
        />

        <!-- Black Image Backdrop -->
        <rect
          width="18"
          height="18"
          fill="#000"
          transform="rotate(45, 12, 12)"
          x="6"
          y="10"
        />

        <image
          v-if="icon"
          :href="icon"
          class="absolute left-[10px] top-0 transition-all"
          x="5"
          y="5"
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
          y="10"
          x="6"
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
  'toggle'
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

const outerSquareBg = computed(() => props.active ? 'fill-red-700' : '!fill-[#191f20]')

const iconOpacity = computed(() => props.active ? '1' : '0.6')
</script>
