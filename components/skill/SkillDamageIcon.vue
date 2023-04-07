<template>
  <font-awesome-icon
    :class="iconStyle"
    :icon="['fas', icon]"
  />
</template>

<script setup lang="ts">
interface Props {
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'lightning'
})

interface IIconMapItem {
  icon: string,
  style: string
}

interface IIconMap {
  [key: string]: IIconMapItem
}

const iconMap: IIconMap = {
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

const icon = computed<string>(() => iconMap[props.type as keyof typeof iconMap].icon)

const iconStyle = computed<string>(() => iconMap[props.type as keyof typeof iconMap].style)
</script>
