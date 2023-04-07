<template>
  <div class="skill-tier w-[80px] h-[80px] relative z-auto">
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
            href="/svg/skill/tier/skill-tier-bg.svg"
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
        :href="icon"
        width="44"
        height="44"
        y="18"
        x="18"
      />
    </BaseSVG>

    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  active?: boolean
  icon?: string
}

withDefaults(defineProps<Props>(), {
  active: false,
  icon: '/svg/skill/tier/skill-tier-icon-basic.svg'
})
</script>
