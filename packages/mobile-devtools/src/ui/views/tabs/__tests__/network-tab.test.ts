import { describe, it, expect, beforeEach } from 'vitest';
import { DevToolsStore } from '../../../../core';
import { NetworkTabView } from '../network-tab';

describe('NetworkTabView', () => {
  let store: DevToolsStore;
  let tabView: NetworkTabView;

  beforeEach(() => {
    store = new DevToolsStore();
    store.addNetworkRequest({
      id: 'req_1',
      url: 'https://api.example.com/users',
      method: 'GET',
      status: 200,
      startTime: Date.now(),
      duration: 150,
      responseBody: { users: [] },
    });

    tabView = new NetworkTabView(store);
  });

  it('should render network requests list and detail view', () => {
    const el = tabView.render();
    expect(el).toBeDefined();

    const text = el.textContent || '';
    expect(text).toContain('GET');
    expect(text).toContain('https://api.example.com/users');
    expect(text).toContain('200');
  });
});
