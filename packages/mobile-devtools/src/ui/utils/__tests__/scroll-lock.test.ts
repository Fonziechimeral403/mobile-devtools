import { describe, expect, it, vi } from 'vitest';
import { setupScrollLockGuard } from '../scroll-lock';

describe('scroll-lock', () => {
  it('should set initial inline CSS properties on target element', () => {
    const el = document.createElement('div');
    setupScrollLockGuard(el);

    expect(el.style.overscrollBehavior).toBe('contain');
    expect(el.style.touchAction).toBe('pan-y');
  });

  it('should adjust scrollTop to 1px on touchstart when scrollTop is 0 and scrollable', () => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'clientHeight', { value: 100, configurable: true });
    Object.defineProperty(el, 'scrollHeight', { value: 300, configurable: true });
    el.scrollTop = 0;

    setupScrollLockGuard(el);

    const touchEvent = new Event('touchstart', { bubbles: true });
    el.dispatchEvent(touchEvent);

    expect(el.scrollTop).toBe(1);
  });

  it('should stopPropagation on touchmove', () => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'clientHeight', { value: 100, configurable: true });
    Object.defineProperty(el, 'scrollHeight', { value: 300, configurable: true });

    setupScrollLockGuard(el);

    const touchMoveEvent = new Event('touchmove', { bubbles: true, cancelable: true });
    const stopPropagationSpy = vi.spyOn(touchMoveEvent, 'stopPropagation');

    el.dispatchEvent(touchMoveEvent);

    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  it('should preventDefault on touchmove if content is not scrollable', () => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'clientHeight', { value: 200, configurable: true });
    Object.defineProperty(el, 'scrollHeight', { value: 100, configurable: true });

    setupScrollLockGuard(el);

    const touchMoveEvent = new Event('touchmove', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(touchMoveEvent, 'preventDefault');

    el.dispatchEvent(touchMoveEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
