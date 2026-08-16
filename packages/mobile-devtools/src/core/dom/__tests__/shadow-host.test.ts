import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ShadowHostManager } from '../shadow-host';

describe('ShadowHostManager', () => {
  let manager: ShadowHostManager;

  beforeEach(() => {
    manager = new ShadowHostManager();
  });

  afterEach(() => {
    manager.unmount();
  });

  it('should mount shadow host into document.body and create shadow root', () => {
    const { shadowRoot, container } = manager.mount();
    expect(shadowRoot).toBeDefined();
    expect(container).toBeDefined();
    expect(container.className).toContain('mobile-devtools-container');

    const host = document.getElementById('mobile-devtools-root');
    expect(host).not.toBeNull();
  });

  it('should mount into custom target parent if provided', () => {
    const customParent = document.createElement('div');
    document.body.appendChild(customParent);

    const { shadowRoot } = manager.mount(customParent);
    expect(shadowRoot).toBeDefined();
    expect(customParent.children.length).toBe(1);

    document.body.removeChild(customParent);
  });

  it('should inject CSS styles into shadow root', () => {
    const { shadowRoot } = manager.mount();
    manager.injectStyles('.custom-class { color: red; }');

    const styleTags = shadowRoot.querySelectorAll('style');
    expect(styleTags.length).toBe(1);
    expect(styleTags[0].textContent).toContain('.custom-class');
  });

  it('should unmount and remove host element from DOM', () => {
    manager.mount();
    expect(document.getElementById('mobile-devtools-root')).not.toBeNull();

    manager.unmount();
    expect(document.getElementById('mobile-devtools-root')).toBeNull();
  });
});
