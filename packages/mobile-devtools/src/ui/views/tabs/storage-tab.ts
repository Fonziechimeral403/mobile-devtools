import { DevToolsStore, isBrowser } from '../../../core';
import { CHECK_ICON, CLOSE_ICON, PLUS_ICON, TRASH_ICON } from '../../icons';

export class StorageTabView {
  private container: HTMLElement;
  private listScrollContainer: HTMLElement | null = null;
  private clearBtn: HTMLButtonElement | null = null;
  private storageType: 'localStorage' | 'sessionStorage' | 'cookie' = 'localStorage';
  private searchValue = '';
  private isAddingNew = false;
  private editingKey: string | null = null;

  constructor(_store?: DevToolsStore) {
    this.container = document.createElement('div');
    this.container.className = 'devtools-tab-content';
  }

  public render(): HTMLElement {
    this.container.innerHTML = '';

    // Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'devtools-toolbar';

    const storageSelect = document.createElement('select');
    storageSelect.className = 'devtools-select';
    storageSelect.style.width = '130px';
    storageSelect.style.minWidth = '130px';
    storageSelect.innerHTML = `
      <option value="localStorage">localStorage</option>
      <option value="sessionStorage">sessionStorage</option>
      <option value="cookie">cookie</option>
    `;
    storageSelect.value = this.storageType;
    storageSelect.addEventListener('change', (e) => {
      this.storageType = (e.target as HTMLSelectElement).value as any;
      this.isAddingNew = false;
      this.editingKey = null;
      this.updateList();
    });

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'devtools-search-input';
    searchInput.placeholder = 'Search key or value...';
    searchInput.value = this.searchValue;
    searchInput.addEventListener('input', (e) => {
      this.searchValue = (e.target as HTMLInputElement).value;
      this.updateList();
    });

    const addBtn = document.createElement('button');
    addBtn.className = 'devtools-btn devtools-btn-icon-only';
    addBtn.title = 'Add new key-value pair';
    addBtn.innerHTML = PLUS_ICON;
    addBtn.addEventListener('click', () => {
      this.isAddingNew = !this.isAddingNew;
      this.updateList();
    });

    this.clearBtn = document.createElement('button');
    this.clearBtn.className = 'devtools-btn devtools-btn-danger devtools-btn-icon-only';
    this.clearBtn.title = 'Clear Storage';
    this.clearBtn.innerHTML = TRASH_ICON;
    this.clearBtn.addEventListener('click', () => {
      if (
        window.confirm(
          `Are you sure you want to clear all entries in ${this.storageType}? This action cannot be undone.`
        )
      ) {
        this.clearCurrentStorage();
        this.updateList();
      }
    });

    toolbar.appendChild(storageSelect);
    toolbar.appendChild(searchInput);
    toolbar.appendChild(addBtn);
    toolbar.appendChild(this.clearBtn);

    // List Container
    this.listScrollContainer = document.createElement('div');
    this.listScrollContainer.className = 'devtools-list-scroll';

    this.container.appendChild(toolbar);
    this.container.appendChild(this.listScrollContainer);

    this.updateList();
    return this.container;
  }

  private getItems(): { key: string; value: string }[] {
    if (!isBrowser) return [];
    const items: { key: string; value: string }[] = [];

    try {
      if (this.storageType === 'localStorage') {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
            items.push({ key, value: localStorage.getItem(key) || '' });
          }
        }
      } else if (this.storageType === 'sessionStorage') {
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key) {
            items.push({ key, value: sessionStorage.getItem(key) || '' });
          }
        }
      } else if (this.storageType === 'cookie') {
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        cookies.forEach((c) => {
          const [key, ...val] = c.split('=');
          if (key) {
            items.push({ key: decodeURIComponent(key), value: decodeURIComponent(val.join('=')) });
          }
        });
      }
    } catch {
      // Ignore security errors
    }

    return items;
  }

  private setItem(key: string, value: string) {
    if (!isBrowser || !key.trim()) return;
    try {
      if (this.storageType === 'localStorage') {
        localStorage.setItem(key.trim(), value);
      } else if (this.storageType === 'sessionStorage') {
        sessionStorage.setItem(key.trim(), value);
      } else if (this.storageType === 'cookie') {
        document.cookie = `${encodeURIComponent(key.trim())}=${encodeURIComponent(value)}; path=/;`;
      }
    } catch {
      // Ignore
    }
    this.updateList();
  }

  private clearCurrentStorage() {
    if (!isBrowser) return;
    try {
      if (this.storageType === 'localStorage') {
        localStorage.clear();
      } else if (this.storageType === 'sessionStorage') {
        sessionStorage.clear();
      } else if (this.storageType === 'cookie') {
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        cookies.forEach((c) => {
          const key = c.split('=')[0];
          if (key) {
            document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          }
        });
      }
    } catch {
      // Ignore
    }
  }

  private deleteItem(key: string) {
    if (!isBrowser) return;
    try {
      if (this.storageType === 'localStorage') {
        localStorage.removeItem(key);
      } else if (this.storageType === 'sessionStorage') {
        sessionStorage.removeItem(key);
      } else if (this.storageType === 'cookie') {
        document.cookie = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    } catch {
      // Ignore
    }
    this.updateList();
  }

  public updateList() {
    if (!this.listScrollContainer) return;
    this.listScrollContainer.innerHTML = '';

    // Add New Item Panel
    if (this.isAddingNew) {
      const addPanel = document.createElement('div');
      addPanel.style.display = 'flex';
      addPanel.style.gap = '6px';
      addPanel.style.marginBottom = '12px';

      const keyInput = document.createElement('input');
      keyInput.type = 'text';
      keyInput.placeholder = 'Key...';
      keyInput.className = 'devtools-search-input';
      keyInput.style.width = '30%';
      keyInput.style.flex = 'none';

      const valInput = document.createElement('input');
      valInput.type = 'text';
      valInput.placeholder = 'Value...';
      valInput.className = 'devtools-search-input';
      valInput.style.flex = '1';

      const saveBtn = document.createElement('button');
      saveBtn.className = 'devtools-btn devtools-btn-icon-only';
      saveBtn.title = 'Save';
      saveBtn.innerHTML = CHECK_ICON;
      saveBtn.addEventListener('click', () => {
        if (keyInput.value.trim()) {
          this.setItem(keyInput.value, valInput.value);
          this.isAddingNew = false;
          this.updateList();
        }
      });

      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'devtools-btn devtools-btn-danger devtools-btn-icon-only';
      cancelBtn.title = 'Cancel';
      cancelBtn.innerHTML = CLOSE_ICON;
      cancelBtn.addEventListener('click', () => {
        this.isAddingNew = false;
        this.updateList();
      });

      addPanel.appendChild(keyInput);
      addPanel.appendChild(valInput);
      addPanel.appendChild(saveBtn);
      addPanel.appendChild(cancelBtn);
      this.listScrollContainer.appendChild(addPanel);
    }

    const items = this.getItems();
    if (this.clearBtn) {
      this.clearBtn.disabled = items.length === 0;
    }

    const filtered = items.filter(
      (item) =>
        !this.searchValue.trim() ||
        item.key.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        item.value.toLowerCase().includes(this.searchValue.toLowerCase())
    );

    if (filtered.length === 0 && !this.isAddingNew) {
      const empty = document.createElement('div');
      empty.style.textAlign = 'center';
      empty.style.padding = '32px';
      empty.style.color = 'var(--dev-text-muted)';
      empty.style.fontSize = '12px';
      empty.textContent = `No items found in ${this.storageType}.`;
      this.listScrollContainer.appendChild(empty);
      return;
    }

    const table = document.createElement('table');
    table.className = 'devtools-table';

    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th style="width:30%">Key</th>
        <th>Value (Click to edit)</th>
        <th style="width:40px;text-align:center">Action</th>
      </tr>
    `;

    const tbody = document.createElement('tbody');
    filtered.forEach((item) => {
      const tr = document.createElement('tr');

      const tdKey = document.createElement('td');
      tdKey.style.fontWeight = '600';
      tdKey.style.color = 'var(--dev-text-bright)';
      tdKey.textContent = item.key;

      const tdVal = document.createElement('td');
      tdVal.style.color = 'var(--dev-text-muted)';
      tdVal.style.wordBreak = 'break-all';
      tdVal.style.cursor = 'pointer';
      tdVal.title = 'Click to edit value';

      if (this.editingKey === item.key) {
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'devtools-search-input';
        editInput.style.width = '100%';
        editInput.value = item.value;
        editInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            this.setItem(item.key, editInput.value);
            this.editingKey = null;
            this.updateList();
          } else if (e.key === 'Escape') {
            this.editingKey = null;
            this.updateList();
          }
        });
        editInput.addEventListener('blur', () => {
          this.setItem(item.key, editInput.value);
          this.editingKey = null;
          this.updateList();
        });

        tdVal.appendChild(editInput);
        setTimeout(() => editInput.focus(), 0);
      } else {
        tdVal.textContent = item.value;
        tdVal.addEventListener('click', () => {
          this.editingKey = item.key;
          this.updateList();
        });
      }

      const tdAct = document.createElement('td');
      tdAct.style.textAlign = 'center';

      const delBtn = document.createElement('button');
      delBtn.className = 'devtools-btn devtools-btn-danger devtools-btn-icon-only';
      delBtn.title = 'Delete Item';
      delBtn.innerHTML = CLOSE_ICON;
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (
          window.confirm(`Are you sure you want to delete "${item.key}" from ${this.storageType}?`)
        ) {
          this.deleteItem(item.key);
        }
      });

      tdAct.appendChild(delBtn);
      tr.appendChild(tdKey);
      tr.appendChild(tdVal);
      tr.appendChild(tdAct);
      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    this.listScrollContainer.appendChild(table);
  }
}
