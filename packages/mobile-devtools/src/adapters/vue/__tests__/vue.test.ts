import { describe, expect, it } from 'vitest';
import { createApp, h } from 'vue';
import { MobileDevTools, useMobileDevTools } from '../index';

describe('Vue Adapter', () => {
  it('should render Vue MobileDevTools component and mount shadow DOM root', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const app = createApp({
      render() {
        return h(MobileDevTools, { title: 'Vue Test', position: 'bottom-left' });
      },
    });

    app.mount(container);

    const shadowHost = document.querySelector('mobile-devtools-root');
    expect(shadowHost).not.toBeNull();

    app.unmount();
    document.body.removeChild(container);

    const shadowHostAfterUnmount = document.querySelector('mobile-devtools-root');
    expect(shadowHostAfterUnmount).toBeNull();
  });

  it('should support useMobileDevTools composable hook', () => {
    let result: ReturnType<typeof useMobileDevTools> | undefined;
    const container = document.createElement('div');
    document.body.appendChild(container);

    const app = createApp({
      setup() {
        result = useMobileDevTools({ title: 'Composable Test' });
        return () => null;
      },
    });

    app.mount(container);

    expect(result).toBeDefined();
    expect(result?.getEngine()).not.toBeNull();
    expect(result?.getStore()).not.toBeNull();

    app.unmount();
    document.body.removeChild(container);
  });
});
