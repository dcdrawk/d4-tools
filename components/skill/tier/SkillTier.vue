<template>
  <div class="skill-tier w-[80px] h-[80px]">
    <BaseSVG
      :width="80"
      :height="80"
    >
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
        width="42"
        height="42"
        fill="#353b3b"
        transform="rotate(45, 25, 25)"
        y="21"
        x="15"
        stroke="#1e1e1e"
        stroke-width="2"
      />
    </BaseSVG>
  </div>
</template>

<script setup>
</script>
