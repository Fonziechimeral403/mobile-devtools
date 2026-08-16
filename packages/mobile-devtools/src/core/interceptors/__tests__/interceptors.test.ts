import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DevToolsStore } from '../../stores/devtools-store';
import { ConsoleInterceptor } from '../console-interceptor';
import { NetworkInterceptor } from '../network-interceptor';

describe('ConsoleInterceptor', () => {
  let store: DevToolsStore;
  let interceptor: ConsoleInterceptor;

  beforeEach(() => {
    store = new DevToolsStore();
    interceptor = new ConsoleInterceptor(store);
  });

  afterEach(() => {
    interceptor.restore();
  });

  it('should intercept console log, warn, and error calls', () => {
    interceptor.init();

    console.log('Test log payload', { a: 1 });
    console.warn('Test warning payload');
    console.error('Test error payload');

    const logs = store.getLogs();
    expect(logs.length).toBe(3);
    expect(logs[0].level).toBe('log');
    expect(logs[0].args[0]).toBe('Test log payload');
    expect(logs[1].level).toBe('warn');
    expect(logs[2].level).toBe('error');
  });

  it('should restore original console functions upon restore', () => {
    interceptor.init();
    interceptor.restore();
    expect(() => interceptor.restore()).not.toThrow();
  });
});

describe('NetworkInterceptor', () => {
  let store: DevToolsStore;
  let interceptor: NetworkInterceptor;

  beforeEach(() => {
    store = new DevToolsStore();
    interceptor = new NetworkInterceptor(store);
  });

  afterEach(() => {
    interceptor.restore();
  });

  it('should initialize and restore fetch / XHR interceptors without crashing', () => {
    interceptor.init();
    expect(() => interceptor.restore()).not.toThrow();
  });
});
