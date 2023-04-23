<template>
  <div
    class="tooltip fixed text-[#ddddde] z-50 top-[40px] left-[40px] w-[400px] flex flex-col border-[#2e3433] outline outline-4 outline-[#424847] border-0 transition-opacity drop-shadow-[1px_1px_3px_rgba(0,0,0,0.80)]"
    :style="{ transform: `translate(${translateX}px, ${translateY}px)`}"
  >
    <div class="tooltip__container relative bg-[#252321] p-4 select-none before:content-[''] shadow-[inset_0_0_0_3px_#252321,inset_0_0_0_4px_#393832]">
      <!-- Icon -->
      <div class="relative w-full flex items-center justify-center -top-12 -mb-10">
        <component
          :is="iconComponent"
          class="!block select-none relative"
          tooltip
          :class="iconStyles"
          :icon="icon"
        />
      </div>

      <!-- Name -->
      <h4
        class="font-display text-2xl text-center select-none mb-1 subpixel-antialiased text-white text-shadow-sm shadow-black"
      >
        {{ name }}
      </h4>

      <!-- Rank -->
      <div
        v-if="rank > 0"
        class="tooltip__rank text-lg bg-[#43443f] pt-[4px] pb-[2px] mb-2 font-display text-center text-white text-shadow-sm shadow-black shadow-sm"
      >
        RANK {{ rank }}/{{ rankMax }}
      </div>

      <div
        v-if="type && school"
      >
        <span class="inline-block px-2 py-[5px] border border-green-500 bg-green-900 text-shadow shadow-black mr-[5px]">{{ type }}</span>
        <span
          v-for="(schoolItem, index) of schools"
          :key="index"
          class="tooltip__school-item inline-block px-2 py-[5px] border border-gray-500 bg-gray-700 text-shadow shadow-black"
          :class="{ 'mr-[5px]': index + 1 < schools.length }"
        >{{ schoolItem }}</span>
      </div>

      <hr class="border-gray-500 my-2 select-none">

      <!-- Cooldown -->
      <p
        v-if="tooltipCooldown"
        class="tooltip__cooldown text-shadow-sm mb-1"
      >
        <span class="text-[#bcb19e]">Cooldown:</span> <span class="text-yellow-100">{{ tooltipCooldown }}</span> seconds
      </p>

      <!-- Cost -->
      <p
        v-if="costText"
        class="tooltip__cost text-shadow-sm mb-1"
      >
        <span class="text-[#bcb19e]">{{ costText }}:</span> <span class="text-yellow-100">{{ costValue }}</span>
      </p>

      <!-- Lucky Hit Chance -->
      <p
        v-if="luckyHitChance > 0"
        class="tooltip__lucky text-shadow-sm mb-1"
      >
        <span class="text-[#bcb19e]">Lucky Hit Chance:</span> <span class="text-yellow-100">{{ luckyHitChance }}%</span>
      </p>

      <!-- eslint-disable-next-line -->
      <p class="tooltip__description mb-2 subpixel-antialiased  text-shadow-sm shadow-black" v-html="tooltipDescription" />

      <!-- Next Rank -->
      <div class="tooltip__next-rank">
        <span class="text-[#bcb19e] block">Next Rank: </span>
        <ul
          v-if="nextRankVisible"
          class="list-disc list-outside"
        >
          <li
            v-for="(item, key) in nextRankList"
            :key="key"
            class="ml-4"
          >
            <span class="mr-2 capitalize">{{ key }}</span>
            <FontAwesomeIcon
              class="mr-2"
              :icon="['fas', 'caret-right']"
            />
            <span class="text-orange-200">{{ item }}</span>
          </li>
        </ul>
      </div>

      <div
        v-if="tooltipModifiersVisible"
      >
        <div
          class="tooltip__modifiers text-lg text-white bg-[#43443f] my-3 pt-[4px] pb-[2px] mb-2 font-display text-center text-shadow-sm shadow-black shadow-sm"
        >
          MODIFIERS
        </div>
        <ul
          class="tooltip__modifiers-list list-disc list-outside ml-4"
        >
          <!-- eslint-disable vue/no-v-html -->
          <li
            v-for="(modifierItem, index) in tooltipModifiers"
            :key="index"
            v-html="modifierItem"
          />
          <!-- eslint-enable vue/no-v-html -->
        </ul>
      </div>

      <!-- Choice Modifier Message -->
      <p
        v-if="isChoiceModifier"
        class="text-orange-500 text-shadow-sm shadow-black align-baseline"
      >
        You may only select one upgrade.
      </p>

      <!-- Bottom -->
      <div
        v-if="damageType || notLearnedVisible"
        class="flex flex-col items-end"
      >
        <hr
          v-if="damageType"
          class="w-1/2 border-gray-500 my-2 select-none"
        >
        <!-- Damage Type -->
        <p
          v-if="damageType"
          class="tooltip__damage-type"
        >
          <SkillDamageIcon
            class="mr-2"
            :type="damageType.toLowerCase()"
          />{{ damageType }} Damage
        </p>

        <!-- Not Learned Message -->
        <p
          v-if="notLearnedVisible"
          class="tooltip__not-learned text-red-500 mt-2 text-shadow-sm shadow-black"
        >
          Not Yet Learned
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ISkillModifier, ISkillDescriptionValues } from '@/utils/skills'

interface Props {
  active?: boolean
  name?: string
  description?: string
  descriptionValues?: ISkillDescriptionValues
  costText?: string
  costValue?: string
  cooldown?: string
  cooldownValues?: string
  luckyHitChance?: number
  rank?: number
  rankMax?: number
  icon?: string
  category?: string
  type?: string
  school?: string
  modifier?: ISkillModifier | undefined
  damageType?: string
  translateX?: number
  translateY?: number
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  name: '',
  description: '',
  descriptionValues: () => ({} as ISkillDescriptionValues),
  cooldown: '',
  cooldownValues: '',
  luckyHitChance: 0,
  costText: '',
  costValue: '',
  rank: 0,
  rankMax: 0,
  icon: '/svg/skill/tier/skill-tier-icon-basic.svg',
  category: '',
  type: '',
  school: '',
  modifier: undefined,
  damageType: '',
  translateX: 0,
  translateY: 0
})

const schools = computed(() => props.school?.split(','))

const notLearnedVisible = computed(() => {
  return props.rank <= 0 && !props.active
})

const tooltipDescription = computed(() => {
  if (Object.keys(props.descriptionValues).length === 0) return props.description

  let descValue = props.description

  Object.entries(props.descriptionValues)?.forEach(([key, value]) => {
    const valueArray = value.split(',')
    descValue = descValue.replace(`{${key}}`, valueArray[Math.max(0, props.rank - 1)])
  })

  return descValue
})

const tooltipCooldown = computed(() => {
  if (!props.cooldown && !props.cooldownValues) return

  if (!props.cooldownValues) return props.cooldown

  const cooldownValues = props.cooldownValues.split(',')
  return cooldownValues[Math.max(0, props.rank - 1)]
})

const nextRankVisible = computed(() => props.rank > 0 && props.rank !== props.rankMax)

const nextRankList = computed(() => {
  const nextRankObject: { [key: string]: any } = {}

  if (props.descriptionValues) {
    Object.entries(props.descriptionValues)?.forEach(([key, value]) => {
      const valueArray = value.split(',')
      nextRankObject[key] = valueArray[Math.min(props.rankMax, props.rank)]
    })
  }

  if (props.cooldownValues) {
    const cooldownValues = props.cooldownValues.split(',')
    nextRankObject.cooldown = cooldownValues[Math.max(0, props.rank)]
  }

  return nextRankObject
})

const tooltipModifiers = computed(() => {
  const modifiers: any[] = []

  if (props.modifier?.active) modifiers.push(props.modifier)

  props.modifier?.choiceModifiers
    ?.filter((choiceModifier: any) => choiceModifier.active)
    ?.forEach((choiceModifier: any) => modifiers.push(choiceModifier))

  return modifiers?.map((modifier) => {
    return modifier?.description
  })
})

const tooltipModifiersVisible = computed(() => tooltipModifiers.value.length)

const SkillItem = resolveComponent('SkillItem')
const SkillItemModifier = resolveComponent('SkillItemModifier')
const SkillPassive = resolveComponent('SkillPassive')

const iconComponent = computed(() => {
  switch (props.category) {
    case ('skill'):
      return SkillItem
    case ('passive'):
      return SkillPassive
    case ('modifier'):
    case ('choice-modifier'):
    default:
      return SkillItemModifier
  }
})

const isModifier = computed(() => {
  return props.category === 'modifier' || props.category === 'choice-modifier'
})

const isPassive = computed(() => {
  return props.category === 'passive'
})

const isChoiceModifier = computed(() => {
  return props.category === 'choice-modifier'
})

const iconStyles = computed(() => {
  return {
    'scale-[1.75] mb-6 top-[10px]': isModifier.value,
    'scale-[1.5] mb-6 top-3': isPassive.value
  }
})
</script>
