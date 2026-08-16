export type NetworkRequestType = 'fetch' | 'xhr';
export type NetworkStatus = 'pending' | 'success' | 'error';
export type NetworkThrottlingProfile = 'online' | 'fast-3g' | 'slow-3g' | 'offline';

export interface NetworkRequestEntry {
  id: string;
  url: string;
  method: string;
  status: number;
  statusText?: string;
  type?: NetworkRequestType;
  startTime: number;
  endTime?: number;
  duration?: number;
  requestHeaders?: Record<string, string>;
  requestBody?: any;
  responseHeaders?: Record<string, string>;
  responseBody?: any;
  responseType?: string;
  errorState?: NetworkStatus;
}
