<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
</script>

<template>
  <AppHeader>
    <template #left>
      <slot name="left" />
    </template>
    <template #center>
      <slot name="center" />
    </template>
    <template #right>
      <slot name="right" />
    </template>
  </AppHeader>

  <main class="w-full h-full overflow-hidden">
    <slot />
  </main>
</template>
