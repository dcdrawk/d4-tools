<template>
  <div
    ref="skillTier"
    class="relative w-[500px] h-[500px]"
  >
    <!-- Connecting Lines -->
    <ClientOnly>
      <BaseSVG
        ref="skillLines"
        :width="500"
        :height="500"
        class="absolute top-0 left-0 pointer-events-none"
      >
        <g
          v-for="skill in skills"
          :key="skill.name"
        >
          <SkillLine
            v-if="skillRefs[skill.name]"
            :active="skill.rank > 0"
            :parent="skillTier"
            :el1="skillTierItem?.$el"
            :el2="skillRefs[skill.name]?.$el"
          />

          <g
            v-for="modifier in skill.modifiers"
            :key="modifier.name"
          >
            <SkillLine
              :active="modifier.active"
              :parent="skillTier"
              :el1="skillRefs[skill.name]?.$el"
              :el2="skillModifierRefs[modifier.name]?.$el"
            />
            <SkillLine
              v-for="choiceModifier in modifier.choiceModifiers"
              :key="choiceModifier.name"
              :active="choiceModifier.active"
              :parent="skillTier"
              :el1="skillModifierRefs[modifier.name]?.$el"
              :el2="skillModifierRefs[choiceModifier.name]?.$el"
            />
          </g>
        </g>
      </BaseSVG>
    </ClientOnly>

    <SkillTierNode
      ref="skillTierItem"
      class="translate-x-[210px] translate-y-[210px]"
    >
      <SkillItem
        v-for="(skill) in skills"
        :key="skill.name"
        :ref="(el) => { skillRefs[skill.name] = el as ComponentPublicInstance }"
        class="absolute top-[12.5px] left-[12px]"
        :style="{ transform: skill.transform }"
        :active="skill.rank > 0"
        :icon="skill.icon"
        :rank="skill.rank"
        :rank-max="skill.rankMax"
        @click="handleSkillClick(skill)"
        @right-click="handleSkillRightClick(skill)"
        @mouseover="handleSkillMouseOver(skill)"
        @mouseleave="tooltipStore.visible = false"
        @mouseout="tooltipStore.visible = false"
      >
        <SkillItemModifier
          v-for="modifier in skill.modifiers"
          :key="modifier.name"
          :ref="el => { skillModifierRefs[modifier.name] = el as ComponentPublicInstance }"
          :icon="skill.icon"
          class="absolute top-[10px] left-[10px]"
          :style="{ transform: modifier.transform }"
          :active="modifier.active"
          @click="handleModifierClick(skill, modifier)"
          @right-click="handleModifierRightClick(modifier)"
          @mouseover="handleModifierMouseOver(modifier, skill.icon)"
          @mouseleave="tooltipStore.visible = false"
          @mouseout="tooltipStore.visible = false"
        >
          <SkillItemModifier
            v-for="choiceModifier in modifier.choiceModifiers"
            :key="choiceModifier.name"
            :ref="el => { skillModifierRefs[choiceModifier.name] = el as ComponentPublicInstance }"
            :icon="skill.icon"
            class="absolute top-0 left-0"
            :style="{ transform: choiceModifier.transform }"
            :active="choiceModifier.active"
            @click="handleModifierClick(modifier, choiceModifier)"
            @right-click="handleModifierRightClick(choiceModifier)"
            @mouseover="handleModifierMouseOver(choiceModifier, skill.icon, true)"
            @mouseleave="tooltipStore.visible = false"
            @mouseout="tooltipStore.visible = false"
          />
        </SkillItemModifier>
      </SkillItem>
    </SkillTierNode>
  </div>
</template>

<script setup lang="ts">
import { ISkillItem } from '@/utils/skills'
import { useTooltipStore } from '@/store/tooltip'
import SkillItem from '@/components/skill/SkillItem.vue'
import SkillItemModifier from '@/components/skill/SkillItemModifier.vue'

interface Props {
  skills: ISkillItem[]
}

withDefaults(defineProps<Props>(), {
  skills: () => []
})

interface IRefObject {
  [key: string]: ComponentPublicInstance | null
}

const skillTier = ref()
const skillTierItem = ref()
const skillLines = ref()
const skillRefs = ref<IRefObject>({})
const skillModifierRefs = ref<IRefObject>({})

const tooltipStore = useTooltipStore()

function handleSkillClick (skill: any): void {
  if (skill.rank < skill.rankMax) {
    skill.rank++
    tooltipStore.rank++
  }
}

function handleSkillRightClick (skill: any): void {
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

function handleModifierClick (parent: any, modifier: any): void {
  if (parent.rank === 0) return
  if (modifier.active) return
  if ((parent.choiceModifiers && !parent.active)) return
  if (parent.choiceModifiers && hasChoiceModifierSelected(parent)) return

  tooltipStore.active = true
  modifier.active = true
}

function handleModifierRightClick (modifier: any): void {
  if (modifier.choiceModifiers && hasChoiceModifierSelected(modifier)) return

  tooltipStore.active = false
  modifier.active = false
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
</script>
