import React from 'react';
import { Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative text-center pt-8 sm:pt-16 pb-8 max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* Hero Content Container */}
      <div className="relative z-10 space-y-6 sm:space-y-8">
        {/* Pill Badge */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dev-bg-100/90 border border-dev-border backdrop-blur-xl text-xs font-semibold text-dev-text-bright">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>Next-Gen In-App Mobile Inspector</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] text-dev-text-bright">
          Framework-Agnostic <br />
          In-App Mobile Debugger.
        </h1>

        {/* Punchy Subtitle */}
        <p className="text-base sm:text-lg text-dev-text-muted max-w-2xl mx-auto leading-relaxed font-medium">
          Inspect console logs, network calls, and storage entries directly on your phone. No USB
          cables or desktop devtools required. Built to be 100% framework-agnostic for any web
          stack.
        </p>
      </div>
    </section>
  );
};
