<template>
  <template v-if="props.products.length === 0">
    <p class="text-gray-500">No items in the list. Add some!</p>
  </template>
  <div v-else class="w-full h-full overflow-auto pl-4 pr-4 pt-2">
    <ul class="flex flex-col gap-2 list-none">
      <li v-for="(product, index) in props.products" :key="index">
        <ListItem
          :product
          :can-remove="appStore.editModeEnabled"
          @toggle="onItemToggle(index)"
          @remove="onItemRemove(index)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { IProducts } from '../../utils/types';
import ListItem from './ListItem.vue';
import { useProductsStore } from '../../stores/products';
import { useAppStore } from '../../stores/app';

const props = defineProps<{
  products: IProducts;
}>();

const appStore = useAppStore();
const productsStore = useProductsStore();

const onItemToggle = (index: number) => {
  productsStore.toggleItem(index);
};

const onItemRemove = (index: number) => {
  productsStore.removeItem(index);
};
</script>
