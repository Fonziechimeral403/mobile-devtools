import { BadgePositionPreset, ThemeMode } from '../constants';

/**
 * Built-in tab identifiers or custom tab ID strings.
 */
export type DevToolsTabId = 'console' | 'elements' | 'network' | 'storage' | 'system' | string;

/**
 * Position coordinates or corner preset for the floating badge.
 */
export interface BadgePosition {
  /** X-coordinate in pixels from left edge of screen */
  x: number;
  /** Y-coordinate in pixels from top edge of screen */
  y: number;
  /** Optional corner preset for initial placement */
  corner?: BadgePositionPreset;
}

export type { ThemeMode };

/**
 * Theme customization options for Mobile DevTools UI overlay.
 */
export interface DevToolsTheme {
  /**
   * Theme mode setting ('dark', 'light', or 'auto').
   * @default 'dark'
   */
  mode?: ThemeMode;
  /** Primary background color CSS value */
  backgroundColor?: string;
  /** Card background color CSS value */
  cardBackgroundColor?: string;
  /** Card border color CSS value */
  cardBorderColor?: string;
  /** Primary border color CSS value */
  borderColor?: string;
  /** Main text color CSS value */
  textColor?: string;
  /** Muted/secondary text color CSS value */
  textMutedColor?: string;
  /** Accent brand color CSS value */
  accentColor?: string;
  /** Error indicator color CSS value */
  errorColor?: string;
  /** Warning indicator color CSS value */
  warningColor?: string;
  /** Success indicator color CSS value */
  successColor?: string;
  /** Font family stack for DevTools overlay */
  fontFamily?: string;
}

/**
 * Configuration options for Network, Console, WebSocket, and SSE interceptors.
 */
export interface InterceptorConfig {
  /**
   * Maximum number of console logs retained in memory.
   * @default 200
   */
  maxLogLimit?: number;
  /**
   * Maximum number of network requests retained in memory.
   * @default 100
   */
  maxNetworkLimit?: number;
  /**
   * List of URL strings or RegExps to exclude from network interception.
   * @example ['/healthz', /\.png$/]
   */
  ignoreNetworkUrls?: (string | RegExp)[];
  /**
   * Enable or disable console log/warn/error interception.
   * @default true
   */
  enableConsoleInterceptor?: boolean;
  /**
   * Enable or disable window.fetch API interception.
   * @default true
   */
  enableFetchInterceptor?: boolean;
  /**
   * Enable or disable XMLHttpRequest interception.
   * @default true
   */
  enableXhrInterceptor?: boolean;
  /**
   * Enable or disable WebSocket frame interception.
   * @default true
   */
  enableWebSocketInterceptor?: boolean;
  /**
   * Enable or disable EventSource (SSE) stream interception.
   * @default true
   */
  enableSSEInterceptor?: boolean;
}

/**
 * Definition for registering custom tabs in Mobile DevTools.
 */
export interface CustomTabDefinition {
  /** Unique ID for the custom tab */
  id: string;
  /** Display title shown in the tab header */
  title: string;
  /** Optional SVG icon string */
  icon?: string;
  /** Custom render function executed when the tab is active */
  render?: (container: HTMLElement) => void;
}

/**
 * Privacy and sensitive data masking configuration.
 */
export interface PrivacyConfig {
  /**
   * Keys or header names to mask in DevTools views (e.g. passwords, tokens).
   * @example ['password', 'authorization', 'secret']
   */
  mask?: string[];
}

/**
 * Custom CSS style overrides for DevTools DOM elements.
 */
export interface DevToolsStyles {
  /** Style overrides for the floating trigger badge */
  badge?: Record<string, string>;
  /** Style overrides for the main drawer panel */
  drawer?: Record<string, string>;
  /** Style overrides for the backdrop overlay */
  overlay?: Record<string, string>;
  /** Style overrides for drag handle elements */
  handle?: Record<string, string>;
}

/**
 * Main Configuration interface for Mobile DevTools overlay.
 */
export interface DevToolsConfig {
  /**
   * Enable or disable DevTools overlay.
   * @default true
   */
  enabled?: boolean;
  /**
   * Force DevTools to mount regardless of NODE_ENV environment.
   * @default false
   */
  forceEnable?: boolean;
  /**
   * Open DevTools drawer immediately upon mounting.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Allow physical device shake motion gesture to toggle DevTools drawer.
   * @default true
   */
  shakeToToggle?: boolean;
  /**
   * Acceleration threshold required to trigger device shake toggle.
   * @default 12
   */
  shakeThreshold?: number;
  /**
   * Show or hide the floating badge trigger on screen.
   * @default true
   */
  showBadge?: boolean;
  /**
   * Tab to display initially when DevTools is opened.
   * @default 'console'
   */
  initialTab?: DevToolsTabId;
  /**
   * Array of enabled built-in tab IDs to display in DevTools drawer.
   * @default ['console', 'elements', 'network', 'storage', 'system']
   */
  enabledTabs?: DevToolsTabId[];
  /**
   * Custom tabs registered to extend DevTools functionality.
   */
  customTabs?: CustomTabDefinition[];
  /**
   * Theme configuration (mode, colors, font family).
   */
  theme?: DevToolsTheme;
  /**
   * Interceptor options for logs, network requests, WebSockets, and SSE.
   */
  interceptors?: InterceptorConfig;
  /**
   * Sensitive data masking rules.
   */
  privacy?: PrivacyConfig;
  /**
   * Initial screen corner or coordinates for the floating badge.
   * @default 'bottom-right'
   */
  position?: BadgePosition | BadgePositionPreset;
  /**
   * Custom CSS style overrides for DevTools overlay elements.
   */
  styles?: DevToolsStyles;
  /**
   * Title text displayed in the DevTools drawer header.
   * @default 'DevTools'
   */
  title?: string;
  /**
   * Custom logo/icon SVG displayed in DevTools header.
   */
  icon?: any;
  /**
   * Automatically snap floating badge to nearest screen edge when dragged.
   * @default false
   */
  autoSnapBadge?: boolean;
  /**
   * Parent HTML element to mount Shadow DOM container into.
   * @default document.body
   */
  container?: HTMLElement | null;
}
