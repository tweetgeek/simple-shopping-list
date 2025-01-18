import type { defineStore } from 'pinia';

export interface Dict<V> {
  [key: string]: V;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PiniaStore<T extends (...args: any) => any> = Omit<
  ReturnType<T>,
  keyof ReturnType<typeof defineStore>
>;

export interface IProduct {
  name: string;
  checkedAt: Date | null;
}

export type IProducts = IProduct[];
