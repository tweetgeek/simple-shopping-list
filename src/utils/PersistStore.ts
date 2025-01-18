import { useAppStore } from '../stores/app.ts';
import { useProductsStore } from '../stores/products.ts';
import { storage } from './storage.ts';

export class PersistStore {
  // stores: Array<PiniaStore<typeof useAppStore> | PiniaStore<typeof useShopListsStore>> = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stores: Array<any> = [];

  constructor() {
    this.stores = [useAppStore(), useProductsStore()];
  }

  async hydrate() {
    console.log(this.stores);
    for (const store of this.stores) {
      console.log('store', store);

      const content = await storage.load(store.$id);
      if (content) {
        console.log('revert content');
        // @ts-ignore
        store.$patch(content);

        console.log('store', store, content);
      }
    }

    await this.bindSyncAction();
  }

  async bindSyncAction() {
    for (const store of this.stores) {
      // @ts-ignore
      store.$subscribe((mutation, state) => {
        if (mutation.events.type === 'set') {
          console.log('mutation, state', mutation, state);

          this.save(mutation.storeId);
        }
      });
    }
  }

  async save(storeId: string) {
    for (const store of this.stores) {
      console.log(store.$id !== storeId, store.$id, storeId);
      if (store.$id !== storeId) {
        continue;
      }

      console.log(store.$state);
      await storage.save(store.$id, store.$state);
    }
  }
}
