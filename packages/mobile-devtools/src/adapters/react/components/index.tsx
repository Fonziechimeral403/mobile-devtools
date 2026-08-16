import React, { useEffect, useRef } from 'react';
import { DevToolsConfig } from '../../../core';
import { MobileDevToolsEngine } from '../../../ui';

export interface MobileDevToolsProps extends DevToolsConfig {
  config?: DevToolsConfig;
}

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
