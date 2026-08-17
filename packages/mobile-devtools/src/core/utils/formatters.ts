import { NetworkRequestEntry } from '../types/network';
import { isServer } from './env';

export function formatTimestamp(time: number): string {
  const date = new Date(time);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const ms = date.getMilliseconds().toString().padStart(3, '0');
  return `${hours}:${minutes}:${seconds}.${ms}`;
}

export function formatDuration(durationMs?: number): string {
  if (durationMs === undefined) return 'pending';
  if (durationMs < 1000) return `${Math.round(durationMs)}ms`;
  return `${(durationMs / 1000).toFixed(2)}s`;
}

export function generateCurlCommand(req: NetworkRequestEntry): string {
  let curl = `curl -X ${req.method.toUpperCase()} "${req.url}"`;

  if (req.requestHeaders) {
    Object.entries(req.requestHeaders).forEach(([key, val]) => {
      curl += ` \\\n  -H "${key}: ${val}"`;
    });
  }

  if (req.requestBody) {
    let bodyStr =
      typeof req.requestBody === 'string' ? req.requestBody : JSON.stringify(req.requestBody);
    bodyStr = bodyStr.replace(/"/g, '\\"');
    curl += ` \\\n  --data "${bodyStr}"`;
  }

  return curl;
}

function formatBodySummary(body: unknown): string {
  if (body === undefined || body === null || body === '') {
    return 'None';
  }
  if (typeof body === 'object') {
    return JSON.stringify(body, null, 2);
  }
  return String(body);
}

export function generateFullRequestSummary(req: NetworkRequestEntry): string {
  const payloadStr = formatBodySummary(req.requestBody);
  const responseStr = formatBodySummary(req.responseBody);

  const reqHeadersStr =
    Object.entries(req.requestHeaders || {})
      .map(([k, v]) => `  ${k}: ${v}`)
      .join('\n') || '  None';

  const resHeadersStr =
    Object.entries(req.responseHeaders || {})
      .map(([k, v]) => `  ${k}: ${v}`)
      .join('\n') || '  None';

  return `================================================
HTTP REQUEST & RESPONSE CAPTURE
================================================
Method: ${req.method}
URL   : ${req.url}
Status: ${req.status} (${req.statusText})
Time  : ${formatDuration(req.duration)} (${formatTimestamp(req.startTime)})

------------------------------------------------
REQUEST HEADERS
------------------------------------------------
${reqHeadersStr}

------------------------------------------------
REQUEST BODY (PAYLOAD)
------------------------------------------------
${payloadStr}

------------------------------------------------
RESPONSE HEADERS
------------------------------------------------
${resHeadersStr}

------------------------------------------------
RESPONSE BODY
------------------------------------------------
${responseStr}
================================================
`;
}

export function parseCookies(): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (isServer || !document.cookie) return cookies;

  const items = document.cookie.split(';');
  for (const item of items) {
    const parts = item.split('=');
    const key = parts.shift()?.trim();
    if (key) {
      cookies[key] = parts.join('=').trim();
    }
  }
  return cookies;
}
