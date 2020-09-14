const APP_VERSION_KEY = 'appVersion';

const storage = window.localStorage;

export function setItem(key: string, value: string): void {
  storage.setItem(key, value);
}

export function getItem(key: string): string | null {
  return storage.getItem(key);
}

export function removeItem(key: string): void {
  return storage.removeItem(key);
}

export function setAppVersion(version: string): void {
  return setItem(APP_VERSION_KEY, version);
}

export function getAppVersion(): string | null {
  return getItem(APP_VERSION_KEY);
}
