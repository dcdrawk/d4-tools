<template>
  <div
    ref="skillTier"
    class="relative w-[500px] h-[500px] pointer-events-none drop-shadow-[1px_1px_3px_rgba(0,0,0,0.69)]"
  >
    <!-- Connecting Lines -->
    <ClientOnly>
      <BaseSVG
        ref="skillLines"
        :width="500"
        :height="500"
        class="absolute top-0 left-0 pointer-events-none"
      >
        <!-- Skill Lines -->
        <g
          v-for="skill in tier.skills"
          :key="skill.name"
        >
          <SkillLine
            v-if="skillRefs[skill.name]"
            :active="skill.rank > 0"
            :highlight="skill.rank === 0 && allowLearnSkill"
            :parent="skillTier"
            :el1="skillTierNode?.$el"
            :el2="skillRefs[skill.name]?.$el"
          />

          <SkillLine
            :active="skill.modifier.active"
            :highlight="skill.rank > 0"
            :parent="skillTier"
            :el1="skillRefs[skill.name]?.$el"
            :el2="skillModifierRefs[skill.modifier.name]?.$el"
          />

          <SkillLine
            v-for="choiceModifier in skill.modifier.choiceModifiers"
            :key="choiceModifier.name"
            :active="choiceModifier.active"
            :highlight="highlightChoiceModifier(choiceModifier.name, skill.modifier)"
            :parent="skillTier"
            :el1="skillModifierRefs[skill.modifier.name]?.$el"
            :el2="skillModifierRefs[choiceModifier.name]?.$el"
          />
        </g>

        <!-- Passive Lines -->
        <template
          v-for="passiveGroup in tier.passives"
          :key="passiveGroup.name"
        >
          <g
            v-for="passive in passiveGroup.items"
            :key="passive.name"
          >
            <SkillPassiveLine
              v-for="(line, index) in getPassiveLine(passive, passiveGroup, skillTierNode.$el, skillRefs)"
              :key="`${passive.name}${index}`"
              :parent="skillTier"
              :active="line.active"
              :highlight="highlightPassive(passive, passiveGroup)"
              :el1="line.el"
              :el2="skillRefs[passive.name]?.$el"
              :direct="passive.direct"
              :direction="line.direction"
              :path="line.path"
            />
          </g>
        </template>
      </BaseSVG>
    </ClientOnly>

    <SkillTierNode
      ref="skillTierNode"
      :icon="icon"
      :rank="rank"
      :rank-required="rankRequired"
      class="translate-x-[210px] translate-y-[210px] pointer-events-auto"
    >
      <template
        v-for="(skill) in tier.skills"
        :key="skill.name"
      >
        <SkillItem
          :ref="(el) => { skillRefs[skill.name] = el as ComponentPublicInstance }"
          class="absolute top-[12.5px] left-[12px]"
          :style="{ transform: skill.transform }"
          :icon="skill.icon"
          :rank="skill.rank"
          :rank-max="skill.rankMax"
          :highlight="skill.rank === 0 && allowLearnSkill"
          @click="handleSkillClick(skill)"
          @contextmenu="handleSkillRightClick(skill)"
          @mouseover="handleSkillMouseOver(skill)"
          @mouseleave="tooltipStore.visible = false"
        >
          <SkillItemModifier
            :ref="el => { skillModifierRefs[skill.modifier.name] = el as ComponentPublicInstance }"
            :icon="skill.icon"
            class="absolute top-[10px] left-[10px]"
            :style="{ transform: skill.modifier.transform }"
            :highlight="skill.rank > 0"
            :active="skill.modifier.active"
            @click="handleModifierClick(skill, skill.modifier)"
            @contextmenu="handleModifierRightClick(skill.modifier)"
            @mouseover="handleModifierMouseOver(skill.modifier, skill.icon)"
            @mouseleave="tooltipStore.visible = false"
          >
            <SkillItemModifier
              v-for="choiceModifier in skill.modifier.choiceModifiers"
              :key="choiceModifier.name"
              :ref="el => { skillModifierRefs[choiceModifier.name] = el as ComponentPublicInstance }"
              :icon="skill.icon"
              :highlight="highlightChoiceModifier(choiceModifier.name, skill.modifier)"
              class="choice-modifier absolute top-0 left-0"
              :style="{ transform: choiceModifier.transform }"
              :active="choiceModifier.active"
              @click="handleModifierClick(skill.modifier, choiceModifier)"
              @contextmenu="handleModifierRightClick(choiceModifier)"
              @mouseover="handleModifierMouseOver(choiceModifier, skill.icon, true)"
              @mouseleave="tooltipStore.visible = false"
            />
          </SkillItemModifier>
        </SkillItem>

        <template
          v-for="passiveGroup in tier.passives"
          :key="passiveGroup.name"
        >
          <SkillPassive
            v-for="passive in passiveGroup.items"
            :ref="(el) => { skillRefs[passive.name] = el as ComponentPublicInstance }"
            :key="passive.name"
            class="absolute top-[24px] left-[24px]"
            :style="{ transform: passive.transform }"
            :icon="passive.icon"
            :rank="passive.rank"
            :rank-max="passive.rankMax"
            :highlight="highlightPassive(passive, passiveGroup)"
            @click="handlePassiveClick(passive, passiveGroup)"
            @contextmenu="handlePassiveRightClick(passive, passiveGroup)"
            @mouseover="handlePassiveMouseOver(passive)"
            @mouseleave="tooltipStore.visible = false"
          />
        </template>
      </template>
    </SkillTierNode>
  </div>
</template>

<script setup lang="ts">
import { ISkillTier, ISkillPassive } from '@/utils/skills'
import { useTooltipStore } from '@/store/tooltip'
import SkillItem from '@/components/skill/SkillItem.vue'
import SkillItemModifier from '@/components/skill/SkillItemModifier.vue'

interface Props {
  rank?: number
  rankRequired?: number
  higherTierInvested?: boolean
  lowerTierSkillCount?: number
  icon?: string
  tier?: ISkillTier
}

const props = withDefaults(defineProps<Props>(), {
  rank: 0,
  rankRequired: 0,
  higherTierInvested: false,
  lowerTierSkillCount: 0,
  icon: () => `${useRuntimeConfig().app.baseURL}svg/skill/tier/skill-tier-icon-basic.svg`,
  tier: () => ({ name: '', rankRequired: 0, skills: [], passives: [] })
})

interface IRefObject {
  [key: string]: ComponentPublicInstance | null
}

const skillTier = ref()
const skillTierNode = ref()
const skillLines = ref()
const skillRefs = ref<IRefObject>({})
const skillModifierRefs = ref<IRefObject>({})

const tooltipStore = useTooltipStore()

const emit = defineEmits<{
  (e: 'increment-skill', skill: any): void
  (e: 'increment-passive', skill: any): void
  (e: 'decrement-skill', skill: any): void
  (e: 'decrement-passive', skill: any): void
  (e: 'activate-modifier', event: any): void
  (e: 'deactivate-modifier', event: any): void
  (e: 'contextmenu'): void
  (e: 'mouseover'): void
  (e: 'mouseleave'): void
  (e: 'mouseout'): void
}>()

const allowLearnModifierPassive = computed(() => props.rank >= props.tier.rankRequired)

const allowLearnSkill = computed(() => {
  const allowLearnUltimate = !!(getSkillCount(props.tier.skills) <= 0 && allowLearnModifierPassive.value)

  return props.tier.name === 'Ultimate'
    ? allowLearnUltimate
    : allowLearnModifierPassive.value
})

const rankRequirementGates = [2, 6, 11, 16, 23, 33]

const tierPoints = computed(() => getTierPointCount(props.tier))

const tierPointsTotal = computed(() => tierPoints.value + props.lowerTierSkillCount)

const nextRankGate = computed(() => rankRequirementGates
  .filter((rank: number) => rank > props.rankRequired)
  ?.reduce((prev: number) => prev)
)

const allowUnlearnSkill = computed(() => (
  !(tierPointsTotal.value === nextRankGate.value && props.higherTierInvested)
))

function handleSkillClick (skill: any): void {
  if (allowLearnSkill.value) emit('increment-skill', skill)
}

function handleSkillRightClick (skill: any): void {
  if (allowUnlearnSkill.value) emit('decrement-skill', skill)
}

function handleModifierClick (parent: any, modifier: any): void {
  if (allowLearnModifierPassive.value) emit('activate-modifier', { parent, modifier })
}

function handleModifierRightClick (modifier: any): void {
  if (allowUnlearnSkill.value) emit('deactivate-modifier', modifier)
}

function handlePassiveClick (passive: any, group: any): void {
  if (allowLearnModifierPassive.value) emit('increment-passive', { passive, group })
}

function handlePassiveRightClick (passive: any, group: any): void {
  if (allowUnlearnSkill.value) emit('decrement-passive', { passive, group })
}

function handleSkillMouseOver (skill: any): void {
  if (tooltipStore.visible === true) return

  tooltipStore.setSkill(skill, skillRefs.value[skill.name] as ComponentPublicInstance)
}

function handleModifierMouseOver (modifier: any, icon: string, choiceModifier = false): void {
  if (tooltipStore.visible === true) return

  tooltipStore.setModifier(modifier, (skillModifierRefs.value[modifier.name] as ComponentPublicInstance), icon, choiceModifier)
}

function handlePassiveMouseOver (passive: any): void {
  if (tooltipStore.visible === true) return

  tooltipStore.setPassive(passive, skillRefs.value[passive.name] as ComponentPublicInstance)
}

function highlightChoiceModifier (choiceModifierName: string, modifier: any) {
  const otherModifierActive = !!modifier.choiceModifiers.find(
    (choiceModifier: any) => {
      return choiceModifier.name !== choiceModifierName && choiceModifier.active
    }
  )
  return modifier.active && !otherModifierActive
}

function highlightPassive (passive: any, passiveGroup: any) {
  if (passive.connected && allowLearnModifierPassive.value) return true

  const requiredPassivesRank = passiveGroup.items.filter((passiveItem: ISkillPassive) => {
    return passiveItem.requiredFor?.find(requirement => requirement.name === passive.name)
  }).reduce((acc: number, curr: any) => acc + curr.rank, 0)

  return requiredPassivesRank > 0
}
</script>
