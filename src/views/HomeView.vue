<script setup lang="ts">
import AppLayout from '../components/AppLayout.vue';
import { useShopListsStore } from '../stores/shopLists.ts';
import ListContainer from '../components/List/ListContainer.vue';
import NoListSelected from '../components/List/NoListSelected.vue';
import { useAppStore } from '../stores/app.ts';

const shoppListsStore = useShopListsStore();
const appStore = useAppStore();
</script>

<template>
  <AppLayout>
    <template #right>
      <span
        class="text-cyan-600"
        v-if="appStore.editModeEnabled"
        @click="appStore.editModeEnabled = false"
        >Cancel</span
      >
      <span class="text-cyan-600" v-else @click="appStore.editModeEnabled = true">Edit</span>
    </template>

    <div class="pl-4 pr-4 pt-2 flex flex-col gap-3 pb-4">
      <ListContainer v-if="shoppListsStore.currentList" :list="shoppListsStore.currentList" />
      <NoListSelected v-else />
    </div>
  </AppLayout>
</template>
