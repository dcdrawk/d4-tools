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
interface Props {
  width?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 0,
  height: 0
})

const viewBox = computed<string>(() => `0 0 ${props.width} ${props.height}`)
</script>
