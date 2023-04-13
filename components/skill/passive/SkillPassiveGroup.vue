<template>
  <div class="">
    <SkillPassive
      v-for="passive in passives"
      :key="passive.name"
      :style="{ transform: passive.transform }"
      :icon="passive.icon"
      :rank="passive.rank"
      :rank-max="passive.rankMax"
      @click="$emit('click', passive)"
      @contextmenu="$emit('contextmenu', passive)"
      @mouseover="$emit('mouseover', passive)"
      @mouseleave="$emit('mouseleave')"
      @mouseout="$emit('mouseout')"
    />
  </div>
</template>

<script setup lang="ts">
import { ISkillPassiveGroup } from '@/utils/skills'

defineEmits<{
  (e: 'click'): void
  (e: 'contextmenu'): void
  (e: 'mouseover'): void
  (e: 'mouseleave'): void
  (e: 'mouseout'): void
}>()

interface Props {
  passiveGroup: ISkillPassiveGroup,
  parent?: Element | undefined
}

const props = withDefaults(defineProps<Props>(), {
  parent: undefined
})

const passives = computed(() => props.passiveGroup.items)
</script>
