<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="viewBox"
    role="presentation"
  >
    <slot />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  width: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 0
  }
})

const viewBox = computed(() => `0 0 ${props.width} ${props.height}`)
</script>
