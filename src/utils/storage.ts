import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

const STORAGE_VERSION = 'v0_1';

class Storage {
  async load(storeId: string) {
    try {
      const contents = await Filesystem.readFile({
        path: this.path(storeId),
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });

      return contents.data ? JSON.parse(contents.data as string) : {};
    } catch (error) {
      return null;
    }
  }

  async save(storeId: string, payload: object) {
    await Filesystem.writeFile({
      path: this.path(storeId),
      data: JSON.stringify(payload),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
  }

  path(storeId: string) {
    return `data-${storeId}-${STORAGE_VERSION}.json`;
  }
}

export const storage = new Storage();
