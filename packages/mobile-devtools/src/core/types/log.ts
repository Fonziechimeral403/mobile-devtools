export type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

export interface LogEntry {
  id: string;
  level: LogLevel;
  args: any[];
  timestamp: number;
  stack?: string;
  count: number;
}
