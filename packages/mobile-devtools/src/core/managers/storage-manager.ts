import { CookieItem, StorageItem, StorageType } from '../types/storage';
import { isServer } from '../utils/env';
import { parseCookies } from '../utils/formatters';

export class StorageManager {
  public static getLocalStorageItems(): StorageItem[] {
    const items: StorageItem[] = [];
    if (isServer || !window.localStorage) return items;

    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !key.startsWith('__mobile_devtools')) {
          items.push({
            key,
            value: localStorage.getItem(key) || '',
            type: 'localStorage',
          });
        }
      }
    } catch {
      // Storage read error
    }
    return items;
  }

  public static getSessionStorageItems(): StorageItem[] {
    const items: StorageItem[] = [];
    if (isServer || !window.sessionStorage) return items;

    try {
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key) {
          items.push({
            key,
            value: sessionStorage.getItem(key) || '',
            type: 'sessionStorage',
          });
        }
      }
    } catch {
      // Storage read error
    }
    return items;
  }

  public static getCookies(): CookieItem[] {
    const parsed = parseCookies();
    return Object.entries(parsed).map(([key, value]) => ({
      key,
      value,
    }));
  }

  public static setStorageItem(type: StorageType, key: string, value: string) {
    if (isServer) return;

    try {
      if (type === 'localStorage') {
        localStorage.setItem(key, value);
      } else if (type === 'sessionStorage') {
        sessionStorage.setItem(key, value);
      } else if (type === 'cookie') {
        document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=/`;
      }
    } catch (e) {
      console.error('[DevTools] Failed to set storage item:', e);
    }
  }

  public static removeStorageItem(type: StorageType, key: string) {
    if (isServer) return;

    try {
      if (type === 'localStorage') {
        localStorage.removeItem(key);
      } else if (type === 'sessionStorage') {
        sessionStorage.removeItem(key);
      } else if (type === 'cookie') {
        document.cookie = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      }
    } catch (e) {
      console.error('[DevTools] Failed to remove storage item:', e);
    }
  }

  public static clearAllStorage(type: StorageType) {
    if (isServer) return;

    try {
      if (type === 'localStorage') {
        localStorage.clear();
      } else if (type === 'sessionStorage') {
        sessionStorage.clear();
      } else if (type === 'cookie') {
        const cookies = this.getCookies();
        cookies.forEach((c) => this.removeStorageItem('cookie', c.key));
      }
    } catch (e) {
      console.error('[DevTools] Failed to clear storage:', e);
    }
  }
}
