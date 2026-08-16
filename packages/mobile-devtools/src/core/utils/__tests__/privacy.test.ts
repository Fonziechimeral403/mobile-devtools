import { describe, it, expect } from 'vitest';
import { maskSensitiveValue } from '../privacy';

describe('privacy utils', () => {
  const defaultKeys = ['password', 'token', 'authorization', 'secret'];

  it('should mask default sensitive keys in an object', () => {
    const data = {
      user: 'alice',
      password: 'supersecretpassword123',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      nested: {
        authorization: 'Bearer 123456789',
        secret: 'my-secret',
        normalKey: 'visible-value',
      },
    };

    const masked = maskSensitiveValue(data, '', defaultKeys);
    expect(masked.user).toBe('alice');
    expect(masked.password).toBe('****** (Masked)');
    expect(masked.token).toBe('****** (Masked)');
    expect(masked.nested.authorization).toBe('****** (Masked)');
    expect(masked.nested.secret).toBe('****** (Masked)');
    expect(masked.nested.normalKey).toBe('visible-value');
  });

  it('should mask array elements containing sensitive keys', () => {
    const list = [
      { id: 1, apiKey: 'key-123' },
      { id: 2, apiKey: 'key-456' },
    ];

    const masked = maskSensitiveValue(list, '', ['apiKey']);
    expect(masked[0].id).toBe(1);
    expect(masked[0].apiKey).toBe('****** (Masked)');
    expect(masked[1].apiKey).toBe('****** (Masked)');
  });

  it('should allow custom sensitive keys list', () => {
    const data = {
      username: 'bob',
      creditCard: '4111-2222-3333-4444',
    };

    const masked = maskSensitiveValue(data, '', ['creditCard']);
    expect(masked.username).toBe('bob');
    expect(masked.creditCard).toBe('****** (Masked)');
  });

  it('should return primitive values unchanged', () => {
    expect(maskSensitiveValue('hello', '', defaultKeys)).toBe('hello');
    expect(maskSensitiveValue(123, '', defaultKeys)).toBe(123);
    expect(maskSensitiveValue(null, '', defaultKeys)).toBe(null);
    expect(maskSensitiveValue(undefined, '', defaultKeys)).toBe(undefined);
  });
});
