import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DevToolsStore } from '../../stores/devtools-store';
import { SSEInterceptor } from '../sse-interceptor';
import { WebSocketInterceptor } from '../websocket-interceptor';

describe('WebSocket & SSE Interceptors', () => {
  let store: DevToolsStore;
  let wsInterceptor: WebSocketInterceptor;
  let sseInterceptor: SSEInterceptor;

  beforeEach(() => {
    store = new DevToolsStore();
    wsInterceptor = new WebSocketInterceptor(store);
    sseInterceptor = new SSEInterceptor(store);
  });

  afterEach(() => {
    wsInterceptor.restore();
    sseInterceptor.restore();
  });

  it('should intercept WebSocket connections and frame messages', () => {
    const mockWS = vi.fn().mockImplementation(function (this: any) {
      this.listeners = {} as Record<string, Function[]>;
      this.addEventListener = (event: string, cb: Function) => {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(cb);
      };
      this.send = vi.fn();
    });
    (mockWS as any).CONNECTING = 0;
    (mockWS as any).OPEN = 1;
    (mockWS as any).CLOSING = 2;
    (mockWS as any).CLOSED = 3;

    (globalThis as any).WebSocket = mockWS;

    wsInterceptor.init();

    const ws = new (window.WebSocket as any)('ws://example.com/socket');
    const requests = store.getNetworkRequests();

    expect(requests.length).toBe(1);
    expect(requests[0]?.url).toBe('ws://example.com/socket');
    expect(requests[0]?.method).toBe('WS');

    // Simulate sending data
    ws.send('ping');
    expect(store.getNetworkRequests()[0]?.frames?.length).toBe(1);
    expect(store.getNetworkRequests()[0]?.frames?.[0]?.type).toBe('sent');
    expect(store.getNetworkRequests()[0]?.frames?.[0]?.data).toBe('ping');
  });

  it('should intercept EventSource connections', () => {
    const mockES = vi.fn().mockImplementation(function (this: any) {
      this.listeners = {} as Record<string, Function[]>;
      this.addEventListener = (event: string, cb: Function) => {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(cb);
      };
    });
    (mockES as any).CONNECTING = 0;
    (mockES as any).OPEN = 1;
    (mockES as any).CLOSED = 2;

    (globalThis as any).EventSource = mockES;

    sseInterceptor.init();

    new (window.EventSource as any)('http://example.com/sse');
    const requests = store.getNetworkRequests();

    expect(requests.length).toBe(1);
    expect(requests[0]?.url).toBe('http://example.com/sse');
    expect(requests[0]?.method).toBe('SSE');
  });
});
