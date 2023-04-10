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
      :icon="`${useRuntimeConfig().app.baseURL}svg/skill/tier/skill-tier-icon-basic.svg`"
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
        @contextmenu="handleSkillRightClick(skill)"
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
          @contextmenu="handleModifierRightClick(modifier)"
          @mouseover="handleModifierMouseOver(modifier, skill.icon)"
          @mouseleave="tooltipStore.visible = false"
          @mouseout="tooltipStore.visible = false"
        >
          <SkillItemModifier
            v-for="choiceModifier in modifier.choiceModifiers"
            :key="choiceModifier.name"
            :ref="el => { skillModifierRefs[choiceModifier.name] = el as ComponentPublicInstance }"
            :icon="skill.icon"
            class="choice-modifier absolute top-0 left-0"
            :style="{ transform: choiceModifier.transform }"
            :active="choiceModifier.active"
            @click="handleModifierClick(modifier, choiceModifier)"
            @contextmenu="handleModifierRightClick(choiceModifier)"
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

const emit = defineEmits<{
  (e: 'increment-rank', skill: any): void
  (e: 'decrement-rank', skill: any): void
  (e: 'activate-modifier', event: any): void
  (e: 'deactivate-modifier', event: any): void
  (e: 'contextmenu'): void
  (e: 'mouseover'): void
  (e: 'mouseleave'): void
  (e: 'mouseout'): void
}>()

function handleSkillClick (skill: any): void {
  emit('increment-rank', skill)
}

function handleSkillRightClick (skill: any): void {
  emit('decrement-rank', skill)
}

function handleModifierClick (parent: any, modifier: any): void {
  emit('activate-modifier', { parent, modifier })
}

function handleModifierRightClick (modifier: any): void {
  emit('deactivate-modifier', modifier)
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
