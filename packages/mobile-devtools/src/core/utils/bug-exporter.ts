import { DevToolsStore } from '../stores/devtools-store';
import { copyToClipboard } from './clipboard';
import { isBrowser } from './env';

export interface BugReportResult {
  shared: boolean;
  downloaded: boolean;
  copied: boolean;
}

export function generateBugReportText(store: DevToolsStore): string {
  const config = store.getConfig();
  const logs = store.getLogs();
  const network = store.getNetworkRequests();
  const now = new Date();
  const formattedDate = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;

  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A';
  const screenRes = isBrowser ? `${window.screen.width}x${window.screen.height}` : 'N/A';
  const viewport = isBrowser ? `${window.innerWidth}x${window.innerHeight}` : 'N/A';
  const dpr = isBrowser ? window.devicePixelRatio : 1;
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  const pageUrl = isBrowser ? window.location.href : 'N/A';

  const errorsCount = logs.filter((l) => l.level === 'error').length;
  const warnCount = logs.filter((l) => l.level === 'warn').length;
  const failedReqCount = network.filter((n) => n.status >= 400 || n.errorState === 'error').length;

  let text = `================================================
MOBILE DEVTOOLS BUG REPORT
================================================
App Title: ${config.title || 'DevTools App'}
Timestamp: ${formattedDate}
Page URL : ${pageUrl}

------------------------------------------------
DEVICE & SYSTEM SPECS
------------------------------------------------
User Agent: ${userAgent}
Screen Res: ${screenRes} (DPR: ${dpr})
Viewport  : ${viewport}
Online    : ${isOnline ? 'Yes' : 'No'}

------------------------------------------------
CONSOLE SUMMARY (${logs.length} Total | ${errorsCount} Errors | ${warnCount} Warnings)
------------------------------------------------
`;

  if (logs.length === 0) {
    text += `(No console logs captured)\n`;
  } else {
    logs.forEach((log, index) => {
      const timeStr = new Date(log.timestamp).toTimeString().split(' ')[0];
      const argsStr = log.args
        .map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a)))
        .join(' ');
      text += `[${index + 1}] [${timeStr}] [${log.level.toUpperCase()}] ${argsStr}\n`;
      if (log.stack) {
        text += `    Stack: ${log.stack.split('\n')[0]}\n`;
      }
    });
  }

  text += `
------------------------------------------------
NETWORK SUMMARY (${network.length} Total | ${failedReqCount} Failed)
------------------------------------------------
`;

  if (network.length === 0) {
    text += `(No network requests captured)\n`;
  } else {
    network.slice(0, 30).forEach((req, index) => {
      const timeStr = new Date(req.startTime).toTimeString().split(' ')[0];
      const durStr = req.duration ? `${req.duration}ms` : 'pending';
      const bodyStr = req.responseBody
        ? typeof req.responseBody === 'object'
          ? JSON.stringify(req.responseBody).substring(0, 200)
          : String(req.responseBody).substring(0, 200)
        : '';
      text += `[${index + 1}] [${timeStr}] ${req.method} ${req.url} -> Status: ${req.status} (${durStr})\n`;
      if (bodyStr) {
        text += `    Response: ${bodyStr}\n`;
      }
    });
  }

  return text;
}

export async function exportBugReport(store: DevToolsStore): Promise<BugReportResult> {
  const reportText = generateBugReportText(store);
  const fileName = `bug-report-${Date.now()}.txt`;

  // 1. Try Web Share API (navigator.share)
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      const shareData: ShareData = {
        title: `Bug Report - ${store.getConfig().title || 'Mobile DevTools'}`,
        text: reportText,
      };

      await navigator.share(shareData);
      return { shared: true, downloaded: false, copied: false };
    } catch (err: any) {
      // If user cancelled the share dialog (AbortError), stop here cleanly!
      if (
        err?.name === 'AbortError' ||
        err?.message?.includes('canceled') ||
        err?.message?.includes('cancelled')
      ) {
        return { shared: false, downloaded: false, copied: false };
      }
      // Non-cancel error: fall through to download single file fallback
    }
  }

  // 2. Fallback for Desktop / browsers without Web Share: Download single file
  let downloaded = false;
  if (isBrowser) {
    try {
      const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      downloaded = true;
    } catch {
      downloaded = false;
    }
  }

  // 3. Copy text to clipboard as convenience
  const copied = await copyToClipboard(reportText);

  return { shared: false, downloaded, copied };
}
