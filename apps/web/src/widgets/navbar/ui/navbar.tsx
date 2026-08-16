'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone } from 'lucide-react';
import { GithubIcon } from '@/shared/ui/icons/github-icon';
import { Button } from '@/shared/ui/button';
import { ThemeToggle } from '@/features/theme-toggle/ui/theme-toggle';
import { VERSION } from 'mobile-devtools';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-dev-bg-100/90 backdrop-blur-md border-b border-dev-border transition-colors duration-200">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo Group */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-1.5 rounded-lg bg-dev-bg-300 border border-dev-border text-dev-text-bright group-hover:border-neutral-400 transition-colors">
            <Smartphone className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
          </div>
          <span className="font-extrabold text-sm sm:text-base text-dev-text-bright tracking-tight">
            mobile-devtools
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-dev-bg-300 border border-dev-border text-[11px] font-mono font-semibold text-dev-text-muted">
            v{VERSION}
          </span>
        </Link>

        {/* Nav Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* GitHub Button */}
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Button variant="primary" size="sm">
              <GithubIcon className="w-4 h-4 fill-current shrink-0" />
              <span>GitHub</span>
            </Button>
          </a>
        </div>
      </nav>
    </header>
  );
};
