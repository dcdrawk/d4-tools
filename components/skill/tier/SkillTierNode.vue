<template>
  <div class="skill-tier-node w-[80px] h-[80px] relative z-auto inline-block select-none">
    <BaseSVG
      :width="80"
      :height="80"
    >
      <defs>
        <pattern
          id="img1"
          patternUnits="userSpaceOnUse"
          width="80"
          height="80"
        >
          <image
            :href="`${useRuntimeConfig().app.baseURL}svg/skill/tier/skill-tier-bg.svg`"
            width="80"
            height="80"
          />
        </pattern>
      </defs>

      <SkillTierSpikes />
      <rect
        fill="#3c0403"
        stroke="#5d5e60"
        stroke-width="2"
        width="52"
        height="52"
        y="14"
        x="14"
        transform="rotate(45, 26, 26)"
      />
      <rect
        fill="url(#img1)"
        stroke="#1e1e1e"
        stroke-width="2"
        width="42"
        height="42"
        y="19"
        x="19"
        transform="rotate(45, 21, 21)"
      />

      <transition
        name="fade"
      >
        <image
          v-if="isActive"
          :href="icon"
          width="44"
          height="44"
          y="18"
          x="18"
        />

        <g v-else>
          <image
            href="/svg/skill/skill-point.svg"
            width="18"
            height="18"
            y="31"
            x="17"
          />
          <text
            x="39"
            y="47"
            class="fill-red-600 text-2xl font-display font-bold tracking-tight text-shadow shadow-black"
          >
            {{ skillPointsRequired }}
          </text>
        </g>
      </transition>
    </BaseSVG>

    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon?: string
  rank: number
  rankRequired: number
}

const props = withDefaults(defineProps<Props>(), {
  icon: '/svg/skill/tier/skill-tier-icon-basic.svg'
})

const isActive = computed(() => {
  return props.rank >= props.rankRequired
})

const skillPointsRequired = computed(() => {
  return props.rankRequired - props.rank
})
</script>

<style scoped lang="postcss">
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
