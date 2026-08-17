# mobile-devtools

> **Next-Gen Framework-Agnostic In-App Mobile Debugger & Inspector Overlay for Web Applications**

[![Bundle Size](https://img.shields.io/badge/Bundle_Size-~2.0_kB_gzipped-10b981.svg)](https://bundlephobia.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/Adapter-React_18%2F19-61dafb.svg)](https://react.dev/)
[![Vue](https://img.shields.io/badge/Adapter-Vue_3-42b883.svg)](https://vuejs.org/)
[![Vanilla JS](https://img.shields.io/badge/Adapter-Vanilla_JS-f7df1e.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 📌 Features

- ⚡ **Ultra-Lightweight & Fast**: Small footprint (**~2.0 kB gzipped**) with zero runtime dependencies.
- 🌳 **DOM Elements Inspector (Elements Tab)**: Real-time HTML DOM tree browser, interactive element picker, box model visualization (margin, border, padding, content), computed CSS styles, and grouped style categories (Layout, Flexbox, Grid, Typography, Colors).
- 📋 **Console Tab**: Real-time capture of `console.log`, `info`, `warn`, `error`, and `debug` with live filter search, JSON tree preview, and unread error badges.
- 🌐 **Network Tab**: Live interception of `fetch` and `XMLHttpRequest` calls with HTTP status indicators, latency timing, request/response headers, and JSON body previews.
- 💾 **Storage Tab**: Real-time inspector and editor for `localStorage`, `sessionStorage`, and `document.cookie`.
- 💻 **System Info Tab**: Real-time diagnostic monitor for viewport dimensions, device pixel ratio (DPR), user agent string, memory limit, and screen orientation.
- 🚀 **Quick Bug Exporter**: Instant 1-click bug report sharing via Web Share API (`navigator.share`) with text file download and copy fallbacks.
- 🛡️ **Shadow DOM Style Isolation**: Rendered inside a Shadow DOM container (`<mobile-devtools-root>`), guaranteeing **zero CSS leaks** into your app's global styles.
- 🔌 **Pluggable Custom Tabs (`customTabs`)**: Easily extend DevTools by adding custom tabs with your own DOM rendering callbacks (`render(container)`).
- 🎨 **Granular UI Style Overrides (`styles`)**: Fine-grained inline CSS style overrides for badge, drawer, overlay, and handle (`styles={{ badge: {}, drawer: {}, overlay: {} }}`).
- 🎨 **Dynamic Theme Engine**: Built-in Light Mode and Dark Mode with auto-contrast luminance detection.

---

## 🚀 Quickstart

### 📦 Installation

```bash
npm install mobile-devtools
# or
pnpm add mobile-devtools
```

---

### ⚛️ React Integration

```tsx
import React from 'react';
import { MobileDevTools } from 'mobile-devtools/react';

export default function App() {
  return (
    <>
      <YourAppRoutes />
      <MobileDevTools
        title="My App Debugger"
        position="bottom-right"
        enabledTabs={['console', 'elements', 'network', 'storage', 'system']}
        theme={{ mode: 'dark', accentColor: '#0070f3' }}
      />
    </>
  );
}
```

---

### 💚 Vue 3 Integration

```html
<script setup>
  import { MobileDevTools } from 'mobile-devtools/vue';
</script>

<template>
  <YourAppLayout />
  <MobileDevTools
    title="My App Debugger"
    position="bottom-right"
    :enabled-tabs="['console', 'elements', 'network', 'storage', 'system']"
    :theme="{ mode: 'dark', accentColor: '#0070f3' }"
  />
</template>
```

---

### 🍦 Vanilla JS / Legacy Apps

```typescript
import { createMobileDevTools } from 'mobile-devtools';

const devtools = createMobileDevTools({
  title: 'My App Debugger',
  position: 'bottom-right',
  enabledTabs: ['console', 'elements', 'network', 'storage', 'system'],
  theme: {
    mode: 'dark',
    accentColor: '#0070f3',
  },
});
```

---

## ⚙️ Configuration Reference

| Option / Prop   | Type                    | Default                                                   | Description                                                                     |
| :-------------- | :---------------------- | :-------------------------------------------------------- | :------------------------------------------------------------------------------ |
| `enabled`       | `boolean`               | `true` (in dev)                                           | Enable/disable overlay. Automatically false in production builds.              |
| `forceEnable`  | `boolean`               | `false`                                                   | Force enable overlay in production for QA testing & staging previews.           |
| `title`         | `string`                | `'DevTools'`                                              | Label shown on floating badge and drawer header                                 |
| `position`      | `BadgePositionPreset`   | `'bottom-right'`                                          | Initial corner preset (`'bottom-right'`, `'bottom-left'`, `'top-right'`, etc.)  |
| `initialTab`    | `DevToolsTabId`         | `'console'`                                               | Default tab opened (`'console'`, `'elements'`, `'network'`, `'storage'`, `'system'`) |
| `enabledTabs`   | `DevToolsTabId[]`       | `['console', 'elements', 'network', 'storage', 'system']` | Filter enabled tabs                                                             |
| `customTabs`    | `CustomTabDefinition[]` | `[]`                                                      | Pluggable custom tabs with DOM rendering callback (`render(container)`)         |
| `styles`        | `DevToolsStyles`        | `undefined`                                               | Custom style overrides (`{ badge?: {}, drawer?: {}, overlay?: {} }`)            |
| `theme.mode`    | `'dark' \| 'light'`     | `'dark'`                                                  | Theme mode                                                                      |
| `autoSnapBadge` | `boolean`               | `false`                                                   | Auto snap badge to nearest screen edge on drag release                          |

---

## 📄 License

Distributed under the **MIT License**.
