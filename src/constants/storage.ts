export type StorageKey = 'LOCAL_STORAGE_1' | 'LOCAL_STORAGE_2';
export type SecretKey = 'COOKIE_1' | 'COOKIE_2';

// TODO: replace this with your own local storage keys
export const storage: Record<StorageKey, string> = {
  LOCAL_STORAGE_1: '@ls1',
  LOCAL_STORAGE_2: '@ls2',
};

// TODO: replace this with your own cookie keys
export const secrets: Record<SecretKey, string> = {
  COOKIE_1: 'c1',
  COOKIE_2: 'c2',
};
