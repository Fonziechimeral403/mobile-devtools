import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { DevToolsStore } from '../../stores/devtools-store';
import { NetworkInterceptor } from '../network-interceptor';

describe('NetworkInterceptor Deep Tests', () => {
  let store: DevToolsStore;
  let interceptor: NetworkInterceptor;

  beforeEach(() => {
    store = new DevToolsStore();
    store.updateConfig({
      privacy: { mask: ['authorization', 'password', 'token'] },
    });
    interceptor = new NetworkInterceptor(store);
  });

  afterEach(() => {
    interceptor.restore();
  });

  it('should intercept fetch requests and log entry in store', async () => {
    const mockResponse = new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    window.fetch = vi.fn().mockResolvedValue(mockResponse);

    interceptor.init();

    await window.fetch('https://api.example.com/items', {
      method: 'POST',
      headers: { Authorization: 'Bearer testtoken' },
      body: JSON.stringify({ name: 'Laptop' }),
    });

    const requests = store.getNetworkRequests();
    expect(requests.length).toBe(1);

    const req = requests[0];
    expect(req.url).toBe('https://api.example.com/items');
    expect(req.method).toBe('POST');
    expect(req.status).toBe(200);
    expect(req.errorState).toBe('success');
    expect(req.requestHeaders?.Authorization).toBe('****** (Masked)');
  });

  it('should handle fetch failure / error status', async () => {
    window.fetch = vi.fn().mockRejectedValue(new Error('Failed to fetch'));

    interceptor.init();

    await expect(window.fetch('https://api.example.com/error')).rejects.toThrow('Failed to fetch');

    const requests = store.getNetworkRequests();
    expect(requests.length).toBe(1);
    expect(requests[0].errorState).toBe('error');
  });

  it('should respect ignoreNetworkUrls config', async () => {
    store.updateConfig({
      interceptors: {
        ignoreNetworkUrls: ['analytics', /internal-ping/],
      },
    });

    window.fetch = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));

    interceptor.init();

    await window.fetch('https://api.example.com/analytics/event');
    await window.fetch('https://api.example.com/internal-ping');

    expect(store.getNetworkRequests().length).toBe(0);
  });

  it('should simulate offline network throttling', async () => {
    store.setNetworkThrottling('offline');
    window.fetch = vi.fn().mockResolvedValue(new Response('ok'));

    interceptor.init();

    await expect(window.fetch('https://api.example.com/data')).rejects.toThrow(
      'Simulated Offline Mode'
    );

    const req = store.getNetworkRequests()[0];
    expect(req.statusText).toContain('Offline');
  });

  it('should intercept XMLHttpRequest open, setRequestHeader, and send', () => {
    interceptor.init();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.example.com/xhr-endpoint');
    xhr.setRequestHeader('X-Custom-Header', 'test-val');
    xhr.send(JSON.stringify({ payload: 'data' }));

    const requests = store.getNetworkRequests();
    expect(requests.length).toBe(1);

    const req = requests[0];
    expect(req.type).toBe('xhr');
    expect(req.url).toBe('https://api.example.com/xhr-endpoint');
    expect(req.method).toBe('POST');
    expect(req.requestHeaders?.['X-Custom-Header']).toBe('test-val');
  });
});
