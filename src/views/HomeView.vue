<script setup lang="ts">
import AppLayout from '../components/AppLayout.vue';
import ListContainer from '../components/ProductsList/ListContainer.vue';
import ListAddForm from '../components/ProductsList/ListAddForm.vue';
import { ProgressBar } from 'primevue';
import { useProductsStore } from '../stores/products';
import { useAppStore } from '../stores/app';
import { computed } from 'vue';

const appStore = useAppStore();
const productsStore = useProductsStore();

const doneMeter = computed(() => {
  return Math.ceil((productsStore.checkedProducts().length / productsStore.products.length) * 100);
});
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

    <div class="flex flex-col w-full h-full overflow-hidden max-h-120">
      <div class="flex flex-col w-full h-full gap-2">
        <div class="flex flex-1 w-full justify-center">
          <p class="font-bold uppercase truncate">Products</p>
        </div>

        <div class="pl-2 pr-2">
          <ProgressBar v-if="productsStore.products.length" :value="doneMeter" />
        </div>

        <ListContainer :products="productsStore.products" />

        <ListAddForm v-if="appStore.editModeEnabled" />
      </div>
    </div>
  </AppLayout>
</template>
