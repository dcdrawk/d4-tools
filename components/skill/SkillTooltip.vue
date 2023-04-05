<template>
  <div
    class="tooltip absolute z-50 top-[40px] left-[40px] w-[400px] flex flex-col text-white border-[#2d3c38] border-4 transition-opacity drop-shadow-lg"
    :style="{ transform: `translate(${translateX}px, ${translateY}px)`}"
  >
    <div class="tooltip__container relative bg-[#252321] border-[#060604] border-2 p-4 select-none">
      <div class="relative w-full flex items-center justify-center -top-12 -mb-10">
        <SkillItem
          class="!block select-none"
          :icon="icon"
        />
      </div>
      <h4 class="font-display text-xl font-semibold text-center select-none shadow-black text-shadow mb-2">
        {{ name }}
      </h4>

      <div
        v-if="rank > 0"
        class="tooltip__rank py-[5px] mb-2 font-display text-center text-shadow-sm shadow-black shadow-sm"
      >
        RANK {{ rank }}/{{ rankMax }}
      </div>

      <div
        v-if="type"
      >
        <span class="inline-block px-2 py-[5px] border border-green-500 bg-green-900 text-shadow shadow-black mr-[5px]">{{ type }}</span>
        <span class="inline-block px-2 py-[5px] border border-gray-500 bg-gray-800 text-shadow shadow-black">{{ school }}</span>
      </div>

      <hr class="border-gray-500 my-2 select-none">
      <!-- eslint-disable-next-line -->
      <p class="mb-2" v-html="description" />

      <div class="flex flex-col items-end">
        <hr class="w-1/2 border-gray-500 my-2 select-none">
        <p v-if="damageType">
          <SkillDamageIcon
            class="mr-2"
            :type="damageType.toLowerCase()"
          />{{ damageType }} Damage
        </p>
        <p
          v-if="notLearnedVisible"
          class="text-red-600 text-shadow-sm shadow-black font-semibold"
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
  type: {
    type: String,
    default: ''
  },
  school: {
    type: String,
    default: ''
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
  return props.rank <= 0
})
</script>

<style scoped lang="postcss">
.tooltip {
  &__container {
    background: url('/svg/tooltip-bg.svg');
    background-repeat: repeat;
    background-size: 150px 150px;
  }

  &__rank {
    background: url('/svg/tooltip-span-bg.svg');
    background-repeat: repeat;
    background-size: 200px 200px;
  }
}
</style>
