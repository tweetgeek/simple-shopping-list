import { useAppStore } from '@/stores/app.ts';
import { useShopListsStore } from '@/stores/shopLists.ts';
import { storage } from './storage.ts';
import type { PiniaStore } from './types.ts';

export class PersistStore {
  stores: Array<PiniaStore<typeof useAppStore> | PiniaStore<typeof useShopListsStore>> = [];

  constructor() {
    this.stores = [useAppStore(), useShopListsStore()];
  }

  async hydrate() {
    console.log(this.stores);
    for (const store of this.stores) {
      console.log('store', store);

      const content = await storage.load(store.$id);
      if (content) {
        console.log('revert content');
        store.$patch(content);

        console.log('store', store, content);
      }
    }

    await this.bindSyncAction();
  }

  async bindSyncAction() {
    for (const store of this.stores) {
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
