<template>
  <div>
    <SkillTier />
    <SkillItem
      :active="activeSkill"
      @toggle="activeSkill = !activeSkill"
    />
    <SkillTier class="translate-x-20 translate-y-20" />
  </div>
</template>

<script setup lang="ts">
const activeSkill = ref(false)
</script>
