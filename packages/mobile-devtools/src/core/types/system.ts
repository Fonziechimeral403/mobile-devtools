export interface SystemDiagnostics {
  userAgent: string;
  browserName: string;
  browserVersion: string;
  osName: string;
  screenResolution: string;
  viewportSize: string;
  devicePixelRatio: number;
  orientation: string;
  online: boolean;
  connectionType?: string;
  effectiveType?: string;
  batteryLevel?: number;
  batteryCharging?: boolean;
  jsHeapSizeLimit?: string;
  usedJsHeapSize?: string;
}
