<template>
  <header class="w-full z-[1100] bg-white min-h-[56px] items-center content-center">
    <div class="mx-auto">
      <div class="flex justify-between items-center content-center pl-2 pr-2">
        <div class="basis-1/4">
          <Button
            icon="pi pi-bars"
            variant="text"
            rounded
            severity="secondary"
            size="large"
            @click="appStore.openDrawer()"
          />
        </div>

        <div class="text-center basis-2/4">
          <slot name="center"></slot>
        </div>

        <div class="basis-1/4 text-right pr-4">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import { useAppStore } from '@/stores/app.ts';

const appStore = useAppStore();
</script>
