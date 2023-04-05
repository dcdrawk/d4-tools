<template>
  <font-awesome-icon
    :class="iconStyle"
    :icon="['fas', icon]"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'lightning'
  }
})

const iconMap = {
  lightning: {
    icon: 'bolt',
    style: 'text-blue-500/90'
  },
  fire: {
    icon: 'fire',
    style: 'text-orange-500/90'
  },
  cold: {
    icon: 'snowflake',
    style: 'text-teal-500/90'
  }
}

const icon = computed(() => {
  return iconMap[props.type as keyof typeof iconMap].icon
})

const iconStyle = computed(() => {
  return iconMap[props.type as keyof typeof iconMap].style
})

</script>
