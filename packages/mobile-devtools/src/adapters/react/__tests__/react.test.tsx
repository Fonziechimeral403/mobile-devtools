import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { beforeAll, describe, expect, it } from 'vitest';
import { MobileDevTools } from '../index';

describe('React Adapter', () => {
  beforeAll(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  });

  it('should render MobileDevTools component and mount shadow DOM root', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<MobileDevTools title="React Test" position="top-right" />);
    });

    const shadowHost = document.querySelector('mobile-devtools-root');
    expect(shadowHost).not.toBeNull();

    act(() => {
      root.unmount();
    });

    document.body.removeChild(container);
    const shadowHostAfterUnmount = document.querySelector('mobile-devtools-root');
    expect(shadowHostAfterUnmount).toBeNull();
  });

  it('should accept merged config prop', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const config = { title: 'Merged Config', initialTab: 'network' as const };
    act(() => {
      root.render(<MobileDevTools config={config} autoSnapBadge />);
    });

    const shadowHost = document.querySelector('mobile-devtools-root');
    expect(shadowHost).not.toBeNull();

    act(() => {
      root.unmount();
    });
    document.body.removeChild(container);
  });
});
