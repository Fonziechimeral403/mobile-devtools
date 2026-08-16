import { DevToolsConfig, DevToolsStore } from '../../core';
import { MobileDevToolsEngine } from '../../ui';

export interface MobileDevToolsInstance {
  store: DevToolsStore;
  container: HTMLElement;
  destroy: () => void;
  updateConfig: (config: Partial<DevToolsConfig>) => void;
}

export function createMobileDevTools(config?: DevToolsConfig): MobileDevToolsInstance {
  const engine = new MobileDevToolsEngine(config);
  const { container, store } = engine.mount();

  return {
    store,
    container,
    destroy: () => engine.destroy(),
    updateConfig: (newConfig) => engine.updateConfig(newConfig),
  };
}

export type { DevToolsConfig, DevToolsStore };
