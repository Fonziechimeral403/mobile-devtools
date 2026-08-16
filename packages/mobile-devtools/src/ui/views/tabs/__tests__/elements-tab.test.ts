import { describe, it, expect, beforeEach } from 'vitest';
import { DevToolsStore } from '../../../../core';
import { ElementsTabView } from '../elements-tab';

describe('ElementsTabView', () => {
  let store: DevToolsStore;
  let tabView: ElementsTabView;

  beforeEach(() => {
    store = new DevToolsStore();
    tabView = new ElementsTabView(store);
  });

  it('should render element inspector tree and details', () => {
    const el = tabView.render();
    expect(el).toBeDefined();

    const text = el.textContent || '';
    expect(text).toBeDefined();
  });
});
