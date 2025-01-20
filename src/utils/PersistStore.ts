import { useAppStore } from '../stores/app.ts';
import { useProductsStore } from '../stores/products.ts';
import { storage } from './storage.ts';
import type { PiniaStore } from '~/utils/types.ts';
import type { SubscriptionCallbackMutation } from 'pinia';

export class PersistStore {
  stores: Array<{
    storageInstance: PiniaStore<typeof useAppStore> | PiniaStore<typeof useProductsStore>;
    omit?: string[];
  }> = [];

  constructor() {
    this.stores = [
      {
        storageInstance: useAppStore(),
        omit: ['editModeEnabled'],
      },
      {
        storageInstance: useProductsStore(),
      },
    ];
  }

  async hydrate() {
    for (const store of this.stores) {
      const content = await storage.load(store.storageInstance.$id);
      if (content) {
        if (store.omit) {
          for (const key of store.omit) {
            delete content[key];
          }
        }
        // @ts-ignore
        store.storageInstance.$patch(content);
      }
    }

    await this.bindSyncAction();
  }

  async bindSyncAction() {
    for (const store of this.stores) {
      // @ts-ignore
      store.storageInstance.$subscribe(
        (
          mutation: SubscriptionCallbackMutation<
            PiniaStore<typeof useAppStore> | PiniaStore<typeof useProductsStore>
          >,
        ) => {
          this.save(mutation.storeId);
        },
      );
    }
  }

  async save(storeId: string) {
    for (const store of this.stores) {
      if (store.storageInstance.$id !== storeId) {
        continue;
      }

      const payload = store.storageInstance.$state;
      if (store.omit) {
        for (const key of store.omit) {
          // @ts-ignore
          delete payload[key];
        }
      }
      await storage.save(store.storageInstance.$id, payload);
    }
  }
}
