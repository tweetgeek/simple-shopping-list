import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IProducts } from '../utils/types.ts';

export const useProductsStore = defineStore('products', () => {
  const products = ref<IProducts>([
    { name: 'My first product', checkedAt: null },
    { name: 'My secondary product', checkedAt: null },
    { name: 'My first product', checkedAt: null },
    { name: 'My secondary product', checkedAt: null },
    { name: 'My first product', checkedAt: null },
    { name: 'My secondary product', checkedAt: null },
    { name: 'My first product', checkedAt: null },
    { name: 'My secondary product', checkedAt: null },
    { name: 'My first product', checkedAt: null },
    { name: 'My secondary product', checkedAt: null },
    { name: 'My first product', checkedAt: null },
    { name: 'My secondary product', checkedAt: null },
    { name: 'My first product', checkedAt: null },
  ]);

  const toggleItem = (index: number) => {
    const item = products.value[index];
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

  const removeItem = (index: number) => {
    const item = products.value[index];
    if (!item) {
      console.error('Item not exists');
      return;
    }

    products.value.splice(index, 1);
  };

  const addProduct = (productName: string) => {
    products.value.push({ name: productName, checkedAt: null });
  };

  const checkedProducts = () => {
    return products.value.filter((product) => !!product.checkedAt);
  };

  return {
    products,
    toggleItem,
    removeItem,
    checkedProducts,
    addProduct,
  };
});
