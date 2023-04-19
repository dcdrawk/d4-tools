<template>
  <div class="skill-tier w-[80px] h-[80px] relative z-auto inline-block select-none">
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
        y="15"
        x="15"
        transform="rotate(45, 26, 26)"
      />
      <rect
        class="skill-tier__inner"
        fill="url(#img1)"
        stroke="#1e1e1e"
        stroke-width="2"
        width="42"
        height="42"
        y="20"
        x="20"
        transform="rotate(45, 21, 21)"
      />

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
          y="32"
          x="20"
        />
        <text
          x="42"
          y="47"
          class="fill-red-600 text-2xl font-display font-semibold"
        >
          {{ skillPointsRequired }}
        </text>
      </g>
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
