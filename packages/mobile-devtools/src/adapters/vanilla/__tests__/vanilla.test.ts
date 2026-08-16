import { describe, it, expect } from 'vitest';
import { createMobileDevTools } from '../index';

describe('createMobileDevTools (Vanilla Adapter)', () => {
  it('should initialize engine, mount to DOM, and provide update/destroy API', () => {
    const devtools = createMobileDevTools({
      title: 'Custom App',
    });

    expect(devtools.store).toBeDefined();
    expect(devtools.container).toBeDefined();
    expect(devtools.store.getConfig().title).toBe('Custom App');

    devtools.updateConfig({ title: 'Updated Title' });
    expect(devtools.store.getConfig().title).toBe('Updated Title');

    expect(() => devtools.destroy()).not.toThrow();
  });
});
