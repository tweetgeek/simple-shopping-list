<template>
  <Drawer v-model:visible="appStore.drawerVisible">
    <template #container="{ closeCallback }">
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between px-6 pt-4 shrink-0">
          <span class="inline-flex items-center gap-2">
            <AppLogo class="w-10" />
          </span>
          <span>
            <Button
              type="button"
              @click="closeCallback"
              icon="pi pi-times"
              rounded
              outlined
            ></Button>
          </span>
        </div>

        <div class="overflow-y-auto">
          <ul class="list-none px-4 pt-4 pb-2 m-0">
            <li v-for="list in shopListStore.lists" :key="list.id">
              <a
                @click="shopListStore.currentListId = list.id"
                v-ripple
                class="flex items-center cursor-pointer p-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                :class="{ 'bg-surface-100': list.id === shopListStore.currentListId }"
              >
                <span class="font-medium">{{ list.name }}</span>
              </a>
            </li>
          </ul>

          <ul class="list-none px-4 pt-2 m-0 border-t">
            <li>
              <RouterLink to="">
                <a
                  v-ripple
                  class="flex items-center cursor-pointer p-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                >
                  <i class="pi pi-plus mr-4" />
                  <span class="font-medium">Add new list</span>
                </a>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer';
import Button from 'primevue/button';

import { useAppStore } from '../stores/app';
import AppLogo from './AppLogo.vue';
import { useShopListsStore } from '../stores/shopLists';

const appStore = useAppStore();

const shopListStore = useShopListsStore();
</script>
