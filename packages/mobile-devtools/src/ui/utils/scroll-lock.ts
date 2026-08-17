export function setupScrollLockGuard(el: HTMLElement) {
  el.style.overscrollBehavior = 'contain';
  (el.style as any).webkitOverflowScrolling = 'touch';
  el.style.touchAction = 'pan-y';

  el.addEventListener(
    'touchstart',
    () => {
      const top = el.scrollTop;
      const total = el.scrollHeight;
      const current = top + el.clientHeight;

      if (total > el.clientHeight) {
        if (top <= 0) {
          el.scrollTop = 1;
        } else if (current >= total) {
          el.scrollTop = total - el.clientHeight - 1;
        }
      }
    },
    { passive: true }
  );

  el.addEventListener(
    'touchmove',
    (e: TouchEvent) => {
      if (el.scrollHeight <= el.clientHeight) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }
      e.stopPropagation();
    },
    { passive: false }
  );
}
