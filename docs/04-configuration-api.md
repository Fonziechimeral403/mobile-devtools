# 04. Full Configuration & API Reference

Exhaustive TypeScript reference for all configuration types and options in `mobile-devtools`.

---

## 📐 `DevToolsConfig` Interface

```ts
export interface DevToolsConfig {
  enabled?: boolean;
  forceEnable?: boolean;
  defaultOpen?: boolean;
  title?: string;
  icon?: string;
  position?: BadgePosition | BadgePositionPreset;
  initialTab?: DevToolsTabId;
  enabledTabs?: DevToolsTabId[];
  customTabs?: CustomTabDefinition[];
  theme?: DevToolsTheme;
  styles?: DevToolsStyles;
  privacy?: PrivacyConfig;
  interceptors?: InterceptorConfig;
  autoSnapBadge?: boolean;
  container?: HTMLElement | null;
}
```

---

## ⚙️ Detailed Option Reference

| Option          | Type                                   | Default                                                   | Description                                                                                                                                                            |
| :-------------- | :------------------------------------- | :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`       | `boolean`                              | `true` (in dev)                                           | Enable or disable the DevTools overlay. Automatically set to `false` in production builds.                                                                             |
| `forceEnable`   | `boolean`                              | `false`                                                   | Force enable DevTools overlay in production builds for QA testing & staging previews.                                                                                  |
| `title`         | `string`                               | `'DevTools'`                                              | Text title label displayed on floating badge and drawer header.                                                                                                        |
| `icon`          | `string`                               | `undefined`                                               | Custom icon on badge header (Emoji string like `'⚡'`, Image URL, or Base64 data URI).                                                                                 |
| `position`      | `BadgePositionPreset \| BadgePosition` | `'bottom-right'`                                          | Initial corner/edge preset (`'bottom-right'`, `'bottom-left'`, `'top-right'`, `'top-left'`, `'bottom'`, `'top'`, `'left'`, `'right'`) or coordinate object `{ x, y }`. |
| `initialTab`    | `DevToolsTabId`                        | `'console'`                                               | Default active tab when drawer opens (`'console'`, `'elements'`, `'network'`, `'storage'`, `'system'`).                                                                |
| `enabledTabs`   | `DevToolsTabId[]`                      | `['console', 'elements', 'network', 'storage', 'system']` | Array of tab IDs to enable in drawer bar.                                                                                                                              |
| `customTabs`    | `CustomTabDefinition[]`                | `[]`                                                      | Pluggable custom consumer tabs array with DOM rendering callbacks.                                                                                                     |
| `styles`        | `DevToolsStyles`                       | `undefined`                                               | Fine-grained custom style overrides object (`{ badge?: {}, drawer?: {}, overlay?: {}, handle?: {} }`).                                                                 |
| `defaultOpen`   | `boolean`                              | `false`                                                   | Set to `true` to automatically open the drawer overlay when mounted.                                                                                                   |
| `autoSnapBadge` | `boolean`                              | `false`                                                   | Enable magnetic snapping of badge to nearest screen edge on drag release.                                                                                              |
| `container`     | `HTMLElement \| null`                  | `null`                                                    | Target parent element for Shadow DOM host insertion (defaults to `document.body`).                                                                                     |

---

## 🎨 `DevToolsTheme` Interface

```ts
export interface DevToolsTheme {
  mode?: 'dark' | 'light';
  accentColor?: string;
  backgroundColor?: string;
  cardBackgroundColor?: string;
  cardBorderColor?: string;
  borderColor?: string;
  textColor?: string;
  textMutedColor?: string;
  errorColor?: string;
  warningColor?: string;
  successColor?: string;
  fontFamily?: string;
}
```

---

## 🎨 `DevToolsStyles` Interface

```ts
export interface DevToolsStyles {
  badge?: Record<string, string>;
  drawer?: Record<string, string>;
  overlay?: Record<string, string>;
  handle?: Record<string, string>;
}
```

---

## 🔌 `CustomTabDefinition` Interface

```ts
export interface CustomTabDefinition {
  id: string;
  title: string;
  icon?: string;
  render: (container: HTMLElement) => void | (() => void);
}
```

---

## 🛡️ `PrivacyConfig` Interface

```ts
export interface PrivacyConfig {
  mask?: string[];
}
```

Default `mask`: `undefined` (opt-in masking. Users can supply an array of sensitive keywords to mask, e.g. `['authorization', 'cookie', 'token', 'password']`).

---

## 📡 `InterceptorConfig` Interface

```ts
export interface InterceptorConfig {
  maxLogLimit?: number;
}
```

Default `maxLogLimit`: `200` entries.
