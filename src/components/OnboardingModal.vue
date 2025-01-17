<template>
  <Dialog
    v-model:visible="appStore.showOnboarding"
    modal
    header="Welcome!"
    :style="{ width: '80%' }"
  >
    <div class="flex items-center gap-4 mb-4">
      Hello friend! I'm a dialog box. I'm here to help you get started with your new account. Let's
      get started!
    </div>

    <div class="flex justify-end gap-2">
      <Button type="button" label="Ok, let's go!" @click="appStore.showOnboarding = false"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { useAppStore } from '../stores/app';

const appStore = useAppStore();
</script>
