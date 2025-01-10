import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  const showOnboarding = ref(true);
  const drawerVisible = ref(false);
  const editModeEnabled = ref(false);

  const openDrawer = () => {
    drawerVisible.value = true;
  };

  const closeDrawer = () => {
    drawerVisible.value = false;
  };

  return { showOnboarding, editModeEnabled, drawerVisible, openDrawer, closeDrawer };
});
