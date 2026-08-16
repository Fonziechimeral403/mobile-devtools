import { describe, it, expect, beforeEach } from 'vitest';
import { DevToolsStore } from '../../../../core';
import { SystemTabView } from '../system-tab';

describe('SystemTabView', () => {
  let store: DevToolsStore;
  let tabView: SystemTabView;

  beforeEach(() => {
    store = new DevToolsStore();
    tabView = new SystemTabView(store);
  });

  it('should render system environment information table', () => {
    const el = tabView.render();
    expect(el).toBeDefined();

    const table = el.querySelector('.devtools-table');
    expect(table).not.toBeNull();
    expect(el.textContent).toContain('User Agent');
    expect(el.textContent).toContain('Screen Resolution');
  });
});
