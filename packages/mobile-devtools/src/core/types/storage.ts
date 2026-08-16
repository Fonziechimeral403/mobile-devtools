export type StorageType = 'localStorage' | 'sessionStorage' | 'cookie';

export interface StorageItem {
  key: string;
  value: string;
  type: StorageType;
}

export interface CookieItem {
  key: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: string;
}
