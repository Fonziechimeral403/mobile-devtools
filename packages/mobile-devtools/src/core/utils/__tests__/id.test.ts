import { describe, expect, it, vi } from 'vitest';
import { generateId } from '../id';

describe('generateId', () => {
  it('should generate an ID with default prefix when none is provided', () => {
    const id = generateId();
    expect(id).toBeDefined();
    expect(typeof id).toBe('string');
    expect(id.startsWith('id_')).toBe(true);
  });

  it('should generate an ID with custom prefix', () => {
    const reqId = generateId('req');
    expect(reqId.startsWith('req_')).toBe(true);

    const wsId = generateId('ws');
    expect(wsId.startsWith('ws_')).toBe(true);

    const logId = generateId('log');
    expect(logId.startsWith('log_')).toBe(true);
  });

  it('should generate 1000 unique IDs without collision', () => {
    const ids = new Set<string>();
    const count = 1000;

    for (let i = 0; i < count; i++) {
      ids.add(generateId('test'));
    }

    expect(ids.size).toBe(count);
  });

  it('should fallback gracefully if crypto.randomUUID is not available', () => {
    const originalCrypto = globalThis.crypto;

    // Temporarily mock environment without crypto.randomUUID
    Object.defineProperty(globalThis, 'crypto', {
      value: undefined,
      configurable: true,
    });

    const fallbackId = generateId('fallback');
    expect(fallbackId).toBeDefined();
    expect(fallbackId.startsWith('fallback_')).toBe(true);

    // Restore original crypto
    Object.defineProperty(globalThis, 'crypto', {
      value: originalCrypto,
      configurable: true,
    });
  });
});
