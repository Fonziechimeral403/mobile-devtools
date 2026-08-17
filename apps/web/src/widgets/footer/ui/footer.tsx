'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, ShieldCheck, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/shared/ui/icons/github-icon';
import { URLS } from '@/shared/constants';
import { VERSION } from 'mobile-devtools';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-transparent border-t border-dev-border text-dev-text-muted font-sans mt-20 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 & 2: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-dev-bg-300 border border-dev-border text-dev-text-bright">
                <Smartphone className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
              </div>
              <span className="text-dev-text-bright font-extrabold text-lg tracking-tight">
                mobile-devtools
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-dev-bg-300 border border-dev-border text-dev-text-muted">
                v{VERSION}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-dev-text-muted max-w-md leading-relaxed">
              Framework-agnostic in-app Chrome DevTools power for mobile web browsers. Inspect
              console logs, network traffic, and local storage directly on device in React, Vue 3, or Vanilla JS.
            </p>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h3 className="text-dev-text-bright font-bold text-xs mb-3 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="#demo"
                  className="hover:text-dev-text-bright transition-colors font-medium"
                >
                  Interactive Demo
                </a>
              </li>
              <li>
                <a
                  href="#quickstart"
                  className="hover:text-dev-text-bright transition-colors font-medium"
                >
                  Quickstart Guide
                </a>
              </li>
              <li>
                <a href="#api" className="hover:text-dev-text-bright transition-colors font-medium">
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-dev-text-bright transition-colors font-medium"
                >
                  Key Features
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources & Legal */}
          <div>
            <h3 className="text-dev-text-bright font-bold text-xs mb-3 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href={URLS.GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-dev-text-bright transition-colors inline-flex items-center gap-1.5 font-medium"
                >
                  <GithubIcon className="w-3.5 h-3.5 fill-current shrink-0" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-dev-text-subtle shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href={URLS.NPM}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-dev-text-bright transition-colors inline-flex items-center gap-1.5 font-medium"
                >
                  <span>NPM Package</span>
                  <ExternalLink className="w-3 h-3 text-dev-text-subtle shrink-0" />
                </a>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-dev-text-bright transition-colors inline-flex items-center gap-1.5 font-medium"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-dev-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-dev-text-subtle">
          <p>
            © {new Date().getFullYear()} mobile-devtools. Released under the MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
};
