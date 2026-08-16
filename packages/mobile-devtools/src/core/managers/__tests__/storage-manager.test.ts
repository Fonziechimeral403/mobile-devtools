import { describe, it, expect, beforeEach } from 'vitest';
import { StorageManager } from '../storage-manager';

describe('StorageManager', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should manipulate localStorage entries', () => {
    StorageManager.setStorageItem('localStorage', 'theme', 'dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    const items = StorageManager.getLocalStorageItems();
    expect(items).toContainEqual({ key: 'theme', value: 'dark', type: 'localStorage' });

    StorageManager.removeStorageItem('localStorage', 'theme');
    expect(localStorage.getItem('theme')).toBeNull();
  });

  it('should manipulate sessionStorage entries', () => {
    StorageManager.setStorageItem('sessionStorage', 'token', 'abc123');
    expect(sessionStorage.getItem('token')).toBe('abc123');

    const items = StorageManager.getSessionStorageItems();
    expect(items).toContainEqual({ key: 'token', value: 'abc123', type: 'sessionStorage' });

    StorageManager.clearAllStorage('sessionStorage');
    expect(sessionStorage.getItem('token')).toBeNull();
  });

  it('should manipulate cookie entries', () => {
    StorageManager.setStorageItem('cookie', 'test_cookie', 'cookie_val');
    const items = StorageManager.getCookies();
    const cookieItem = items.find((i) => i.key === 'test_cookie');
    expect(cookieItem).toBeDefined();
    expect(cookieItem?.value).toBe('cookie_val');

    StorageManager.removeStorageItem('cookie', 'test_cookie');
    const remainingItems = StorageManager.getCookies();
    expect(remainingItems.find((i) => i.key === 'test_cookie')).toBeUndefined();
  });
});
