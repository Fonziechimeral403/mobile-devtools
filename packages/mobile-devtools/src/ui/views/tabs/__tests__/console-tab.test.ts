import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DevToolsStore } from '../../../../core';
import { ConsoleTabView } from '../console-tab';

describe('ConsoleTabView', () => {
  let store: DevToolsStore;
  let tabView: ConsoleTabView;

  beforeEach(() => {
    store = new DevToolsStore();
    tabView = new ConsoleTabView(store);
  });

  it('should render toolbar and log entries', () => {
    store.addLog({ id: '1', level: 'log', args: ['User logged in'], timestamp: Date.now(), count: 1 });
    store.addLog({ id: '2', level: 'error', args: ['Database error'], timestamp: Date.now(), count: 1 });

    const el = tabView.render();
    expect(el).toBeDefined();
    expect(el.querySelectorAll('.devtools-code-card').length).toBe(2);
  });

  it('should clear logs when clear button is clicked', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    store.addLog({ id: '1', level: 'warn', args: ['Warning message'], timestamp: Date.now(), count: 1 });

    const el = tabView.render();
    const clearBtn = el.querySelector('.devtools-btn-danger') as HTMLButtonElement;
    expect(clearBtn).not.toBeNull();

    clearBtn.click();
    expect(store.getLogs().length).toBe(0);
  });
});
