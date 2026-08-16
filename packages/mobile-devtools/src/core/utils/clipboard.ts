/**
 * Safe clipboard copy utility supporting both Secure Contexts (navigator.clipboard)
 * and non-secure HTTP contexts (e.g. local IP network dev servers like http://192.168.x.x:3000).
 */
import { isServer } from './env';

export async function copyToClipboard(text: string): Promise<boolean> {
  if (isServer) return false;

  // 1. Try Modern Clipboard API (Requires HTTPS or localhost)
  if (navigator?.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback if permission is denied or non-secure context throws error
    }
  }

  // 2. Legacy fallback using invisible textarea + document.execCommand('copy')
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}
