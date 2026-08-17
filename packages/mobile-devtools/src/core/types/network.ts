import {
  NetworkRequestType,
  NetworkStatus,
  NetworkThrottlingProfile,
} from '../constants';

export type { NetworkRequestType, NetworkStatus, NetworkThrottlingProfile };

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
