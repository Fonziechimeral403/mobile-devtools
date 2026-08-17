import { copyToClipboard, DevToolsStore, isBrowser } from '../../../core';
import { setupScrollLockGuard } from '../../utils/scroll-lock';

export class SystemTabView {
  private container: HTMLElement;

  constructor(_store?: DevToolsStore) {
    this.container = document.createElement('div');
    this.container.className = 'devtools-tab-content';
  }

  public render(): HTMLElement {
    this.container.innerHTML = '';

    const listScroll = document.createElement('div');
    listScroll.className = 'devtools-list-scroll';
    listScroll.style.padding = '14px';
    setupScrollLockGuard(listScroll);

    const isWin = isBrowser;
    const ua = isWin ? navigator.userAgent : 'Server-side';
    const screenWidth = isWin ? window.screen.width : 0;
    const screenHeight = isWin ? window.screen.height : 0;
    const innerWidth = isWin ? window.innerWidth : 0;
    const innerHeight = isWin ? window.innerHeight : 0;
    const dpr = isWin ? window.devicePixelRatio || 1 : 1;
    const touchSupport = isWin ? 'ontouchstart' in window || navigator.maxTouchPoints > 0 : false;
    const lang = isWin ? navigator.language : 'en-US';
    const memory = isWin && (performance as any).memory ? `${Math.round((performance as any).memory.usedJSHeapSize / 1048576)} MB` : 'N/A';

    // Toolbar / Copy Header
    const topBar = document.createElement('div');
    topBar.style.display = 'flex';
    topBar.style.justifyContent = 'space-between';
    topBar.style.alignItems = 'center';
    topBar.style.marginBottom = '12px';

    const h3 = document.createElement('h3');
    h3.style.fontSize = '13px';
    h3.style.fontWeight = '700';
    h3.style.color = 'var(--dev-text-bright)';
    h3.textContent = 'System & Environment Info';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'devtools-btn';
    copyBtn.textContent = 'Copy Info';
    copyBtn.addEventListener('click', async () => {
      const info = `User Agent: ${ua}\nScreen: ${screenWidth}x${screenHeight}\nViewport: ${innerWidth}x${innerHeight}\nDPR: ${dpr}\nTouch Support: ${touchSupport}\nLanguage: ${lang}\nMemory: ${memory}`;
      const ok = await copyToClipboard(info);
      copyBtn.textContent = ok ? '✓ Copied' : 'Failed';
      setTimeout(() => {
        copyBtn.textContent = 'Copy Info';
      }, 2000);
    });

    topBar.appendChild(h3);
    topBar.appendChild(copyBtn);

    // UserAgent Box
    const uaBox = document.createElement('div');
    uaBox.className = 'devtools-user-agent-box';
    uaBox.style.marginBottom = '16px';
    uaBox.innerHTML = `<strong style="color:var(--dev-text-muted)">User Agent:</strong><br/>${ua}`;

    // Specs Table
    const table = document.createElement('table');
    table.className = 'devtools-table';
    table.innerHTML = `
      <tbody>
        <tr>
          <td style="color:var(--dev-text-muted);font-weight:600;width:40%">Viewport Size</td>
          <td style="color:var(--dev-text-bright)">${innerWidth} × ${innerHeight} px</td>
        </tr>
        <tr>
          <td style="color:var(--dev-text-muted);font-weight:600">Screen Resolution</td>
          <td style="color:var(--dev-text-bright)">${screenWidth} × ${screenHeight} px</td>
        </tr>
        <tr>
          <td style="color:var(--dev-text-muted);font-weight:600">Device Pixel Ratio</td>
          <td style="color:var(--dev-text-bright)">${dpr}x</td>
        </tr>
        <tr>
          <td style="color:var(--dev-text-muted);font-weight:600">Touch Support</td>
          <td style="color:var(--dev-text-bright)">${touchSupport ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <td style="color:var(--dev-text-muted);font-weight:600">Language</td>
          <td style="color:var(--dev-text-bright)">${lang}</td>
        </tr>
        <tr>
          <td style="color:var(--dev-text-muted);font-weight:600">Heap Memory</td>
          <td style="color:var(--dev-text-bright)">${memory}</td>
        </tr>
      </tbody>
    `;

    listScroll.appendChild(topBar);
    listScroll.appendChild(uaBox);
    listScroll.appendChild(table);

    this.container.appendChild(listScroll);
    return this.container;
  }
}
