import { DevToolsConfig, DevToolsStore } from '../../core';
import { MobileDevToolsEngine } from '../../ui';

export interface SvelteDevToolsInstance {
  engine: MobileDevToolsEngine;
  store: DevToolsStore;
  destroy: () => void;
}

/**
 * Svelte composable hook to mount MobileDevTools lifecycle.
 */
export function useMobileDevTools(config?: DevToolsConfig): SvelteDevToolsInstance {
  const engine = new MobileDevToolsEngine(config);
  const { store } = engine.mount();

  return {
    engine,
    store,
    destroy: () => engine.destroy(),
  };
}

/**
 * Svelte Action directive: `<div use:mobileDevTools={config} />`
 */
export function mobileDevTools(node: HTMLElement, config?: DevToolsConfig) {
  const engine = new MobileDevToolsEngine({
    ...config,
    container: node,
  });
  engine.mount();

  return {
    update(newConfig: DevToolsConfig) {
      engine.updateConfig(newConfig);
    },
    destroy() {
      engine.destroy();
    },
  };
}

export type { DevToolsConfig, DevToolsStore };
