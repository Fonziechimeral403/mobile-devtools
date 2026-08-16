'use client';

import React from 'react';
import { Terminal, Globe, Database, Play, AlertTriangle, AlertCircle } from 'lucide-react';
import { Button } from '@/shared/ui/button';

export const TestHarness: React.FC = () => {
  const triggerConsoleLog = () => {
    console.log('🚀 User triggered console log', {
      timestamp: new Date().toISOString(),
      user: { id: 'usr_888', role: 'admin' },
    });
  };

  const triggerConsoleWarn = () => {
    console.warn('⚠️ Performance Warning: Image resource load exceeded threshold', {
      resource: '/hero-banner.png',
      duration: '480ms',
    });
  };

  const triggerConsoleError = () => {
    try {
      throw new Error('TypeError: Cannot read properties of undefined (reading "map")');
    } catch (e) {
      console.error('🔥 Runtime Exception Captured:', e);
    }
  };

  const triggerFetchSuccess = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const data = await res.json();
      console.log('Fetched JSONPlaceholder user:', data);
    } catch (e) {
      console.error('Fetch error:', e);
    }
  };

  const triggerFetchError = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/error-500', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Simulated Danger Error', body: 'Testing 500 Internal Server Error', userId: 99 }),
      });
      if (!res.ok) {
        console.error('🔥 POST /posts (500) Simulated Danger Error:', {
          status: 500,
          statusText: 'Internal Server Error',
          endpoint: '/api/posts/checkout',
          timestamp: new Date().toISOString(),
        });
      }
    } catch (e) {
      console.error('🔥 POST /posts Error captured:', e);
    }
  };

  const triggerFetch404 = async () => {
    try {
      await fetch('https://jsonplaceholder.typicode.com/posts/999999', { method: 'PUT' });
    } catch (e) {
      console.error('404 error:', e);
    }
  };

  const setLocalStorageDemo = () => {
    localStorage.setItem('auth_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo_token_99');
    localStorage.setItem('theme_preference', 'dark');
    console.log('Updated localStorage entries');
  };

  const setSessionStorageDemo = () => {
    sessionStorage.setItem('active_session_id', 'sess_active_777');
    sessionStorage.setItem('temporary_step', 'checkout_review');
    console.log('Updated sessionStorage entries');
  };

  const setCookieDemo = () => {
    document.cookie = 'session_id=sess_mobile_devtools_999; path=/';
    console.log('Set demo cookie entry');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-dev-text-bright tracking-tight">Interactive Test Controls</h2>
        <p className="text-sm text-dev-text-muted">
          Click any action button below and tap the floating <strong className="text-dev-text-bright">DevTools</strong> badge in the corner to inspect captured data!
        </p>
      </div>

      <div className="bg-dev-bg-100 border border-dev-border rounded-2xl p-5 space-y-4">
        {/* Console Interceptor Card */}
        <div className="bg-dev-bg-300/80 border border-dev-border rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-dev-text-bright">1. Console Interceptor Test</h3>
          </div>
          <p className="text-xs text-dev-text-muted">Trigger console entries to test badge counter & stack trace formatting.</p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" onClick={triggerConsoleLog}>
              <Play className="w-3.5 h-3.5 text-dev-text-muted" />
              <span>console.log()</span>
            </Button>
            <Button size="sm" variant="secondary" className="text-amber-600 dark:text-amber-400" onClick={triggerConsoleWarn}>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>console.warn()</span>
            </Button>
            <Button size="sm" variant="secondary" className="text-rose-600 dark:text-rose-400" onClick={triggerConsoleError}>
              <AlertCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>console.error()</span>
            </Button>
          </div>
        </div>

        {/* Network Test Card */}
        <div className="bg-dev-bg-300/80 border border-dev-border rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-500 dark:text-sky-400" />
            <h3 className="text-sm font-bold text-dev-text-bright">2. Network (Fetch & XHR) Test</h3>
          </div>
          <p className="text-xs text-dev-text-muted">Trigger real HTTP requests to test timing, JSON body, & Copy cURL.</p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" onClick={triggerFetchSuccess}>
              <Play className="w-3.5 h-3.5 text-dev-text-muted" />
              <span>GET /users/1 (200)</span>
            </Button>
            <Button size="sm" variant="secondary" className="text-amber-600 dark:text-amber-400" onClick={triggerFetch404}>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>PUT /posts/999999 (404)</span>
            </Button>
            <Button size="sm" variant="secondary" className="text-rose-600 dark:text-rose-400" onClick={triggerFetchError}>
              <AlertCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>POST /posts (500 Danger)</span>
            </Button>
          </div>
        </div>

        {/* Storage Inspector Card */}
        <div className="bg-dev-bg-300/80 border border-dev-border rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-purple-500 dark:text-purple-400" />
            <h3 className="text-sm font-bold text-dev-text-bright">3. Storage Inspector Test</h3>
          </div>
          <p className="text-xs text-dev-text-muted">Mutate localStorage, sessionStorage, and document.cookie to test the Storage Inspector tab.</p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" onClick={setLocalStorageDemo}>
              <span>Set localStorage</span>
            </Button>
            <Button size="sm" variant="secondary" onClick={setSessionStorageDemo}>
              <span>Set sessionStorage</span>
            </Button>
            <Button size="sm" variant="secondary" onClick={setCookieDemo}>
              <span>Set Cookie</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
