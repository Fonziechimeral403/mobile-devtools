/**
 * Prevents mobile browser overscroll bounce (rubber-banding) from bleeding through to host web page.
 * Supports both vertical and horizontal scrollable containers without blocking touch gestures.
 * @param el Target scrollable HTML element.
 */
export function setupScrollLockGuard(el: HTMLElement) {
  el.style.overscrollBehavior = 'contain';
  (el.style as any).webkitOverflowScrolling = 'touch';
  el.style.touchAction = 'pan-x pan-y';

  el.addEventListener(
    'touchstart',
    () => {
      // 1. Vertical bounce guard
      const top = el.scrollTop;
      const totalH = el.scrollHeight;
      const currentH = top + el.clientHeight;

      if (totalH > el.clientHeight) {
        if (top <= 0) {
          el.scrollTop = 1;
        } else if (currentH >= totalH) {
          el.scrollTop = totalH - el.clientHeight - 1;
        }
      }

      // 2. Horizontal bounce guard
      const left = el.scrollLeft;
      const totalW = el.scrollWidth;
      const currentW = left + el.clientWidth;

      if (totalW > el.clientWidth) {
        if (left <= 0) {
          el.scrollLeft = 1;
        } else if (currentW >= totalW) {
          el.scrollLeft = totalW - el.clientWidth - 1;
        }
      }
    },
    { passive: true }
  );

  el.addEventListener(
    'touchmove',
    (e: TouchEvent) => {
      const isVerticallyScrollable = el.scrollHeight > el.clientHeight;
      const isHorizontallyScrollable = el.scrollWidth > el.clientWidth;

      // Only prevent default if element cannot scroll in EITHER direction
      if (!isVerticallyScrollable && !isHorizontallyScrollable) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }
      e.stopPropagation();
    },
    { passive: false }
  );
}
