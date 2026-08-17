import { beforeEach, describe, expect, it } from 'vitest';
import { DevToolsStore } from '../../../../core';
import { StorageTabView } from '../storage-tab';

describe('StorageTabView', () => {
  let store: DevToolsStore;
  let tabView: StorageTabView;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('user_theme', 'dark');
    localStorage.setItem('app_token', 'xyz_999');
    sessionStorage.setItem('auth_token', 'token_123');

    store = new DevToolsStore();
    tabView = new StorageTabView(store);
  });

  it('should render storage items in table', () => {
    const el = tabView.render();
    expect(el).toBeDefined();

    const text = el.textContent || '';
    expect(text).toContain('user_theme');
    expect(text).toContain('dark');
  });

  it('should filter storage items by search input', () => {
    const el = tabView.render();
    const searchInput = el.querySelector('input.devtools-search-input') as HTMLInputElement;

    expect(searchInput).not.toBeNull();
    searchInput.value = 'app_token';
    searchInput.dispatchEvent(new Event('input'));

    const text = el.textContent || '';
    expect(text).toContain('app_token');
    expect(text).not.toContain('user_theme');
  });

  it('should switch between localStorage, sessionStorage, and cookie options', () => {
    const el = tabView.render();
    const select = el.querySelector('select.devtools-select') as HTMLSelectElement;

    expect(select).not.toBeNull();
    select.value = 'sessionStorage';
    select.dispatchEvent(new Event('change'));

    const text = el.textContent || '';
    expect(text).toContain('auth_token');
    expect(text).toContain('token_123');
  });
});
