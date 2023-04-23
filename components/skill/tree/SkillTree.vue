<template>
  <div class="text-white">
    {{ hasHigherTierInvestedCore }}
  </div>
  <div
    ref="skillTreeRef"
    class="relative skill-tree"
  >
    <SkillTooltip
      v-if="tooltipStore?.visible"
      :name="tooltipStore.name"
      :active="tooltipStore.active"
      :rank="tooltipStore.rank"
      :rank-max="tooltipStore.rankMax"
      :description="tooltipStore.description"
      :description-values="tooltipStore.descriptionValues"
      :lucky-hit-chance="tooltipStore.luckyHitChance"
      :cooldown="tooltipStore.cooldown"
      :cooldown-values="tooltipStore.cooldownValues"
      :icon="tooltipStore.icon"
      :type="tooltipStore.type"
      :school="tooltipStore.school"
      :damage-type="tooltipStore.damageType"
      :modifier="tooltipStore.modifier"
      :category="tooltipStore.category"
      :translate-x="tooltipStore.x"
      :translate-y="tooltipStore.y"
    />

    <ClientOnly>
      <div class="absolute inline-block top-0 left-0 w-full h-[1000px] drop-shadow-[1px_1px_3px_rgba(0,0,0,0.69)]">
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
            :rank-required="2"
          />
          <SkillTierLine
            :parent="skillTreeRef"
            :el1="core?.$el"
            :el2="defensive?.$el"
            :rank="rank"
            :rank-required="6"
            :rank-start="2"
          />
        </BaseSVG>
      </div>
    </ClientOnly>

    <SkillTier
      ref="basic"
      class="translate-x-[450px]"
      :rank="rank"
      :tier="sorcererBasicTier"
      :higher-tier-invested="hasHigherTierInvestedBasic"
      @increment-skill="handleIncrementSkill"
      @decrement-skill="handleDecrementSkill"
      @activate-modifier="handleActivateModifier"
      @deactivate-modifier="handleDeactivateModifier"
      @increment-passive="handleIncrementPassive"
      @decrement-passive="handleDecrementPassive"
    />

    <SkillTier
      ref="core"
      class="translate-x-[220px] translate-y-[-270px]"
      :tier="sorcererCoreTier"
      :rank="rank"
      :rank-required="2"
      :icon="`${useRuntimeConfig().app.baseURL}svg/skill/tier/skill-tier-icon-core.svg`"
      :higher-tier-invested="hasHigherTierInvestedCore"
      :lower-tier-skill-count="skillCountBasic"
      @increment-skill="handleIncrementSkill"
      @decrement-skill="handleDecrementSkill"
      @activate-modifier="handleActivateModifier"
      @deactivate-modifier="handleDeactivateModifier"
      @increment-passive="handleIncrementPassive"
      @decrement-passive="handleDecrementPassive"
    />

    <SkillTier
      ref="defensive"
      class="translate-x-[550px] translate-y-[-450px]"
      :tier="sorcererDefensiveTier"
      :rank="rank"
      :rank-required="6"
      :icon="`${useRuntimeConfig().app.baseURL}svg/skill/tier/skill-tier-icon-core.svg`"
      @increment-skill="handleIncrementSkill"
      @decrement-skill="handleDecrementSkill"
      @activate-modifier="handleActivateModifier"
      @deactivate-modifier="handleDeactivateModifier"
      @increment-passive="handleIncrementPassive"
      @decrement-passive="handleDecrementPassive"
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
const defensive = ref()

/**
 * Skills / Tooltip
 */
const tooltipStore = useTooltipStore()
const sorcererBasicTier = useSorcererBasicTier()
const sorcererCoreTier = useSorcererCoreTier()
const sorcererDefensiveTier = useSorcererDefensiveTier()

const skillCountBasic = computed(() => getSkillCount(sorcererBasicTier.value))
const skillCountCore = computed(() => getSkillCount(sorcererCoreTier.value))
const skillCountDefensive = computed(() => getSkillCount(sorcererDefensiveTier.value))

const hasHigherTierInvestedBasic = computed(() => skillCountCore.value > 0)
const hasHigherTierInvestedCore = computed(() => skillCountDefensive.value > 0)

// const lowerTierSkillPointsCore = computed(() => skillCountBasic.value)
/**
 * Rank
 */
const rank = computed(() => {
  return (
    skillCountBasic.value +
    skillCountCore.value +
    skillCountDefensive.value
  )
})

function handleIncrementSkill (skill: any): void {
  if (skill.rank < skill.rankMax) {
    skill.rank++
    tooltipStore.rank++
  }
}

function handleDecrementSkill (skill: any): void {
  if (skill.rank <= 0) return

  if (skill.rank === 1 && skill.modifier.active) return

  skill.rank--
  tooltipStore.rank--
}

function hasChoiceModifierSelected (modifier: any): boolean {
  return !!modifier.choiceModifiers?.find((modifier: any) => modifier.active)
}

function handleActivateModifier ({ parent, modifier }: any): void {
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
