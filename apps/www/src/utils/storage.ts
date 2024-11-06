import Cookie from 'js-cookie';

import { secrets, storage } from '@/constants/storage';

import type { SecretKey, StorageKey } from '@/constants/storage';

export const getData = (key: StorageKey) => localStorage.getItem(storage[key]) ?? null;

export const setData = (key: StorageKey, value: string) => {
  localStorage.setItem(storage[key], value);
  return true;
};

export const removeData = (key: StorageKey) => {
  localStorage.removeItem(storage[key]);
  return true;
};

export const getSecret = (key: SecretKey) => Cookie.get(secrets[key]) ?? null;

export const setSecret = (key: SecretKey, value: string) => {
  Cookie.set(secrets[key], value);
  return true;
};

export const removeSecret = (key: SecretKey) => {
  Cookie.remove(secrets[key]);
  return true;
};
