import { LogEntry } from './log';
import { NetworkRequestEntry } from './network';
import { StorageItem } from './storage';

export type EventListener<T = any> = (data: T) => void;

export interface DevToolsEventMap {
  'log:added': LogEntry;
  'log:cleared': void;
  'network:added': NetworkRequestEntry;
  'network:updated': NetworkRequestEntry;
  'network:cleared': void;
  'storage:changed': StorageItem;
  'drawer:toggle': boolean;
  'tab:changed': string;
  'badge:moved': { x: number; y: number };
}
