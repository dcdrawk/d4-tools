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
            :parent="skillTier"
            :el1="skillTierNode?.$el"
            :el2="skillRefs[skill.name]?.$el"
          />

          <SkillLine
            :active="skill.modifier.active"
            :parent="skillTier"
            :el1="skillRefs[skill.name]?.$el"
            :el2="skillModifierRefs[skill.modifier.name]?.$el"
          />

          <SkillLine
            v-for="choiceModifier in skill.modifier.choiceModifiers"
            :key="choiceModifier.name"
            :active="choiceModifier.active"
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
          @click="handleSkillClick(skill)"
          @contextmenu="handleSkillRightClick(skill)"
          @mouseover="handleSkillMouseOver(skill)"
          @mouseleave="tooltipStore.visible = false"
          @mouseout="tooltipStore.visible = false"
        >
          <SkillItemModifier
            :ref="el => { skillModifierRefs[skill.modifier.name] = el as ComponentPublicInstance }"
            :icon="skill.icon"
            class="absolute top-[10px] left-[10px]"
            :style="{ transform: skill.modifier.transform }"
            :active="skill.modifier.active"
            @click="handleModifierClick(skill, skill.modifier)"
            @contextmenu="handleModifierRightClick(skill.modifier)"
            @mouseover="handleModifierMouseOver(skill.modifier, skill.icon)"
            @mouseleave="tooltipStore.visible = false"
            @mouseout="tooltipStore.visible = false"
          >
            <SkillItemModifier
              v-for="choiceModifier in skill.modifier.choiceModifiers"
              :key="choiceModifier.name"
              :ref="el => { skillModifierRefs[choiceModifier.name] = el as ComponentPublicInstance }"
              :icon="skill.icon"
              class="choice-modifier absolute top-0 left-0"
              :style="{ transform: choiceModifier.transform }"
              :active="choiceModifier.active"
              @click="handleModifierClick(skill.modifier, choiceModifier)"
              @contextmenu="handleModifierRightClick(choiceModifier)"
              @mouseover="handleModifierMouseOver(choiceModifier, skill.icon, true)"
              @mouseleave="tooltipStore.visible = false"
              @mouseout="tooltipStore.visible = false"
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
            @click="handlePassiveClick(passive, skill)"
            @contextmenu="handlePassiveRightClick(passive, skill)"
            @mouseover="handlePassiveMouseOver(passive)"
            @mouseleave="tooltipStore.visible = false"
            @mouseout="tooltipStore.visible = false"
          />
        </template>
      </template>
    </SkillTierNode>
  </div>
</template>

<script setup lang="ts">
import { ISkillTier } from '@/utils/skills'
import { useTooltipStore } from '@/store/tooltip'
import SkillItem from '@/components/skill/SkillItem.vue'
import SkillItemModifier from '@/components/skill/SkillItemModifier.vue'

interface Props {
  rank?: number
  rankRequired?: number
  higherTierInvested?: boolean
  icon?: string
  tier?: ISkillTier
}

const props = withDefaults(defineProps<Props>(), {
  rank: 0,
  rankRequired: 0,
  higherTierInvested: false,
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

const allowLearnSkill = computed(() => props.rank >= props.tier.rankRequired)

const rankRequirementGates = [2, 6, 11, 16, 23, 33]

const tierPoints = computed(() => getSkillCount(props.tier))

const tierPointsTotal = computed(() => tierPoints.value + props.rankRequired)

const nextRankGate = computed(() => rankRequirementGates
  .filter((rank: number) => rank > props.rankRequired)
  .reduce(
    (prev, curr) => (Math.abs(curr - props.rankRequired) < Math.abs(prev - props.rankRequired) ? curr : prev),
    rankRequirementGates[0]
  )
)

// May need to adjust the logic after adding more skill tiers...
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
  if (allowLearnSkill.value) emit('activate-modifier', { parent, modifier })
}

function handleModifierRightClick (modifier: any): void {
  if (allowUnlearnSkill.value) emit('deactivate-modifier', modifier)
}

function handlePassiveClick (passive: any, group: any): void {
  if (allowLearnSkill.value) emit('increment-passive', { passive, group })
}

function handlePassiveRightClick (passive: any, group: any): void {
  if (allowUnlearnSkill.value) emit('decrement-passive', { passive, group })
}

function handleSkillMouseOver (skill: any): void {
  if (tooltipStore.visible === true) return

  const el = skillRefs.value[skill.name]?.$el

  tooltipStore.setSkill(skill, el)
}

function handleModifierMouseOver (modifier: any, icon: string, choiceModifier = false): void {
  if (tooltipStore.visible === true) return

  const el = skillModifierRefs.value[modifier.name]?.$el

  tooltipStore.setModifier(modifier, el, icon, choiceModifier)
}

function handlePassiveMouseOver (passive: any): void {
  if (tooltipStore.visible === true) return

  const el = skillRefs.value[passive.name]?.$el

  tooltipStore.setPassive(passive, el)
}

// interface IPassiveLine {
//   active: boolean
//   el: HTMLElement
//   path?: string
//   direction?: string
//   name?: string
// }

// function getPassiveLine (passive: ISkillPassive, group: ISkillPassiveGroup): IPassiveLine[] {
//   if (passive.connected) return [{ el: skillTierNode.value?.$el, direction: '', active: passive.rank > 0, path: passive.path }]

//   const connectedPassives = group.items.filter((passiveItem) => {
//     return (passiveItem as ISkillPassive).requiredFor?.find(requirement => requirement.name === passive.name)
//   })

//   return connectedPassives.map((passiveItem: ISkillPassive) => {
//     return {
//       active: passiveItem.rank > 0 && passive.rank > 0,
//       el: skillRefs.value[passiveItem.name]?.$el,
//       name: passiveItem.name,
//       direction: passiveItem.requiredFor?.find(requirement => requirement.name === passive.name)?.direction
//     }
//   })
// }
</script>
