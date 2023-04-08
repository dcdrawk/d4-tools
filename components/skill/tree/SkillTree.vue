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

    <SkillTier
      :skills="sorcererBasicSkills"
      @increment-rank="handleIncrementRank($event)"
      @decrement-rank="handleDecrementRank($event)"
      @activate-modifier="handleActivateModifier($event.parent, $event.modifier)"
      @deactivate-modifier="handleDeactivateModifier($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { useTooltipStore } from '@/store/tooltip'

const tooltipStore = useTooltipStore()
const sorcererBasicSkills = useSorcererBasicSkills()

function handleIncrementRank (skill: any): void {
  if (skill.rank < skill.rankMax) {
    skill.rank++
    tooltipStore.rank++
  }
}

function handleDecrementRank (skill: any): void {
  if (skill.rank <= 0) return

  if (skill.rank === 1 && hasActiveModifiers(skill)) return

  skill.rank--
  tooltipStore.rank--
}

function hasActiveModifiers (skill: any): boolean {
  return !!skill.modifiers.find((modifier: any) => modifier.active)
}

function hasChoiceModifierSelected (modifier: any): boolean {
  return !!modifier.choiceModifiers?.find((modifier: any) => modifier.active)
}

function handleActivateModifier (parent: any, modifier: any): void {
  if (parent.rank === 0) return
  if (modifier.active) return
  if ((parent.choiceModifiers && !parent.active)) return
  if (parent.choiceModifiers && hasChoiceModifierSelected(parent)) return

  tooltipStore.active = true
  modifier.active = true
}

function handleDeactivateModifier (modifier: any): void {
  if (modifier.choiceModifiers && hasChoiceModifierSelected(modifier)) return

  tooltipStore.active = false
  modifier.active = false
}
</script>
