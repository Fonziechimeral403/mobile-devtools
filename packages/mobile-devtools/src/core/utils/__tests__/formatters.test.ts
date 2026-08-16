import { describe, it, expect } from 'vitest';
import {
  formatDuration,
  formatTimestamp,
  generateCurlCommand,
  generateFullRequestSummary,
} from '../formatters';
import { NetworkRequestEntry } from '../../types/network';

describe('formatters utils', () => {
  it('should format durations properly', () => {
    expect(formatDuration(50)).toBe('50ms');
    expect(formatDuration(1500)).toBe('1.50s');
    expect(formatDuration(undefined)).toBe('pending');
  });

  it('should format timestamps properly', () => {
    const time = new Date('2026-01-01T12:30:45.000Z').getTime();
    const formatted = formatTimestamp(time);
    expect(formatted).toMatch(/\d{2}:\d{2}:\d{2}/);
  });

  it('should generate valid cURL command from request entry', () => {
    const req: NetworkRequestEntry = {
      id: 'test_req',
      url: 'https://api.example.com/v1/posts',
      method: 'POST',
      status: 201,
      startTime: Date.now(),
      requestHeaders: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token123',
      },
      requestBody: { title: 'Hello World' },
    };

    const curl = generateCurlCommand(req);
    expect(curl).toContain('curl -X POST "https://api.example.com/v1/posts"');
    expect(curl).toContain('-H "Content-Type: application/json"');
    expect(curl).toContain('-H "Authorization: Bearer token123"');
    expect(curl).toContain('--data "{\\"title\\":\\"Hello World\\"}"');
  });

  it('should generate full request summary text', () => {
    const req: NetworkRequestEntry = {
      id: 'test_req_2',
      url: 'https://api.example.com/status',
      method: 'GET',
      status: 200,
      startTime: Date.now(),
      duration: 120,
      responseBody: { status: 'ok' },
    };

    const summary = generateFullRequestSummary(req);
    expect(summary).toContain('Method: GET');
    expect(summary).toContain('URL   : https://api.example.com/status');
    expect(summary).toContain('Status: 200');
    expect(summary).toContain('Time  : 120ms');
    expect(summary).toContain('"status": "ok"');
  });
});
