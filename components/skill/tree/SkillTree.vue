<template>
  <div
    ref="skillTreeRef"
    class="relative"
  >
    <SkillTooltip
      v-if="tooltipStore?.visible"
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

    <ClientOnly>
      <div class="absolute inline-block top-0 left-0 w-full h-[1000px]">
        <BaseSVG
          v-if="skillTreeRef"
          class="inline-block"
          :width="1280"
          :height="1000"
        >
          <SkillTierLine
            :parent="skillTreeRef"
            :el1="basic?.$el"
            :el2="core?.$el"
            :rank="rank"
            :rank-required="5"
          />
        </BaseSVG>
      </div>
    </ClientOnly>

    <SkillTier
      ref="basic"
      class="translate-x-[500px]"
      :skills="sorcererBasicSkills"
      @increment-skill="handleIncrementSkill($event)"
      @decrement-skill="handleDecrementSkill($event)"
      @activate-modifier="handleActivateModifier($event.parent, $event.modifier)"
      @deactivate-modifier="handleDeactivateModifier($event)"
    />

    <SkillTier
      ref="core"
      class="translate-x-[270px] translate-y-[-270px]"
      :skills="sorcererCoreSkills"
      :icon="`${useRuntimeConfig().app.baseURL}svg/skill/tier/skill-tier-icon-core.svg`"
      @increment-skill="handleIncrementSkill($event)"
      @decrement-skill="handleDecrementSkill($event)"
      @activate-modifier="handleActivateModifier($event.parent, $event.modifier)"
      @deactivate-modifier="handleDeactivateModifier($event)"
      @increment-passive="handleIncrementPassive($event)"
      @decrement-passive="handleDecrementPassive($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { useTooltipStore } from '@/store/tooltip'
/**
 * Template Refs
 */
const skillTreeRef = ref()
const basic = ref()
const core = ref()

/**
 * Skills / Tooltip
 */
const sorcererBasicSkills = useSorcererBasicSkills()
const sorcererCoreSkills = useSorcererCoreSkills()
const tooltipStore = useTooltipStore()

const allSorcererSkills = computed(() => ([
  ...sorcererBasicSkills.value,
  ...sorcererCoreSkills.value
]))

/**
 * Rank
 */
const rank = computed(() => {
  return allSorcererSkills.value.reduce((accumulator: number, skill: any) => {
    if (skill.rank) {
      const modifierValue = skill.modifiers[0].active ? 1 : 0
      const choiceModifierValue = skill.modifiers[0].choiceModifiers.find((modifier: any) => modifier.active) ? 1 : 0
      return accumulator + skill.rank + modifierValue + choiceModifierValue
    }
    return accumulator
  }, 0)
})

function handleIncrementSkill (skill: any): void {
  if (skill.rank < skill.rankMax) {
    skill.rank++
    tooltipStore.rank++
  }
}

function hasActiveModifiers (skill: any): boolean {
  return !!skill.modifiers?.find((modifier: any) => modifier.active)
}

function handleDecrementSkill (skill: any): void {
  if (skill.rank <= 0) return

  if (skill.rank === 1 && hasActiveModifiers(skill)) return

  skill.rank--
  tooltipStore.rank--
}

function hasChoiceModifierSelected (modifier: any): boolean {
  return !!modifier.choiceModifiers?.find((modifier: any) => modifier.active)
}

function handleActivateModifier (parent: any, modifier: any): void {
  if (parent.rank === 0) return
  if (modifier.active) return
  if ((parent.choiceModifiers && !parent.active)) return
  if (hasChoiceModifierSelected(parent)) return

  tooltipStore.active = true
  modifier.active = true
}

function handleDeactivateModifier (modifier: any): void {
  if (hasChoiceModifierSelected(modifier)) return

  tooltipStore.active = false
  modifier.active = false
}

function handleIncrementPassive ({ passive, group }: any): void {
  const isLessThanRankMax = passive.rank < passive.rankMax

  const meetsRequirements = (passive.connected && isLessThanRankMax) || (group.items
    .filter((passiveItem: any) => passiveItem?.requiredFor?.find((requirement: any) => requirement.name === passive.name))
    .reduce((accumulator: number, currentValue: any) => accumulator + currentValue.rank, 0) > 0 && isLessThanRankMax)

  if (meetsRequirements) {
    passive.rank++
    tooltipStore.rank++
  }
}

function handleDecrementPassive ({ passive, group }: any): void {
  if (passive.rank <= 0) return

  const hasActiveRequirement = passive.requiredFor?.filter((requiremnt: any) => {
    return group.items.find((groupItem: any) => groupItem.name === requiremnt.name && groupItem.rank > 0)
  }).length > 0

  if (passive.rank === 1 && hasActiveRequirement) return

  passive.rank--
  tooltipStore.rank--
}
</script>
