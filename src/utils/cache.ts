const APP_VERSION_KEY = "appVersion";

const storage = window.localStorage;

export const setItem = (key: string, value: string): void =>
  storage.setItem(key, value);

export const getItem = (key: string): string | null => storage.getItem(key);

export const removeItem = (key: string): void => storage.removeItem(key);

export const setAppVersion = (version: string): void =>
  setItem(APP_VERSION_KEY, version);

export const getAppVersion = (): string | null => getItem(APP_VERSION_KEY);
