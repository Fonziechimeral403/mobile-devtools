'use client';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, X, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/shared/ui/button';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const [rendered, setRendered] = useState(isOpen);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRendered(true);
      document.body.style.overflow = 'hidden';
      // Trigger smooth CSS fade in on next tick
      const timer = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
      document.body.style.overflow = '';
      // Wait for exit transition to complete before unmounting
      const timer = setTimeout(() => setRendered(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!rendered) return null;

  return (
    <div
      className={`fixed inset-0 z-200 flex items-center justify-center p-4 transition-opacity duration-200 ease-out ${
        visible
          ? 'bg-black/60 backdrop-blur-md opacity-100'
          : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-dev-bg-100 border border-dev-border rounded-2xl p-6 sm:p-8 text-dev-text-main transition-all duration-200 ease-out ${
          visible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-dev-border">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-dev-text-bright tracking-tight">
                Privacy Policy
              </h2>
              <p className="text-xs text-dev-text-muted">
                mobile-devtools Documentation & Live Demo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-dev-text-muted hover:text-dev-text-bright hover:bg-dev-bg-300 rounded-lg transition-colors cursor-pointer"
            aria-label="Close Privacy Policy Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-dev-text-main">
          <div className="flex items-start gap-2.5 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-mono text-emerald-600 dark:text-emerald-400">
            <Lock className="w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <strong className="text-dev-text-bright">Zero Telemetry Promise:</strong> This website
              is purely interactive documentation & live demo for{' '}
              <code>mobile-devtools</code>. We collect <strong>zero</strong> personal data,
              store zero tracking cookies, and run 100% locally in your browser.
            </div>
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-bold text-dev-text-bright mb-1">
              1. What is this Website?
            </h3>
            <p className="text-dev-text-muted">
              This website serves as the official documentation hub and live interactive demo
              environment for{' '}
              <strong className="text-dev-text-bright">mobile-devtools</strong>, an
              open-source React component for in-app mobile browser debugging.
            </p>
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-bold text-dev-text-bright mb-1">
              2. Zero Data Collection Guarantee
            </h3>
            <p className="text-dev-text-muted mb-2">
              We prioritize your privacy above all else. We do{' '}
              <strong className="text-dev-text-bright">NOT</strong>:
            </p>
            <ul className="space-y-1.5 text-dev-text-main pl-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>Collect, store, or transmit personal data or IP addresses.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>Use analytics scripts, trackers, telemetry, or fingerprinting.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>Set non-essential cookies or third-party tracking identifiers.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>Send your console logs or network requests to any remote server.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-bold text-dev-text-bright mb-1">
              3. In-Browser Local Isolation
            </h3>
            <p className="text-dev-text-muted">
              All devtools interactions, network request interception demos, console log capturing,
              and storage inspections occur exclusively inside your browser memory within Shadow
              DOM.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between gap-3 pt-5 mt-6 border-t border-dev-border">
          <Link
            to="/privacy"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs text-dev-text-main hover:text-dev-text-bright font-medium underline underline-offset-4"
          >
            <span>Full Privacy Document</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Button variant="primary" size="sm" onClick={onClose}>
            Got it, thanks!
          </Button>
        </div>
      </div>
    </div>
  );
};
