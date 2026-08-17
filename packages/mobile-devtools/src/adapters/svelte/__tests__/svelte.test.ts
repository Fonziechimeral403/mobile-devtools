import { describe, expect, it } from 'vitest';
import { mobileDevTools, useMobileDevTools } from '../index';

describe('Svelte Adapter', () => {
  it('should initialize via useMobileDevTools composable hook', () => {
    const instance = useMobileDevTools({ title: 'Svelte Hook Test' });
    expect(instance.store).not.toBeNull();

    const shadowHost = document.querySelector('mobile-devtools-root');
    expect(shadowHost).not.toBeNull();

    instance.destroy();

    const shadowHostAfterDestroy = document.querySelector('mobile-devtools-root');
    expect(shadowHostAfterDestroy).toBeNull();
  });

  it('should mount via mobileDevTools action directive', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const action = mobileDevTools(container, { title: 'Svelte Action Test' });
    const shadowHost = document.querySelector('mobile-devtools-root');
    expect(shadowHost).not.toBeNull();

    action.destroy();
    document.body.removeChild(container);

    const shadowHostAfterDestroy = document.querySelector('mobile-devtools-root');
    expect(shadowHostAfterDestroy).toBeNull();
  });
});
