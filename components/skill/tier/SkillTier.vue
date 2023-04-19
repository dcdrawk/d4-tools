<template>
  <div
    ref="skillTier"
    class="relative w-[500px] h-[500px] pointer-events-none"
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
          v-for="skill in skillItemLines"
          :key="skill.name"
        >
          <SkillLine
            v-if="skillRefs[skill.name]"
            :active="(skill as ISkillItem).rank > 0"
            :parent="skillTier"
            :el1="skillTierItem?.$el"
            :el2="skillRefs[skill.name]?.$el"
          />

          <g
            v-for="modifier in (skill as ISkillItem).modifiers"
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
        <!-- Passive Lines -->
        <template
          v-for="skill in skillPassiveLines"
          :key="skill.name"
        >
          <g
            v-for="passive in (skill as ISkillPassiveGroup).items"
            :key="passive.name"
          >
            <SkillPassiveLine
              v-for="(line, index) in getPassiveLine(passive, (skill as ISkillPassiveGroup))"
              :key="`${passive.name}${index}`"
              :parent="skillTier"
              :active="line.active"
              :el1="line.el"
              :el2="skillRefs[passive.name]?.$el"
              :direct="(passive as ISkillPassive).direct"
              :direction="line.direction"
              :path="line.path"
            />
          </g>
        </template>
      </BaseSVG>
    </ClientOnly>

    <SkillTierNode
      ref="skillTierItem"
      :icon="icon"
      :rank="rank"
      :rank-required="rankRequired"
      class="translate-x-[210px] translate-y-[210px] pointer-events-auto"
    >
      <template
        v-for="(skill) in skills"
        :key="skill.name"
      >
        <SkillItem
          v-if="(skill as ISkillItem).icon"
          :ref="(el) => { skillRefs[skill.name] = el as ComponentPublicInstance }"
          class="absolute top-[12.5px] left-[12px]"
          :style="{ transform: (skill as ISkillItem).transform }"
          :icon="(skill as ISkillItem).icon"
          :rank="(skill as ISkillItem).rank"
          :rank-max="(skill as ISkillItem).rankMax"
          @click="handleSkillClick(skill)"
          @contextmenu="handleSkillRightClick(skill)"
          @mouseover="handleSkillMouseOver(skill)"
          @mouseleave="tooltipStore.visible = false"
          @mouseout="tooltipStore.visible = false"
        >
          <SkillItemModifier
            v-for="modifier in (skill as ISkillItem).modifiers"
            :key="modifier.name"
            :ref="el => { skillModifierRefs[modifier.name] = el as ComponentPublicInstance }"
            :icon="(skill as ISkillItem).icon"
            class="absolute top-[10px] left-[10px]"
            :style="{ transform: modifier.transform }"
            :active="modifier.active"
            @click="handleModifierClick(skill, modifier)"
            @contextmenu="handleModifierRightClick(modifier)"
            @mouseover="handleModifierMouseOver(modifier, (skill as ISkillItem).icon)"
            @mouseleave="tooltipStore.visible = false"
            @mouseout="tooltipStore.visible = false"
          >
            <SkillItemModifier
              v-for="choiceModifier in modifier.choiceModifiers"
              :key="choiceModifier.name"
              :ref="el => { skillModifierRefs[choiceModifier.name] = el as ComponentPublicInstance }"
              :icon="(skill as ISkillItem).icon"
              class="choice-modifier absolute top-0 left-0"
              :style="{ transform: choiceModifier.transform }"
              :active="choiceModifier.active"
              @click="handleModifierClick(modifier, choiceModifier)"
              @contextmenu="handleModifierRightClick(choiceModifier)"
              @mouseover="handleModifierMouseOver(choiceModifier, (skill as ISkillItem).icon, true)"
              @mouseleave="tooltipStore.visible = false"
              @mouseout="tooltipStore.visible = false"
            />
          </SkillItemModifier>
        </SkillItem>

        <template v-else>
          <SkillPassive
            v-for="passive in (skill as ISkillPassiveGroup).items"
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
import { ISkillItem, ISkillPassive, ISkillPassiveGroup } from '@/utils/skills'
import { useTooltipStore } from '@/store/tooltip'
import SkillItem from '@/components/skill/SkillItem.vue'
import SkillItemModifier from '@/components/skill/SkillItemModifier.vue'

interface Props {
  skills: (ISkillItem | ISkillPassiveGroup)[]
  rank?: number
  rankRequired?: number
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  skills: () => [],
  rank: 0,
  rankRequired: 0,
  icon: () => `${useRuntimeConfig().app.baseURL}svg/skill/tier/skill-tier-icon-basic.svg`
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

const isActive = computed(() => props.rank >= props.rankRequired)

function handleSkillClick (skill: any): void {
  if (isActive.value) emit('increment-skill', skill)
}

function handleSkillRightClick (skill: any): void {
  if (isActive.value) emit('decrement-skill', skill)
}

function handleModifierClick (parent: any, modifier: any): void {
  if (isActive.value) emit('activate-modifier', { parent, modifier })
}

function handleModifierRightClick (modifier: any): void {
  if (isActive.value) emit('deactivate-modifier', modifier)
}

function handlePassiveClick (passive: any, group: any): void {
  if (isActive.value) emit('increment-passive', { passive, group })
}

function handlePassiveRightClick (passive: any, group: any): void {
  if (isActive.value) emit('decrement-passive', { passive, group })
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

const skillItemLines = computed(() => props.skills.filter(skill => !(skill as ISkillPassiveGroup).items))

const skillPassiveLines = computed(() => props.skills.filter(skill => (skill as ISkillPassiveGroup).items))

interface IPassiveLine {
  active: boolean
  el: HTMLElement
  path?: string
  direction?: string
  name?: string
}

function getPassiveLine (passive: ISkillPassive, group: ISkillPassiveGroup): IPassiveLine[] {
  if (passive.connected) return [{ el: skillTierItem.value?.$el, direction: '', active: passive.rank > 0, path: passive.path }]

  const connectedPassives = group.items.filter((passiveItem) => {
    return (passiveItem as ISkillPassive).requiredFor?.find(requirement => requirement.name === passive.name)
  })

  return connectedPassives.map((passiveItem: ISkillPassive) => {
    return {
      active: passiveItem.rank > 0 && passive.rank > 0,
      el: skillRefs.value[passiveItem.name]?.$el,
      name: passiveItem.name,
      direction: passiveItem.requiredFor?.find(requirement => requirement.name === passive.name)?.direction
    }
  })
}
</script>
