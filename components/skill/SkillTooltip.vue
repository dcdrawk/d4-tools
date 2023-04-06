<template>
  <div
    class="tooltip text-[#ddddde] absolute z-50 top-[40px] left-[40px] w-[400px] flex flex-col border-[#2d3c38] border-4 transition-opacity drop-shadow-lg"
    :style="{ transform: `translate(${translateX}px, ${translateY}px)`}"
  >
    <div class="tooltip__container relative bg-[#252321] border-[#060604] border-2 p-4 select-none">
      <!-- Icon -->
      <div class="relative w-full flex items-center justify-center -top-12 -mb-10">
        <component
          :is="iconComponent"
          class="!block select-none relative"
          :class="iconStyles"
          :icon="icon"
        />
      </div>

      <!-- Name -->
      <h4
        class="font-display text-xl text-center select-none shadow-black mb-2 subpixel-antialiased"
        style="backface-visibility: hidden;"
      >
        {{ name }}
      </h4>

      <!-- Rank -->
      <div
        v-if="rank > 0"
        class="tooltip__rank bg-[#43443f] pt-[6px] pb-[4px] mb-2 font-display text-center text-shadow-sm shadow-black shadow-sm"
      >
        RANK {{ rank }}/{{ rankMax }}
      </div>

      <div
        v-if="type && school"
      >
        <span class="inline-block px-2 py-[5px] border border-green-500 bg-green-900 text-shadow shadow-black mr-[5px]">{{ type }}</span>
        <span class="inline-block px-2 py-[5px] border border-gray-500 bg-gray-700 text-shadow shadow-black">{{ school }}</span>
      </div>

      <hr class="border-gray-500 my-2 select-none">

      <!-- eslint-disable-next-line -->
      <p class="mb-2 subpixel-antialiased  text-shadow-sm shadow-black" v-html="tooltipDescription" />

      <!-- Next Rank -->
      <ul
        v-if="nextRankVisible"
        class="list-disc list-outside"
      >
        Next Rank:
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
          <span class="text-orange-300">{{ item }}</span>
        </li>
      </ul>

      <div
        v-if="tooltipModifiersVisible"
      >
        <div class="tooltip__modifiers bg-[#43443f] my-3 pt-[6px] pb-[4px] mb-2 font-display text-center text-shadow-sm shadow-black shadow-sm">
          MODIFIERS
        </div>
        <ul
          class="list-disc list-outside ml-4"
        >
          <!-- eslint-disable vue/no-v-html -->
          <li
            v-for="(modifier, index) in tooltipModifiers"
            :key="index"
            v-html="modifier"
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
        <p v-if="damageType">
          <SkillDamageIcon
            class="mr-2"
            :type="damageType.toLowerCase()"
          />{{ damageType }} Damage
        </p>

        <!-- Not Learned Message -->
        <p
          v-if="notLearnedVisible"
          class="text-red-500 mt-2 text-shadow-sm shadow-black"
        >
          Not Yet Learned
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  descriptionValues: {
    type: Object,
    default () {
      return {}
    }
  },
  icon: {
    type: String,
    default: ''
  },
  rank: {
    type: Number,
    default: 0
  },
  rankMax: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  school: {
    type: String,
    default: ''
  },
  modifiers: {
    type: Array,
    default: () => []
  },
  damageType: {
    type: String,
    default: ''
  },
  translateX: {
    type: Number,
    default: 0
  },
  translateY: {
    type: Number,
    default: 0
  }
})

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

const nextRankVisible = computed(() => props.rank > 0 && props.rank !== props.rankMax)

const nextRankList = computed(() => {
  const nextRankObject: { [key: string]: any } = {}

  Object.entries(props.descriptionValues)?.forEach(([key, value]) => {
    const valueArray = value.split(',')
    nextRankObject[key] = valueArray[Math.min(props.rankMax, props.rank)]
  })

  return nextRankObject
})

const tooltipModifiers = computed(() => {
  const modifiers: any[] = []

  props.modifiers?.forEach((modifier: any) => {
    if (modifier.active) modifiers.push(modifier)

    modifier?.choiceModifiers
      ?.filter((choiceModifier: any) => choiceModifier.active)
      ?.forEach((choiceModifier: any) => modifiers.push(choiceModifier))
  })

  return modifiers?.map((modifier) => {
    if (!modifier) return ''
    return modifier?.description
  })
})

const tooltipModifiersVisible = computed(() => tooltipModifiers.value.length)

const SkillItem = resolveComponent('SkillItem')
const SkillItemModifier = resolveComponent('SkillItemModifier')

const iconComponent = computed(() => {
  switch (props.category) {
    case ('skill'):
      return SkillItem
    case ('modifier'):
    case ('choice-modifier'):
    default:
      return SkillItemModifier
  }
})

const isModifier = computed(() => {
  return props.category === 'modifier' || props.category === 'choice-modifier'
})

const isChoiceModifier = computed(() => {
  return props.category === 'choice-modifier'
})

const iconStyles = computed(() => {
  return {
    'text-center scale-[1.75] mb-6 top-2': isModifier.value
  }
})
</script>

<style scoped lang="postcss">
.tooltip {
  &__rank,
  &__modifiers {
    background: url('/svg/tooltip-span-bg.svg');
    background-repeat: repeat;
    background-size: 200px 200px;
  }
}
</style>
