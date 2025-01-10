<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppDrawer from '@/components/AppDrawer.vue';
</script>

<template>
  <AppDrawer />

  <AppHeader>
    <template #center>
      <slot name="center" />
    </template>
    <template #right>
      <slot name="right" />
    </template>
  </AppHeader>

  <main class="w-full h-full overflow-auto">
    <slot />
  </main>
</template>
