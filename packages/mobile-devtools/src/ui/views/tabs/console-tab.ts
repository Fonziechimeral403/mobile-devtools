import { DevToolsStore, formatTimestamp, LOG_LEVELS } from '../../../core';
import { renderJsonTree } from '../../components/json-tree';
import { TRASH_ICON } from '../../icons';

import { setupScrollLockGuard } from '../../utils/scroll-lock';

export class ConsoleTabView {
  private store: DevToolsStore;
  private container: HTMLElement;
  private listScrollContainer: HTMLElement | null = null;
  private clearBtn: HTMLButtonElement | null = null;
  private searchValue = '';
  private levelFilter: string = 'all';

  constructor(store: DevToolsStore) {
    this.store = store;
    this.container = document.createElement('div');
    this.container.className = 'devtools-tab-content';
  }

  public render(): HTMLElement {
    this.container.innerHTML = '';

    // Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'devtools-toolbar';

    const levelSelect = document.createElement('select');
    levelSelect.className = 'devtools-select';
    levelSelect.style.width = '80px';
    levelSelect.style.minWidth = '80px';
    levelSelect.innerHTML = `
      <option value="all">ALL</option>
      <option value="${LOG_LEVELS.LOG}">LOG</option>
      <option value="${LOG_LEVELS.WARN}">WARN</option>
      <option value="${LOG_LEVELS.ERROR}">ERROR</option>
    `;
    levelSelect.value = this.levelFilter;
    levelSelect.addEventListener('change', (e) => {
      this.levelFilter = (e.target as HTMLSelectElement).value;
      this.updateList();
    });

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'devtools-search-input';
    searchInput.placeholder = 'Filter console logs...';
    searchInput.value = this.searchValue;
    searchInput.addEventListener('input', (e) => {
      this.searchValue = (e.target as HTMLInputElement).value;
      this.updateList();
    });

    this.clearBtn = document.createElement('button');
    this.clearBtn.className = 'devtools-btn devtools-btn-danger devtools-btn-icon-only';
    this.clearBtn.title = 'Clear Console Logs';
    this.clearBtn.innerHTML = TRASH_ICON;
    this.clearBtn.addEventListener('click', () => {
      if (
        window.confirm(
          'Are you sure you want to clear all console logs? This action cannot be undone.'
        )
      ) {
        this.store.clearLogs();
      }
    });

    toolbar.appendChild(levelSelect);
    toolbar.appendChild(searchInput);
    toolbar.appendChild(this.clearBtn);

    // Scrollable List Container
    this.listScrollContainer = document.createElement('div');
    this.listScrollContainer.className = 'devtools-list-scroll';
    setupScrollLockGuard(this.listScrollContainer);

    this.container.appendChild(toolbar);
    this.container.appendChild(this.listScrollContainer);

    this.updateList();
    return this.container;
  }

  public updateList() {
    if (!this.listScrollContainer) return;
    this.listScrollContainer.innerHTML = '';

    const logs = this.store.getLogs();
    if (this.clearBtn) {
      this.clearBtn.disabled = logs.length === 0;
    }
    const filtered = logs.filter((log) => {
      const matchesSearch =
        !this.searchValue.trim() ||
        log.args.some((arg) => String(arg).toLowerCase().includes(this.searchValue.toLowerCase()));
      const matchesLevel = this.levelFilter === 'all' || log.level === this.levelFilter;
      return matchesSearch && matchesLevel;
    });

    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.style.textAlign = 'center';
      empty.style.padding = '32px';
      empty.style.color = 'var(--dev-text-muted)';
      empty.style.fontSize = '12px';
      empty.textContent = 'No console logs recorded.';
      this.listScrollContainer.appendChild(empty);
      return;
    }

    filtered.forEach((log) => {
      const card = document.createElement('div');
      card.className = 'devtools-code-card';

      if (log.level === LOG_LEVELS.ERROR) {
        card.style.borderColor = 'var(--dev-error-border)';
        card.style.background = 'var(--dev-error-bg)';
      } else if (log.level === LOG_LEVELS.WARN) {
        card.style.borderColor = 'rgba(241, 161, 13, 0.4)';
        card.style.background = 'var(--dev-warn-bg)';
      }

      // Card Header
      const header = document.createElement('div');
      header.className = 'devtools-card-header';

      const filePath = document.createElement('div');
      filePath.className = 'devtools-file-path';

      let statusClass = 'success';
      if (log.level === LOG_LEVELS.ERROR) {
        statusClass = 'error';
      } else if (log.level === LOG_LEVELS.WARN) {
        statusClass = 'pending';
      }

      const levelPill = document.createElement('span');
      levelPill.className = `devtools-status-pill ${statusClass}`;
      levelPill.textContent = log.level.toUpperCase();

      const timeSpan = document.createElement('span');
      timeSpan.style.color = 'var(--dev-text-muted)';
      timeSpan.textContent = formatTimestamp(log.timestamp);

      filePath.appendChild(levelPill);
      filePath.appendChild(timeSpan);
      header.appendChild(filePath);

      // Log Payload Arguments
      const content = document.createElement('div');
      content.className = 'devtools-log-content';

      log.args.forEach((arg) => {
        const item = renderJsonTree(arg);
        content.appendChild(item);
      });

      card.appendChild(header);
      card.appendChild(content);
      this.listScrollContainer!.appendChild(card);
    });
  }
}
