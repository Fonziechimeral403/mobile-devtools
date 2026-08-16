'use client';

import React from 'react';

export const ApiTable: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-dev-text-bright tracking-tight">
          API Reference & Configuration Props
        </h2>
        <p className="text-sm text-dev-text-muted">
          Complete specification of supported configuration options for{' '}
          <code className="text-dev-text-bright font-mono bg-dev-bg-300 border border-dev-border px-1.5 py-0.5 rounded">
            &lt;MobileDevTools /&gt;
          </code>
          .
        </p>
      </div>

      <div className="w-full bg-dev-bg-100 border border-dev-border rounded-2xl overflow-x-auto">
        <table className="w-full min-w-[640px] text-left border-collapse text-xs table-fixed">
          <thead>
            <tr className="bg-dev-bg-300 text-dev-text-muted font-bold uppercase tracking-wider text-xs border-b border-dev-border">
              <th className="p-2.5 sm:p-4 w-[25%] sm:w-[18%]">Prop</th>
              <th className="p-2.5 sm:p-4 w-[25%] sm:w-[22%]">Type</th>
              <th className="p-2.5 sm:p-4 w-[20%] sm:w-[16%]">Default</th>
              <th className="p-2.5 sm:p-4 w-[30%] sm:w-[44%]">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dev-border-subtle">
            <tr className="hover:bg-dev-bg-300/40 transition-colors">
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-dev-bg-300 border border-dev-border text-dev-text-bright font-mono font-bold text-[11px] sm:text-xs max-w-full break-all">
                  enabled
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-status-warn-text font-mono text-[11px] sm:text-xs max-w-full break-all">
                  boolean
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-status-success-bg border border-status-success-border text-status-success-text font-mono text-[11px] sm:text-xs font-bold">
                  true
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top text-dev-text-main leading-relaxed break-words">
                Enable or disable the DevTools overlay. Automatically set to{' '}
                <code className="text-dev-text-bright">false</code> in production builds.
              </td>
            </tr>

            <tr className="hover:bg-dev-bg-300/40 transition-colors">
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-dev-bg-300 border border-dev-border text-dev-text-bright font-mono font-bold text-[11px] sm:text-xs max-w-full break-all">
                  forceEnable
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-status-warn-text font-mono text-[11px] sm:text-xs max-w-full break-all">
                  boolean
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-dev-text-muted font-mono text-[11px] sm:text-xs">
                  false
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top text-dev-text-main leading-relaxed break-words">
                Force enable DevTools overlay in production builds for QA testing &amp; staging
                previews.
              </td>
            </tr>

            <tr className="hover:bg-dev-bg-300/40 transition-colors">
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-dev-bg-300 border border-dev-border text-dev-text-bright font-mono font-bold text-[11px] sm:text-xs max-w-full break-all">
                  defaultOpen
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-status-warn-text font-mono text-[11px] sm:text-xs max-w-full break-all">
                  boolean
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-dev-text-muted font-mono text-[11px] sm:text-xs">
                  false
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top text-dev-text-main leading-relaxed break-words">
                Automatically open the DevTools drawer on initial page mount.
              </td>
            </tr>

            <tr className="hover:bg-dev-bg-300/40 transition-colors">
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-dev-bg-300 border border-dev-border text-dev-text-bright font-mono font-bold text-[11px] sm:text-xs max-w-full break-all">
                  title
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-status-warn-text font-mono text-[11px] sm:text-xs max-w-full break-all">
                  string
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-status-info-bg border border-status-info-border text-status-info-text font-mono text-[11px] sm:text-xs font-bold break-all">
                  &apos;DevTools&apos;
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top text-dev-text-main leading-relaxed break-words">
                Custom brand title text displayed inside both the floating badge and header drawer
                badge.
              </td>
            </tr>

            <tr className="hover:bg-dev-bg-300/40 transition-colors">
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-dev-bg-300 border border-dev-border text-dev-text-bright font-mono font-bold text-[11px] sm:text-xs max-w-full break-all">
                  icon
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-status-warn-text font-mono text-[11px] sm:text-xs max-w-full break-all">
                  ReactNode | string
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-dev-text-muted font-mono text-[11px] sm:text-xs">
                  undefined
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top text-dev-text-main leading-relaxed break-words">
                Custom brand logo SVG element or emoji to display in the floating badge &amp; drawer
                header.
              </td>
            </tr>

            <tr className="hover:bg-dev-bg-300/40 transition-colors">
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-dev-bg-300 border border-dev-border text-dev-text-bright font-mono font-bold text-[11px] sm:text-xs max-w-full break-all">
                  position
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-status-warn-text font-mono text-[11px] sm:text-xs max-w-full break-all">
                  BadgePositionPreset | BadgePosition
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-status-info-bg border border-status-info-border text-status-info-text font-mono text-[11px] sm:text-xs font-bold break-all">
                  &apos;bottom-right&apos;
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top text-dev-text-main leading-relaxed break-words">
                Screen placement preset (
                <code className="text-dev-text-bright">&apos;top-left&apos;</code>,{' '}
                <code className="text-dev-text-bright">&apos;top-right&apos;</code>,{' '}
                <code className="text-dev-text-bright">&apos;bottom-left&apos;</code>,{' '}
                <code className="text-dev-text-bright">&apos;bottom-right&apos;</code>,{' '}
                <code className="text-dev-text-bright">&apos;top&apos;</code>,{' '}
                <code className="text-dev-text-bright">&apos;bottom&apos;</code>,{' '}
                <code className="text-dev-text-bright">&apos;left&apos;</code>,{' '}
                <code className="text-dev-text-bright">&apos;right&apos;</code>) or custom{' '}
                <code className="text-dev-text-bright">{`{ x, y }`}</code> object.
              </td>
            </tr>

            <tr className="hover:bg-dev-bg-300/40 transition-colors">
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-dev-bg-300 border border-dev-border text-dev-text-bright font-mono font-bold text-[11px] sm:text-xs max-w-full break-all">
                  autoSnapBadge
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-status-warn-text font-mono text-[11px] sm:text-xs max-w-full break-all">
                  boolean
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-dev-text-muted font-mono text-[11px] sm:text-xs">
                  false
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top text-dev-text-main leading-relaxed break-words">
                Automatically snaps floating badge to the nearest screen edge on drag release.
              </td>
            </tr>

            <tr className="hover:bg-dev-bg-300/40 transition-colors">
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-dev-bg-300 border border-dev-border text-dev-text-bright font-mono font-bold text-[11px] sm:text-xs max-w-full break-all">
                  styles
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-status-warn-text font-mono text-[11px] sm:text-xs max-w-full break-all">
                  DevToolsStyles
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-dev-text-muted font-mono text-[11px] sm:text-xs">
                  undefined
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top text-dev-text-main leading-relaxed break-words">
                Custom style overrides for UI elements (
                <code className="text-dev-text-bright">badge</code>,{' '}
                <code className="text-dev-text-bright">drawer</code>,{' '}
                <code className="text-dev-text-bright">overlay</code>).
                <div className="mt-2 text-xs font-semibold text-dev-text-bright">Example:</div>
                <pre className="mt-1 p-2 sm:p-2.5 rounded-md bg-dev-bg-300 border border-dev-border font-mono text-[10px] sm:text-[11px] text-dev-text-bright whitespace-pre-wrap break-all">
                  {`styles: {
  badge: { opacity: '0.9' },
  drawer: { maxHeight: '90vh' }
}`}
                </pre>
              </td>
            </tr>

            <tr className="hover:bg-dev-bg-300/40 transition-colors">
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-dev-bg-300 border border-dev-border text-dev-text-bright font-mono font-bold text-[11px] sm:text-xs max-w-full break-all">
                  initialTab
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-status-warn-text font-mono text-[11px] sm:text-xs max-w-full break-all">
                  DevToolsTabId
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-status-info-bg border border-status-info-border text-status-info-text font-mono text-[11px] sm:text-xs font-bold break-all">
                  &apos;console&apos;
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top text-dev-text-main leading-relaxed break-words">
                Active tab on open (
                <code className="text-dev-text-bright">&apos;console&apos;</code>,{' '}
                <code className="text-dev-text-bright">&apos;elements&apos;</code>,{' '}
                <code className="text-dev-text-bright">&apos;network&apos;</code>,{' '}
                <code className="text-dev-text-bright">&apos;storage&apos;</code>,{' '}
                <code className="text-dev-text-bright">&apos;system&apos;</code>, or custom tab id).
              </td>
            </tr>

            <tr className="hover:bg-dev-bg-300/40 transition-colors">
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-dev-bg-300 border border-dev-border text-dev-text-bright font-mono font-bold text-[11px] sm:text-xs max-w-full break-all">
                  enabledTabs
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-status-warn-text font-mono text-[11px] sm:text-xs max-w-full break-all">
                  DevToolsTabId[]
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-dev-text-muted font-mono text-[11px] sm:text-xs">
                  All 5 tabs
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top text-dev-text-main leading-relaxed break-words">
                List of built-in tabs to render. Allows hiding specific tabs (e.g. only enable
                console &amp; network).
              </td>
            </tr>

            <tr className="hover:bg-dev-bg-300/40 transition-colors">
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-dev-bg-300 border border-dev-border text-dev-text-bright font-mono font-bold text-[11px] sm:text-xs max-w-full break-all">
                  theme
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-status-warn-text font-mono text-[11px] sm:text-xs max-w-full break-all">
                  DevToolsTheme
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-dev-text-muted font-mono text-[11px] sm:text-xs">
                  {`{ mode: 'dark' }`}
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top text-dev-text-main leading-relaxed break-words">
                Theme configuration (
                <code className="text-dev-text-bright">
                  mode: &apos;dark&apos; | &apos;light&apos; | &apos;auto&apos;
                </code>
                ) and custom CSS variable overrides (
                <code className="text-dev-text-bright">backgroundColor</code>,{' '}
                <code className="text-dev-text-bright">accentColor</code>,{' '}
                <code className="text-dev-text-bright">errorColor</code>).
              </td>
            </tr>

            <tr className="hover:bg-dev-bg-300/40 transition-colors">
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-dev-bg-300 border border-dev-border text-dev-text-bright font-mono font-bold text-[11px] sm:text-xs max-w-full break-all">
                  interceptors
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-status-warn-text font-mono text-[11px] sm:text-xs max-w-full break-all">
                  InterceptorConfig
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-dev-text-muted font-mono text-[11px] sm:text-xs">
                  Object
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top text-dev-text-main leading-relaxed break-words">
                <div>Configure console log and network request interception:</div>
                <pre className="mt-2 p-2 sm:p-2.5 rounded-md bg-dev-bg-300 border border-dev-border font-mono text-[10px] sm:text-[11px] text-dev-text-bright whitespace-pre-wrap break-all">
                  {`{
  maxLogLimit?: number;
  maxNetworkLimit?: number;
  ignoreNetworkUrls?: (string | RegExp)[];
  enableConsoleInterceptor?: boolean;
  enableFetchInterceptor?: boolean;
  enableXhrInterceptor?: boolean;
}`}
                </pre>
              </td>
            </tr>

            <tr className="hover:bg-dev-bg-300/40 transition-colors">
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-dev-bg-300 border border-dev-border text-dev-text-bright font-mono font-bold text-[11px] sm:text-xs max-w-full break-all">
                  privacy
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-status-warn-text font-mono text-[11px] sm:text-xs max-w-full break-all">
                  PrivacyConfig
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-dev-text-muted font-mono text-[11px] sm:text-xs">
                  undefined
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top text-dev-text-main leading-relaxed break-words">
                <div>
                  Recursively masks matching sensitive keys (e.g.{' '}
                  <code className="text-dev-text-bright">password</code>,{' '}
                  <code className="text-dev-text-bright">token</code>,{' '}
                  <code className="text-dev-text-bright">authorization</code>) across HTTP request
                  &amp; response headers, request/response JSON payload bodies, and Storage tab data
                  into <code className="text-dev-text-bright">&apos;****** (Masked)&apos;</code>.
                </div>
                <pre className="mt-2 p-2 sm:p-2.5 rounded-md bg-dev-bg-300 border border-dev-border font-mono text-[10px] sm:text-[11px] text-dev-text-bright whitespace-pre-wrap break-all">
                  {`{
  mask?: string[];
}`}
                </pre>
              </td>
            </tr>

            <tr className="hover:bg-dev-bg-300/40 transition-colors">
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-dev-bg-300 border border-dev-border text-dev-text-bright font-mono font-bold text-[11px] sm:text-xs max-w-full break-all">
                  customTabs
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-status-warn-text font-mono text-[11px] sm:text-xs max-w-full break-all">
                  CustomTabDefinition[]
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top break-words">
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-dev-bg-300 border border-dev-border text-dev-text-muted font-mono text-[11px] sm:text-xs">
                  []
                </span>
              </td>
              <td className="p-2.5 sm:p-4 align-top text-dev-text-main leading-relaxed break-words">
                Pluggable consumer tabs with custom DOM rendering callback (
                <code className="text-dev-text-bright">render(container)</code>).
                <div className="mt-2 text-xs font-semibold text-dev-text-bright">Example:</div>
                <pre className="mt-1 p-2 sm:p-2.5 rounded-md bg-dev-bg-300 border border-dev-border font-mono text-[10px] sm:text-[11px] text-dev-text-bright whitespace-pre-wrap break-all">
                  {`customTabs: [
  {
    id: 'analytics',
    title: 'Analytics',
    render: (container) => {
      container.innerHTML = '<div style="padding:16px">📊 Custom Analytics Tab</div>';
    }
  }
]`}
                </pre>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
