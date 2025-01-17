<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted, ref } from 'vue';
import OnboardingModal from './components/OnboardingModal.vue';
import { Toast } from 'primevue';
import { PersistStore } from './utils/PersistStore.ts';
import { useAppStore } from './stores/app.ts';
import { SpeedInsights } from '@vercel/speed-insights/next';

const appStore = useAppStore();

const isLoading = ref(true);
const hasError = ref(false);

onMounted(async () => {
  isLoading.value = true;
  try {
    const persistStore = new PersistStore();
    await persistStore.hydrate();
  } catch (error) {
    hasError.value = true;
    console.error(error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div
    v-if="isLoading"
    class="w-full min-h-full overflow-hidden flex-col flex items-center justify-center"
  >
    <div>Loading...</div>
  </div>
  <div
    v-else-if="hasError"
    class="w-full min-h-full overflow-hidden flex-col flex items-center justify-center"
  >
    <div>Oops...</div>
  </div>
  <div v-else class="w-full h-full overflow-hidden flex-col flex items-center">
    <OnboardingModal v-if="appStore.showOnboarding" />
    <RouterView />

    <Toast />
  </div>
  <SpeedInsights />
</template>
