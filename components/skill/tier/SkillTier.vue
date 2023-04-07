<template>
  <div class="relative">
    <!-- Connecting Lines -->
    <ClientOnly>
      <BaseSVG
        :width="500"
        :height="500"
        class="absolute top-0 left-0"
      >
        <g
          v-for="skill in skills"
          :key="skill.name"
        >
          <SkillLine
            v-if="skillRefs[skill.name]"
            :active="skill.rank > 0"
            :el1="skillTier?.$el"
            :el2="skillRefs[skill.name]?.$el"
          />

          <g
            v-for="modifier in skill.modifiers"
            :key="modifier.name"
          >
            <SkillLine
              :active="modifier.active"
              :el1="skillRefs[skill.name]?.$el"
              :el2="skillModifierRefs[modifier.name]?.$el"
            />
            <SkillLine
              v-for="choiceModifier in modifier.choiceModifiers"
              :key="choiceModifier.name"
              :active="choiceModifier.active"
              :el1="skillModifierRefs[modifier.name]?.$el"
              :el2="skillModifierRefs[choiceModifier.name]?.$el"
            />
          </g>
        </g>
      </BaseSVG>
    </ClientOnly>

    <SkillTierNode
      ref="skillTier"
      class="translate-x-[230px] translate-y-[230px]"
    >
      <SkillItem
        v-for="(skill) in skills"
        :key="skill.name"
        :ref="el => { skillRefs[skill.name] = el }"
        class="absolute top-[12.5px] left-[12px]"
        :style="{ transform: skill.transform }"
        :name="skill.name"
        :description="skill.description"
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
          :ref="el => { skillModifierRefs[modifier.name] = el }"
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
            :ref="el => { skillModifierRefs[choiceModifier.name] = el }"
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
import { useTooltipStore } from '@/store/tooltip'

const skillTier = ref()
const skillRefs = ref<any>({})
const skillModifierRefs = ref<any>({})
const skills = useSorcererBasicSkills()

const tooltipStore = useTooltipStore()

function handleSkillClick (skill: any) {
  if (skill.rank < skill.rankMax) {
    skill.rank++
    tooltipStore.rank++
  }
}

function handleSkillRightClick (skill: any) {
  if (skill.rank <= 0) return

  if (skill.rank === 1 && hasActiveModifiers(skill)) return

  skill.rank--
  tooltipStore.rank--
}

function hasActiveModifiers (skill: any) {
  return !!skill.modifiers.find((modifier: any) => modifier.active)
}

function hasChoiceModifierSelected (modifier: any) {
  return !!modifier.choiceModifiers?.find((modifier: any) => modifier.active)
}

function handleModifierClick (parent: any, modifier: any) {
  if (parent.rank === 0) return
  if (modifier.active) return
  if ((parent.choiceModifiers && !parent.active)) return
  if (parent.choiceModifiers && hasChoiceModifierSelected(parent)) return

  tooltipStore.active = true
  modifier.active = true
}

function handleModifierRightClick (modifier: any) {
  if (modifier.choiceModifiers && hasChoiceModifierSelected(modifier)) return

  tooltipStore.active = false
  modifier.active = false
}

function handleSkillMouseOver (skill: any) {
  if (tooltipStore.visible === true) return

  const el = skillRefs.value[skill.name].$el

  tooltipStore.setSkill(skill, el)
}

function handleModifierMouseOver (modifier: any, icon: string, choiceModifier = false) {
  if (tooltipStore.visible === true) return

  const el = skillModifierRefs.value[modifier.name].$el

  tooltipStore.setModifier(modifier, el, icon, choiceModifier)
}
</script>
