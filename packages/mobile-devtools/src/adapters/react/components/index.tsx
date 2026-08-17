import React, { useEffect, useRef } from 'react';
import { DevToolsConfig } from '../../../core';
import { MobileDevToolsEngine } from '../../../ui';

/**
 * Props for the React `<MobileDevTools />` overlay component.
 */
export interface MobileDevToolsProps extends DevToolsConfig {
  /** Optional nested configuration object */
  config?: DevToolsConfig;
}

/**
 * Mobile DevTools React Component.
 * Mounts an isolated Shadow DOM in-app debugger overlay for React applications.
 *
 * @example
 * ```tsx
 * import { MobileDevTools } from 'mobile-devtools/react';
 *
 * export function App() {
 *   return (
 *     <MobileDevTools
 *       forceEnable
 *       shakeToToggle
 *       position="bottom-right"
 *       theme={{ mode: 'dark' }}
 *     />
 *   );
 * }
 * ```
 */
export const MobileDevTools: React.FC<MobileDevToolsProps> = (props) => {
  const { config, ...restProps } = props;
  const mergedConfig = config ? { ...config, ...restProps } : restProps;
  const engineRef = useRef<MobileDevToolsEngine | null>(null);

  useEffect(() => {
    const engine = new MobileDevToolsEngine(mergedConfig);
    engine.mount();
    engineRef.current = engine;

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.updateConfig(mergedConfig);
    }
  }, [props]);

  return null; // Renders inside Shadow DOM natively via mobile-devtools engine
};
