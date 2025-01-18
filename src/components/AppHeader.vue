<template>
  <header class="w-full bg-white min-h-[52px] items-center content-center">
    <div class="mx-auto">
      <div class="flex justify-between items-center content-center pl-2 pr-2">
        <div class="basis-1/4">
          <slot name="left">
            <div class="pl-2">
              <AppLogo class="w-8" />
            </div>
          </slot>
        </div>

        <div class="text-center basis-2/4">
          <slot name="center" />
        </div>

        <div class="basis-1/4 text-right pr-4">
          <slot name="right" />
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import AppLogo from './AppLogo.vue';
</script>
