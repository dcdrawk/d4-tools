<template>
  <polygon
    v-for="i in 4"
    :key="i"
    points="25,0 37.5,40 50,0"
    :transform="`translate(0 40) rotate(${(i - 1) * 90 + 45}, 12.5, 0)`"
    stroke="#5d5e60"
    fill="#191f20"
    stroke-width="2"
  />
</template>
