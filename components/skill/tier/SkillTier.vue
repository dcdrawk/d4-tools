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
        width="53"
        height="53"
        fill="#3c0403"
        transform="rotate(45, 25, 25)"
        y="13"
        x="15"
        stroke="#5d5e60"
        stroke-width="2"
      />
      <rect
        class="skill-tier__inner"
        width="42"
        height="42"
        fill="url(#img1)"
        transform="rotate(45, 25, 25)"
        y="21"
        x="15"
        stroke="#1e1e1e"
        stroke-width="2"
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

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: '/svg/skill/tier/skill-tier-icon-basic.svg'
  }
})
</script>
