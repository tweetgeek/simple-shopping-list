import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { IList } from '../../utils/types.ts';

export const useShopListsStore = defineStore('shopLists', () => {
  const lists = ref<IList[]>([
    {
      id: '0',
      name: 'My first list',
      items: [
        { name: 'My first item', checkedAt: null },
        { name: 'My secondary item', checkedAt: null },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '1',
      name: 'My second list',
      items: [
        { name: 'My first item', checkedAt: null },
        { name: 'My secondary item', checkedAt: null },
        { name: 'My first item', checkedAt: null },
        { name: 'My secondary item', checkedAt: null },
        { name: 'My first item', checkedAt: null },
        { name: 'My secondary item', checkedAt: null },
        { name: 'My first item', checkedAt: null },
        { name: 'My secondary item', checkedAt: null },
        { name: 'My first item', checkedAt: null },
        { name: 'My secondary item', checkedAt: null },
        { name: 'My first item', checkedAt: null },
        { name: 'My secondary item', checkedAt: null },
        { name: 'My first item', checkedAt: null },
        { name: 'My secondary item', checkedAt: null },
        { name: 'My first item', checkedAt: null },
        { name: 'My secondary item', checkedAt: null },
        { name: 'My first item', checkedAt: null },
        { name: 'My secondary item', checkedAt: null },
        { name: 'My first item', checkedAt: null },
        { name: 'My secondary item', checkedAt: null },
        { name: 'My first item', checkedAt: null },
        { name: 'My secondary item', checkedAt: null },
        { name: 'My first item', checkedAt: null },
        { name: 'My secondary item', checkedAt: null },
        { name: 'My first item', checkedAt: null },
        { name: 'My secondary item', checkedAt: null },
        { name: 'My first item', checkedAt: null },
        { name: 'My secondary item', checkedAt: null },
        { name: 'My first item', checkedAt: null },
        { name: 'My secondary item', checkedAt: null },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'My third empty list',
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  const currentListId = ref<string | null>('1'); //null);

  const currentList = computed(() =>
    currentListId.value ? lists.value.find(({ id }) => id === currentListId.value) : null,
  );

  const toggleItem = (listId: string, index: number) => {
    const list = lists.value.find(({ id }) => id === listId);
    if (!list) {
      console.error('List not exists');
      return;
    }

    const item = list.items[index];
    if (!item) {
      console.error('Item not exists');
      return;
    }

    if (!!item.checkedAt) {
      item.checkedAt = null;
    } else {
      item.checkedAt = new Date();
    }
  };

  const removeItem = (listId: string, index: number) => {
    const list = lists.value.find(({ id }) => id === listId);
    if (!list) {
      console.error('List not exists');
      return;
    }

    const item = list.items[index];
    if (!item) {
      console.error('Item not exists');
      return;
    }

    list.items.splice(index, 1);
  };

  return {
    currentListId,
    lists,
    toggleItem,
    removeItem,
    currentList,
  };
});
