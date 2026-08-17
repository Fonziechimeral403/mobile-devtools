import { NetworkRequestEntry } from '../types/network';
import { isServer } from './env';

/**
 * Formats epoch millisecond timestamp into HH:MM:SS.mmm format.
 * @param time Epoch timestamp in milliseconds.
 * @returns Formatted time string, e.g. "14:32:05.120".
 */
export function formatTimestamp(time: number): string {
  const date = new Date(time);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const ms = date.getMilliseconds().toString().padStart(3, '0');
  return `${hours}:${minutes}:${seconds}.${ms}`;
}

/**
 * Formats duration milliseconds into human-readable ms or seconds.
 * @param durationMs Duration in milliseconds.
 * @returns Formatted duration string, e.g. "45ms", "1.25s", or "pending".
 */
export function formatDuration(durationMs?: number): string {
  if (durationMs === undefined) return 'pending';
  if (durationMs < 1000) return `${Math.round(durationMs)}ms`;
  return `${(durationMs / 1000).toFixed(2)}s`;
}

/**
 * Formats numeric count badges with a maximum cap.
 * @param count Numeric count value.
 * @param max Maximum display threshold (default: 99).
 * @returns Formatted string count, e.g. "5", "99+", or "0".
 */
export function formatCount(count: number, max = 99): string {
  if (typeof count !== 'number' || count <= 0) return '0';
  return count > max ? `${max}+` : String(count);
}

/**
 * Generates an executable cURL CLI command string from a captured network request entry.
 * @param req Network request entry.
 * @returns Formatted multi-line cURL command string.
 */
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

/**
 * Internal helper to format request/response body payloads into formatted JSON or string summaries.
 * @param body Raw body payload (object, string, or null).
 * @returns Formatted summary string or 'None'.
 */
function formatBodySummary(body: unknown): string {
  if (body === undefined || body === null || body === '') {
    return 'None';
  }
  if (typeof body === 'object') {
    return JSON.stringify(body, null, 2);
  }
  return String(body);
}

/**
 * Generates a complete text summary report of a captured HTTP request and response.
 * @param req Network request entry.
 * @returns Formatted plain text request/response summary.
 */
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

/**
 * Parses current document.cookie string into a key-value object map.
 * @returns Map of cookie key names to value strings.
 */
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
