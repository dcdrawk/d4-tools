<template>
  <div class="app h-full flex flex-col">
    <section class="container">
      <h1 class="my-2 text-3xl font-display text-white font-semibold">
        D4 Tools
      </h1>

      <hr class="border-gray-400">
    </section>

    <main class="flex-grow">
      <NuxtPage />
    </main>

    <TheFooter class=" flex-grow-0 flex-shrink-0" />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'D4 Tools'
})
</script>

<style>
svg * {
  transform-box: fill-box;
}

body {
  @apply bg-neutral-900;
}

html,
body, body > div {
  @apply h-full;
}
</style>
