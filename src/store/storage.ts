import AsyncStorage from '@react-native-async-storage/async-storage';
import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

let mmkv: MMKV | null = null;

try {
  mmkv = new MMKV();
} catch (error) {
  console.warn('MMKV unavailable, falling back to AsyncStorage');
}

export const createPersistStorage = (key: string): StateStorage => {
  if (mmkv) {
    return {
      getItem: async () => mmkv?.getString(key) ?? null,
      setItem: async (_, value) => {
        mmkv?.set(key, value);
      },
      removeItem: async () => {
        mmkv?.delete(key);
      }
    };
  }

  return {
    getItem: (name) => AsyncStorage.getItem(name),
    setItem: (name, value) => AsyncStorage.setItem(name, value),
    removeItem: (name) => AsyncStorage.removeItem(name)
  };
};
