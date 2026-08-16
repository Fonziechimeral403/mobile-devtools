import { BadgePositionPreset, ThemeMode } from '../constants';

export type DevToolsTabId = 'console' | 'elements' | 'network' | 'storage' | 'system' | string;

export interface BadgePosition {
  x: number;
  y: number;
  corner?: BadgePositionPreset;
}

export type { ThemeMode };

export interface DevToolsTheme {
  mode?: ThemeMode;
  backgroundColor?: string;
  cardBackgroundColor?: string;
  cardBorderColor?: string;
  borderColor?: string;
  textColor?: string;
  textMutedColor?: string;
  accentColor?: string;
  errorColor?: string;
  warningColor?: string;
  successColor?: string;
  fontFamily?: string;
}

export interface InterceptorConfig {
  maxLogLimit?: number;
  maxNetworkLimit?: number;
  ignoreNetworkUrls?: (string | RegExp)[];
  enableConsoleInterceptor?: boolean;
  enableFetchInterceptor?: boolean;
  enableXhrInterceptor?: boolean;
}

export interface CustomTabDefinition {
  id: string;
  title: string;
  icon?: string;
  render?: (container: HTMLElement) => void;
}

export interface PrivacyConfig {
  mask?: string[];
}

export interface DevToolsStyles {
  badge?: Record<string, string>;
  drawer?: Record<string, string>;
  overlay?: Record<string, string>;
  handle?: Record<string, string>;
}

export interface DevToolsConfig {
  enabled?: boolean;
  forceEnable?: boolean;
  defaultOpen?: boolean;
  initialTab?: DevToolsTabId;
  enabledTabs?: DevToolsTabId[];
  customTabs?: CustomTabDefinition[];
  theme?: DevToolsTheme;
  interceptors?: InterceptorConfig;
  privacy?: PrivacyConfig;
  position?: BadgePosition | BadgePositionPreset;
  styles?: DevToolsStyles;
  badgeStyle?: Record<string, string>;
  title?: string;
  icon?: any;
  autoSnapBadge?: boolean;
  container?: HTMLElement | null;
}
