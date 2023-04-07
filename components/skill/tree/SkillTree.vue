<template>
  <div class="relative">
    <SkillTooltip
      v-if="tooltipStore.visible || tooltipStore.name === 'Enhanced Spark'"
      :name="tooltipStore.name"
      :active="tooltipStore.active"
      :rank="tooltipStore.rank"
      :rank-max="tooltipStore.rankMax"
      :description="tooltipStore.description"
      :description-values="tooltipStore.descriptionValues"
      :icon="tooltipStore.icon"
      :type="tooltipStore.type"
      :school="tooltipStore.school"
      :damage-type="tooltipStore.damageType"
      :modifiers="tooltipStore.modifiers"
      :category="tooltipStore.category"
      :translate-x="tooltipStore.x"
      :translate-y="tooltipStore.y"
    />

    <SkillTier />
  </div>
</template>

<script setup lang="ts">
import { useTooltipStore } from '@/store/tooltip'

const tooltipStore = useTooltipStore()
</script>
