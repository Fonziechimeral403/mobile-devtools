import { describe, it, expect, beforeEach } from 'vitest';
import { DevToolsStore } from '../../../core';
import { FloatingBadgeView } from '../floating-badge';

describe('FloatingBadgeView', () => {
  let store: DevToolsStore;
  let badgeView: FloatingBadgeView;

  beforeEach(() => {
    store = new DevToolsStore();
    badgeView = new FloatingBadgeView(store);
  });

  it('should render badge element and handle tap to open drawer', () => {
    const el = badgeView.render();
    expect(el).toBeDefined();
    expect(el.className).toContain('devtools-badge');

    expect(store.getIsOpen()).toBe(false);

    const downEvt = new Event('pointerdown', { bubbles: true });
    (downEvt as any).clientX = 100;
    (downEvt as any).clientY = 100;
    el.dispatchEvent(downEvt);

    const upEvt = new Event('pointerup', { bubbles: true });
    (upEvt as any).clientX = 100;
    (upEvt as any).clientY = 100;
    el.dispatchEvent(upEvt);

    expect(store.getIsOpen()).toBe(true);
  });

  it('should apply custom styles from styles.badge config', () => {
    store.updateConfig({
      styles: {
        badge: {
          opacity: '0.8',
        },
      },
    });

    const el = badgeView.render();
    expect(el.style.opacity).toBe('0.8');
  });
});
