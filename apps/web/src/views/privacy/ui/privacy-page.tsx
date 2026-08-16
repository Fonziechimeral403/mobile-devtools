'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { Button } from '@/shared/ui/button';

export const PrivacyPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-dev-bg-200 text-dev-text-main px-4 py-12 sm:py-20 font-sans transition-colors">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <header className="border-b border-dev-border pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-mono font-semibold mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Zero Telemetry & Zero Cookies Policy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-dev-text-bright tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-dev-text-muted">
            Last updated: August 16, 2026 • mobile-devtools Documentation & Live Demo
          </p>
        </header>

        {/* Body content */}
        <article className="space-y-6 text-dev-text-main text-sm sm:text-base leading-relaxed">
          <div className="p-4 bg-dev-bg-100 border border-dev-border rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
              <h2 className="text-dev-text-bright font-bold text-base">Key Privacy Commitments</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-dev-text-main font-medium">
              <li className="flex items-center gap-2 p-2 bg-dev-bg-300 rounded-lg border border-dev-border">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>No Personal Data Collection</span>
              </li>
              <li className="flex items-center gap-2 p-2 bg-dev-bg-300 rounded-lg border border-dev-border">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>No Analytics or Trackers</span>
              </li>
              <li className="flex items-center gap-2 p-2 bg-dev-bg-300 rounded-lg border border-dev-border">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>100% In-Browser Execution</span>
              </li>
              <li className="flex items-center gap-2 p-2 bg-dev-bg-300 rounded-lg border border-dev-border">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>Open Source MIT License</span>
              </li>
            </ul>
          </div>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-dev-text-bright">1. Overview</h2>
            <p className="text-dev-text-main">
              <code className="text-dev-text-bright bg-dev-bg-300 border border-dev-border px-1.5 py-0.5 rounded font-mono text-xs">
                mobile-devtools
              </code>{' '}
              is a lightweight, zero-dependency mobile browser debugging library. This web
              application functions exclusively as interactive documentation and a live test harness
              demo for developers to evaluate the package.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-dev-text-bright">2. Data Collection Policy</h2>
            <p className="text-dev-text-main">
              We believe in complete privacy for developers. We do not collect, capture, store, or
              transmit any data from visitors to this site or users of the library.
            </p>
            <ul className="space-y-2 text-dev-text-main pt-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mt-1 shrink-0" />
                <div>
                  <strong className="text-dev-text-bright">No Personal Information:</strong> We do not ask for
                  names, emails, user credentials, or payment information.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mt-1 shrink-0" />
                <div>
                  <strong className="text-dev-text-bright">No Telemetry or Analytics:</strong> We do not run
                  Google Analytics, Mixpanel, Hotjar, or any user tracking services.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mt-1 shrink-0" />
                <div>
                  <strong className="text-dev-text-bright">No Tracking Cookies:</strong> This web application
                  uses zero non-essential cookies.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mt-1 shrink-0" />
                <div>
                  <strong className="text-dev-text-bright">No Server-Side Storage:</strong> Debug logs,
                  simulated network API calls, and local storage entries tested in the demo remain
                  isolated inside your browser memory.
                </div>
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-dev-text-bright">3. How mobile-devtools Works</h2>
            <p className="text-dev-text-main">
              When you use{' '}
              <code className="text-dev-text-bright bg-dev-bg-300 border border-dev-border px-1.5 py-0.5 rounded font-mono text-xs">
                mobile-devtools
              </code>{' '}
              inside your application:
            </p>
            <ul className="space-y-2 text-dev-text-main pt-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mt-1 shrink-0" />
                <span>
                  It operates entirely inside the client-side DOM using Shadow DOM isolation.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mt-1 shrink-0" />
                <span>
                  Captured logs (Console, Network, Storage, Elements) are stored locally in
                  application memory (`window` object / React state) and are never uploaded
                  anywhere.
                </span>
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-dev-text-bright">4. Open Source Transparency</h2>
            <p className="text-dev-text-main">
              Because{' '}
              <code className="text-dev-text-bright bg-dev-bg-300 border border-dev-border px-1.5 py-0.5 rounded font-mono text-xs">
                mobile-devtools
              </code>{' '}
              is open-source software distributed under the MIT License, you can inspect every line
              of code yourself on GitHub to verify our security and zero-data practices.
            </p>
          </section>

          {/* Bottom navigation */}
          <section className="space-y-3 pt-6 border-t border-dev-border">
            <h2 className="text-xl font-bold text-dev-text-bright">5. Return to Documentation</h2>
            <p className="text-dev-text-muted">
              Ready to integrate mobile-devtools into your web projects?
            </p>
            <div className="pt-2">
              <Link to="/">
                <Button variant="primary" size="md">
                  <ArrowLeft className="w-4 h-4 text-black dark:text-black" />
                  <span>Return to Home & Documentation</span>
                </Button>
              </Link>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
};
