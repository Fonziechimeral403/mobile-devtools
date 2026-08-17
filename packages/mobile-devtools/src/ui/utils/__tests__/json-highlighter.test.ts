import { describe, expect, it } from 'vitest';
import { highlightJsonSyntax } from '../json-highlighter';

describe('json-highlighter', () => {
  it('should return empty string for null and undefined', () => {
    expect(highlightJsonSyntax(null)).toBe('');
    expect(highlightJsonSyntax(undefined)).toBe('');
  });

  it('should escape HTML tags and special characters in plain string', () => {
    const raw = '<script>alert("xss")</script>';
    const result = highlightJsonSyntax(raw);
    expect(result).toContain('&lt;script&gt;');
    expect(result).not.toContain('<script>');
  });

  it('should highlight JSON object properties with correct style tags', () => {
    const obj = {
      name: 'DevTools',
      age: 10,
      active: true,
      data: null,
    };
    const html = highlightJsonSyntax(obj);

    expect(html).toContain('style="color: var(--json-key)"');
    expect(html).toContain('style="color: var(--json-string)"');
    expect(html).toContain('style="color: var(--json-number)"');
    expect(html).toContain('style="color: var(--json-boolean)"');
    expect(html).toContain('style="color: var(--json-null)"');
    expect(html).toContain('DevTools');
  });

  it('should parse valid JSON string input and highlight it', () => {
    const jsonStr = '{"status": 200, "ok": true}';
    const html = highlightJsonSyntax(jsonStr);

    expect(html).toContain('style="color: var(--json-key)"');
    expect(html).toContain('style="color: var(--json-number)"');
    expect(html).toContain('200');
  });
});
