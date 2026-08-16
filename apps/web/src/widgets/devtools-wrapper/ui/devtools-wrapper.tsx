'use client';

import { MobileDevTools } from 'mobile-devtools/react';

export function DevToolsWrapper() {
  return (
    <MobileDevTools
      forceEnable
      title="DevTools"
      position="bottom-right"
      interceptors={{
        maxLogLimit: 150,
        maxNetworkLimit: 100,
      }}
    />
  );
}
