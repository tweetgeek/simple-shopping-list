<template>
  <div class="flex w-full overflow-hidden h-auto justify-center">
    <p class="font-bold uppercase truncate">
      {{ props.list.name }}
    </p>
  </div>
  <ul class="flex flex-col gap-2 list-none">
    <template v-if="props.list.items.length === 0">
      <li>
        <p class="text-gray-500">No items in the list. Add some!</p>
      </li>
    </template>
    <li v-else v-for="(item, index) in props.list.items" :key="index">
      <ListItem
        :item
        :can-remove="appStore.editModeEnabled"
        @toggle="onItemToggle(index)"
        @remove="onItemRemove(index)"
      />
    </li>

    <li v-if="appStore.editModeEnabled">
      <ListAddForm />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { IList } from '../../../utils/types.ts';
import ListItem from '@/components/List/ListItem.vue';
import ListAddForm from '@/components/List/ListAddForm.vue';
import { useShopListsStore } from '@/stores/shopLists.ts';
import { useAppStore } from '@/stores/app.ts';

const props = defineProps<{
  list: IList;
}>();

const appStore = useAppStore();
const shopListsStore = useShopListsStore();

const onItemToggle = (index: number) => {
  shopListsStore.toggleItem(props.list.id, index);
};

const onItemRemove = (index: number) => {
  shopListsStore.removeItem(props.list.id, index);
};
</script>
