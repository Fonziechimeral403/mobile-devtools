export const BUILTIN_TABS = {
  CONSOLE: 'console',
  ELEMENTS: 'elements',
  NETWORK: 'network',
  STORAGE: 'storage',
  SYSTEM: 'system',
} as const;

export type BuiltinTabId = (typeof BUILTIN_TABS)[keyof typeof BUILTIN_TABS];

export const LOG_LEVELS = {
  LOG: 'log',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  DEBUG: 'debug',
} as const;

export const NETWORK_TYPES = {
  FETCH: 'fetch',
  XHR: 'xhr',
} as const;

export const NETWORK_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export const STORAGE_TYPES = {
  LOCAL_STORAGE: 'localStorage',
  SESSION_STORAGE: 'sessionStorage',
  COOKIE: 'cookie',
} as const;

export const BADGE_POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

export type BadgePositionPreset = (typeof BADGE_POSITIONS)[keyof typeof BADGE_POSITIONS];

export const STORAGE_KEYS = {
  POSITION: '__mobile_devtools_position__',
  THEME: '__mobile_devtools_theme__',
} as const;

export const THEME_MODES = {
  DARK: 'dark',
  LIGHT: 'light',
  AUTO: 'auto',
} as const;

export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];

export const DEVTOOLS_CLASSNAMES = {
  CONTAINER: 'mobile-devtools-container',
  PICKER_OVERLAY: 'mobile-devtools-picker-overlay',
  DRAWER_OVERLAY: 'devtools-drawer-overlay',
  DRAWER: 'devtools-drawer',
  HANDLE_AREA: 'devtools-handle-area',
  HANDLE_BAR: 'devtools-handle-bar',
  HEADER: 'devtools-header',
  BADGE: 'devtools-badge',
} as const;
