import { DevToolsStore } from '../stores/devtools-store';
import { LogLevel } from '../types/log';
import { isServer } from '../utils/env';

export class ConsoleInterceptor {
  private originalMethods: Partial<Record<LogLevel, (...args: any[]) => void>> = {};
  private isPatched = false;
  private store: DevToolsStore;

  constructor(store: DevToolsStore) {
    this.store = store;
  }

  public init() {
    if (this.isPatched || isServer) return;

    const levels: LogLevel[] = ['log', 'info', 'warn', 'error', 'debug'];

    levels.forEach((level) => {
      if (console && typeof console[level] === 'function') {
        this.originalMethods[level] = console[level].bind(console);

        console[level] = (...args: any[]) => {
          // Capture log entry before calling original method
          try {
            this.handleLog(level, args);
          } catch (e) {
            // Ignore error in logger to avoid infinite loop
          }

          // Invoke original console method
          if (this.originalMethods[level]) {
            this.originalMethods[level]!(...args);
          }
        };
      }
    });

    this.isPatched = true;
  }

  private handleLog(level: LogLevel, args: any[]) {
    let stack: string | undefined;

    // Check if any arg is an Error instance to extract stack trace
    for (const arg of args) {
      if (arg instanceof Error && arg.stack) {
        stack = arg.stack;
        break;
      }
    }

    if (!stack && level === 'error') {
      try {
        throw new Error();
      } catch (err: any) {
        stack = err.stack;
        if (stack) {
          // Clean up internal logger stack lines
          const lines = stack.split('\n');
          stack = lines.slice(3).join('\n');
        }
      }
    }

    const processedArgs = args.map((arg) => this.serializeArg(arg));

    this.store.addLog({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      level,
      args: processedArgs,
      timestamp: Date.now(),
      stack,
      count: 1,
    });
  }

  private serializeArg(arg: any): any {
    if (arg === undefined) return 'undefined';
    if (arg === null) return null;
    if (typeof arg === 'function') return `[Function: ${arg.name || 'anonymous'}]`;
    if (typeof arg === 'symbol') return arg.toString();
    if (arg instanceof Error) {
      return {
        name: arg.name,
        message: arg.message,
        stack: arg.stack,
      };
    }
    if (arg instanceof HTMLElement) {
      return `<${arg.tagName.toLowerCase()}${arg.id ? ` id="${arg.id}"` : ''}${
        arg.className ? ` class="${arg.className}"` : ''
      }>`;
    }
    return arg;
  }

  public restore() {
    if (!this.isPatched || isServer) return;

    Object.entries(this.originalMethods).forEach(([level, method]) => {
      if (method && console) {
        console[level as LogLevel] = method;
      }
    });

    this.originalMethods = {};
    this.isPatched = false;
  }
}
