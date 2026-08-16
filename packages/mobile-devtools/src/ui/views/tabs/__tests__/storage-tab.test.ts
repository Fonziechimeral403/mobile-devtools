import { describe, it, expect, beforeEach } from 'vitest';
import { DevToolsStore } from '../../../../core';
import { StorageTabView } from '../storage-tab';

describe('StorageTabView', () => {
  let store: DevToolsStore;
  let tabView: StorageTabView;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('user_theme', 'dark');
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
});
