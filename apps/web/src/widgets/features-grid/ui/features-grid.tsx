'use client';

import React from 'react';
import {
  Shield,
  Zap,
  Terminal,
  Smartphone,
  Database,
  Sliders,
  Share2,
  WifiOff,
} from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-dev-text-bright tracking-tight">
          Built for Production Applications
        </h2>
        <p className="text-sm sm:text-base text-dev-text-muted max-w-xl mx-auto leading-relaxed">
          Zero CSS leaks, zero performance overhead, and 100% Shadow DOM style isolation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Bug Exporter (Web Share API) */}
        <div className="bg-dev-bg-100 border border-dev-border hover:border-sky-500/40 rounded-xl p-5 transition-all space-y-2.5">
          <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
            <Share2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-dev-text-bright tracking-tight">
            Export Bug Report
          </h3>
          <p className="text-xs text-dev-text-muted leading-relaxed">
            Instant 1-click bug export via Web Share API (
            <code className="text-sky-400">navigator.share</code>) to WhatsApp, Slack, or Email.
          </p>
        </div>

        {/* Card 2: Network Throttling & Offline */}
        <div className="bg-dev-bg-100 border border-dev-border hover:border-amber-500/40 rounded-xl p-5 transition-all space-y-2.5">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <WifiOff className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-dev-text-bright tracking-tight">
            Network Throttling
          </h3>
          <p className="text-xs text-dev-text-muted leading-relaxed">
            Simulate Slow 3G, Fast 3G, or Offline mode directly on mobile devices with synthetic
            latency.
          </p>
        </div>

        {/* Card 3: Shadow DOM */}
        <div className="bg-dev-bg-100 border border-dev-border hover:border-indigo-500/40 rounded-xl p-5 transition-all space-y-2.5">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-dev-text-bright tracking-tight">
            Shadow DOM Isolation
          </h3>
          <p className="text-xs text-dev-text-muted leading-relaxed">
            Zero CSS leakage or style contamination with host application styles.
          </p>
        </div>

        {/* Card 4: Network Interceptor */}
        <div className="bg-dev-bg-100 border border-dev-border hover:border-emerald-500/40 rounded-xl p-5 transition-all space-y-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-dev-text-bright tracking-tight">
            Network Interceptor
          </h3>
          <p className="text-xs text-dev-text-muted leading-relaxed">
            Intercepts native <code className="text-emerald-600 dark:text-emerald-400">fetch</code>{' '}
            & <code className="text-emerald-600 dark:text-emerald-400">XHR</code> calls with timing
            & payload inspection.
          </p>
        </div>

        {/* Card 5: Console Log Engine */}
        <div className="bg-dev-bg-100 border border-dev-border hover:border-rose-500/40 rounded-xl p-5 transition-all space-y-2.5">
          <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-dev-text-bright tracking-tight">
            Console Log Engine
          </h3>
          <p className="text-xs text-dev-text-muted leading-relaxed">
            Captures log, warn, error, and exceptions with intact stack traces.
          </p>
        </div>

        {/* Card 6: Mobile Touch Engine */}
        <div className="bg-dev-bg-100 border border-dev-border hover:border-purple-500/40 rounded-xl p-5 transition-all space-y-2.5">
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Smartphone className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-dev-text-bright tracking-tight">
            Mobile Touch & Drag
          </h3>
          <p className="text-xs text-dev-text-muted leading-relaxed">
            Pointer-captured badge drag, viewport snapping, and swipe-to-dismiss gesture.
          </p>
        </div>

        {/* Card 7: Storage & Cookie Inspector */}
        <div className="bg-dev-bg-100 border border-dev-border hover:border-cyan-500/40 rounded-xl p-5 transition-all space-y-2.5">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-dev-text-bright tracking-tight">
            Storage Inspector
          </h3>
          <p className="text-xs text-dev-text-muted leading-relaxed">
            Live inspection & management for LocalStorage, SessionStorage, and Cookies.
          </p>
        </div>

        {/* Card 8: Pluggable Custom Tabs */}
        <div className="bg-dev-bg-100 border border-dev-border hover:border-fuchsia-500/40 rounded-xl p-5 transition-all space-y-2.5">
          <div className="w-9 h-9 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400">
            <Sliders className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-dev-text-bright tracking-tight">
            Pluggable Custom Tabs
          </h3>
          <p className="text-xs text-dev-text-muted leading-relaxed">
            Extend DevTools with custom diagnostic tabs using custom DOM renderers.
          </p>
        </div>
      </div>
    </div>
  );
};
