import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  const showOnboarding = ref(true);
  const editModeEnabled = ref(false);

  return { showOnboarding, editModeEnabled };
});
