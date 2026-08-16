'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, Code2, Copy, Sliders, Terminal } from 'lucide-react';

type FrameworkTab = 'react' | 'vue' | 'vanilla';

export const CodeDocs: React.FC = () => {
  const [activeFramework, setActiveFramework] = useState<FrameworkTab>('react');
  const [copiedInstall, setCopiedInstall] = useState<boolean>(false);
  const [copiedUsage, setCopiedUsage] = useState<boolean>(false);
  const [copiedCustom, setCopiedCustom] = useState<boolean>(false);

  const installTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const usageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const customTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (installTimerRef.current) clearTimeout(installTimerRef.current);
      if (usageTimerRef.current) clearTimeout(usageTimerRef.current);
      if (customTimerRef.current) clearTimeout(customTimerRef.current);
    };
  }, []);

  const getInstallCmd = () => {
    return 'npm install mobile-devtools';
  };

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(getInstallCmd());
    setCopiedInstall(true);
    if (installTimerRef.current) clearTimeout(installTimerRef.current);
    installTimerRef.current = setTimeout(() => {
      setCopiedInstall(false);
      installTimerRef.current = null;
    }, 2000);
  };

  const handleCopyUsage = () => {
    let code = '';
    if (activeFramework === 'react') {
      code = `import { MobileDevTools } from 'mobile-devtools/react';\n\nexport default function App() {\n  return (\n    <>\n      <YourAppComponents />\n      <MobileDevTools />\n    </>\n  );\n}`;
    } else if (activeFramework === 'vue') {
      code = `<script setup>\nimport { MobileDevTools } from 'mobile-devtools/vue';\n</script>\n\n<template>\n  <MobileDevTools />\n</template>`;
    } else {
      code = `import { createMobileDevTools } from 'mobile-devtools';\n\n// Initialize in any JS file\nconst devtools = createMobileDevTools({\n  theme: { mode: 'dark' },\n  position: 'bottom-right',\n});`;
    }

    navigator.clipboard.writeText(code);
    setCopiedUsage(true);
    if (usageTimerRef.current) clearTimeout(usageTimerRef.current);
    usageTimerRef.current = setTimeout(() => {
      setCopiedUsage(false);
      usageTimerRef.current = null;
    }, 2000);
  };

  const handleCopyCustom = () => {
    let code = '';
    if (activeFramework === 'react') {
      code = `<MobileDevTools\n  title="My App Debugger"\n  position="bottom-right"\n  theme={{\n    mode: 'dark',\n    accentColor: '#ffffff',\n    backgroundColor: '#0a0a0a',\n  }}\n  customTabs={[\n    {\n      id: 'analytics',\n      title: 'Analytics',\n      render: (container) => {\n        container.innerHTML = '<h3>📊 Analytics Events</h3>';\n      }\n    }\n  ]}\n/>`;
    } else if (activeFramework === 'vue') {
      code = `<MobileDevTools\n  title="My App Debugger"\n  position="bottom-right"\n  :theme="{\n    mode: 'dark',\n    accentColor: '#ffffff',\n    backgroundColor: '#0a0a0a'\n  }"\n  :custom-tabs="[\n    {\n      id: 'analytics',\n      title: 'Analytics',\n      render: (container) => {\n        container.innerHTML = '<h3>📊 Analytics Events</h3>';\n      }\n    }\n  ]"\n/>`;
    } else {
      code = `createMobileDevTools({\n  title: 'My App Debugger',\n  position: 'bottom-right',\n  theme: {\n    mode: 'dark',\n    accentColor: '#ffffff',\n    backgroundColor: '#0a0a0a',\n  },\n  customTabs: [\n    {\n      id: 'analytics',\n      title: 'Analytics',\n      render: (container) => {\n        container.innerHTML = '<h3>📊 Analytics Events</h3>';\n      }\n    }\n  ]\n});`;
    }

    navigator.clipboard.writeText(code);
    setCopiedCustom(true);
    if (customTimerRef.current) clearTimeout(customTimerRef.current);
    customTimerRef.current = setTimeout(() => {
      setCopiedCustom(false);
      customTimerRef.current = null;
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-dev-text-bright tracking-tight">
            Quick Installation & Setup
          </h2>
          <p className="text-xs text-dev-text-muted">
            Integrate in under 30 seconds into React, Vue 3, or Vanilla JS applications.
          </p>
        </div>

        {/* Framework Selector Tabs */}
        <div className="inline-flex p-1 rounded-xl bg-dev-bg-100 border border-dev-border self-start sm:self-auto">
          <button
            onClick={() => setActiveFramework('react')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
              activeFramework === 'react'
                ? 'bg-dev-bg-300 text-dev-text-bright border border-dev-border'
                : 'text-dev-text-muted hover:text-dev-text-bright'
            }`}
          >
            React
          </button>
          <button
            onClick={() => setActiveFramework('vue')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
              activeFramework === 'vue'
                ? 'bg-dev-bg-300 text-dev-text-bright border border-dev-border'
                : 'text-dev-text-muted hover:text-dev-text-bright'
            }`}
          >
            Vue 3
          </button>
          <button
            onClick={() => setActiveFramework('vanilla')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
              activeFramework === 'vanilla'
                ? 'bg-dev-bg-300 text-dev-text-bright border border-dev-border'
                : 'text-dev-text-muted hover:text-dev-text-bright'
            }`}
          >
            Vanilla JS
          </button>
        </div>
      </div>

      {/* Card 1: Installation */}
      <div className="bg-dev-bg-100 border border-dev-border rounded-2xl overflow-hidden">
        <div className="px-4 py-2.5 bg-dev-bg-300 border-b border-dev-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-status-success-text" />
            <span className="text-xs font-mono text-dev-text-muted">terminal</span>
          </div>
          <button
            onClick={handleCopyInstall}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-dev-bg-200 border border-dev-border text-dev-text-muted hover:text-dev-text-bright text-xs font-mono transition-colors cursor-pointer"
          >
            {copiedInstall ? (
              <>
                <Check className="w-3 h-3 text-status-success-text" />
                <span className="text-status-success-text font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-dev-text-muted" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="p-4 sm:p-5 font-mono text-xs text-dev-text-main overflow-x-auto leading-relaxed bg-dev-bg-100">
          <code>
            <span className="text-syntax-keyword">npm</span>{' '}
            <span className="text-syntax-string">install</span>{' '}
            <span className="text-dev-text-bright font-semibold">
              mobile-devtools
            </span>
          </code>
        </pre>
      </div>

      {/* Card 2: Basic Framework Usage */}
      <div className="bg-dev-bg-100 border border-dev-border rounded-2xl overflow-hidden">
        <div className="px-4 py-2.5 bg-dev-bg-300 border-b border-dev-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-syntax-function" />
            <span className="text-xs font-mono text-dev-text-muted">
              {activeFramework === 'react'
                ? 'App.tsx'
                : activeFramework === 'vue'
                  ? 'App.vue'
                  : 'main.js'}
            </span>
          </div>
          <button
            onClick={handleCopyUsage}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-dev-bg-200 border border-dev-border text-dev-text-muted hover:text-dev-text-bright text-xs font-mono transition-colors cursor-pointer"
          >
            {copiedUsage ? (
              <>
                <Check className="w-3 h-3 text-status-success-text" />
                <span className="text-status-success-text font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-dev-text-muted" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="p-4 sm:p-5 font-mono text-xs text-dev-text-main overflow-x-auto leading-relaxed bg-dev-bg-100">
          {activeFramework === 'react' && (
            <code>
              <span className="text-syntax-keyword">import</span> {'{'}{' '}
              <span className="text-syntax-function">MobileDevTools</span> {'}'}{' '}
              <span className="text-syntax-keyword">from</span>{' '}
              <span className="text-syntax-string">&apos;mobile-devtools/react&apos;</span>;<br />
              <br />
              <span className="text-syntax-keyword">export default function</span>{' '}
              <span className="text-dev-text-bright">App</span>() {'{'}
              <br />
              {'  '}
              <span className="text-syntax-keyword">return</span> (<br />
              {'    '}&lt;&gt;
              <br />
              {'      '}&lt;<span className="text-syntax-function">YourAppComponents</span> /&gt;
              <br />
              {'      '}&lt;<span className="text-syntax-function">MobileDevTools</span> /&gt;
              <br />
              {'    '}&lt;/&gt;
              <br />
              {'  '});
              <br />
              {'}'}
            </code>
          )}

          {activeFramework === 'vue' && (
            <code>
              &lt;<span className="text-syntax-keyword">script</span>{' '}
              <span className="text-syntax-parameter">setup</span>&gt;
              <br />
              <span className="text-syntax-keyword">import</span> {'{'}{' '}
              <span className="text-syntax-function">MobileDevTools</span> {'}'}{' '}
              <span className="text-syntax-keyword">from</span>{' '}
              <span className="text-syntax-string">&apos;mobile-devtools/vue&apos;</span>;<br />
              &lt;/<span className="text-syntax-keyword">script</span>&gt;
              <br />
              <br />
              &lt;<span className="text-syntax-keyword">template</span>&gt;
              <br />
              {'  '}&lt;<span className="text-syntax-function">MobileDevTools</span> /&gt;
              <br />
              &lt;/<span className="text-syntax-keyword">template</span>&gt;
            </code>
          )}

          {activeFramework === 'vanilla' && (
            <code>
              <span className="text-syntax-keyword">import</span> {'{'}{' '}
              <span className="text-syntax-function">createMobileDevTools</span> {'}'}{' '}
              <span className="text-syntax-keyword">from</span>{' '}
              <span className="text-syntax-string">&apos;mobile-devtools&apos;</span>;
              <br />
              <br />
              <span className="text-syntax-comment italic">
                {'// Initialize DevTools in any JS file'}
              </span>
              <br />
              <span className="text-syntax-keyword">const</span>{' '}
              <span className="text-dev-text-bright">devtools</span> ={' '}
              <span className="text-syntax-function">createMobileDevTools</span>({'{'}
              <br />
              {'  '}
              <span className="text-syntax-parameter">theme</span>: {'{'} mode:{' '}
              <span className="text-syntax-string">&apos;dark&apos;</span> {'}'},<br />
              {'  '}
              <span className="text-syntax-parameter">position</span>:{' '}
              <span className="text-syntax-string">&apos;bottom-right&apos;</span>,<br />
              {'}'});
            </code>
          )}
        </pre>
      </div>

      {/* Card 3: Advanced Customization Example */}
      <div className="bg-dev-bg-100 border border-dev-border rounded-2xl overflow-hidden">
        <div className="px-4 py-2.5 bg-dev-bg-300 border-b border-dev-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono text-dev-text-muted">Customization</span>
          </div>
          <button
            onClick={handleCopyCustom}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-dev-bg-200 border border-dev-border text-dev-text-muted hover:text-dev-text-bright text-xs font-mono transition-colors cursor-pointer"
          >
            {copiedCustom ? (
              <>
                <Check className="w-3 h-3 text-status-success-text" />
                <span className="text-status-success-text font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-dev-text-muted" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="p-4 sm:p-5 font-mono text-xs text-dev-text-main overflow-x-auto leading-relaxed bg-dev-bg-100">
          <code>
            {activeFramework === 'react' && (
              <>
                &lt;<span className="text-syntax-function">MobileDevTools</span>
                <br />
                {'  '}
                <span className="text-syntax-parameter">title</span>=
                <span className="text-syntax-string">&quot;My App Debugger&quot;</span>
                <br />
                {'  '}
                <span className="text-syntax-parameter">position</span>=
                <span className="text-syntax-string">&quot;bottom-right&quot;</span>
                <br />
                {'  '}
                <span className="text-syntax-parameter">theme</span>={'{'}
                {'{'} mode: <span className="text-syntax-string">&apos;dark&apos;</span>,
                accentColor: <span className="text-syntax-string">&apos;#0070f3&apos;</span> {'}'}
                {'}'}
                <br />
                {'  '}
                <span className="text-syntax-parameter">customTabs</span>={'{'}[{'{'}
                <br />
                {'    '}id: <span className="text-syntax-string">&apos;analytics&apos;</span>,
                title: <span className="text-syntax-string">&apos;Analytics&apos;</span>,
                <br />
                {'    '}
                <span className="text-syntax-function">render</span>: (container) =&gt; {'{'}
                <br />
                {'      '}container.innerHTML ={' '}
                <span className="text-syntax-string">
                  &apos;&lt;div style=&quot;padding:16px&quot;&gt;📊 Analytics Events&lt;/div&gt;&apos;
                </span>
                ;
                <br />
                {'    '}
                {'}'}
                <br />
                {'  '}
                {'}'}]{'}'}
                <br />
                /&gt;
              </>
            )}

            {activeFramework === 'vue' && (
              <>
                &lt;<span className="text-syntax-function">MobileDevTools</span>
                <br />
                {'  '}
                <span className="text-syntax-parameter">title</span>=
                <span className="text-syntax-string">&quot;My App Debugger&quot;</span>
                <br />
                {'  '}
                <span className="text-syntax-parameter">position</span>=
                <span className="text-syntax-string">&quot;bottom-right&quot;</span>
                <br />
                {'  '}
                <span className="text-syntax-parameter">:theme</span>=
                <span className="text-syntax-string">
                  &quot;{'{'} mode: &apos;dark&apos;, accentColor: &apos;#0070f3&apos; {'}'}&quot;
                </span>
                <br />
                {'  '}
                <span className="text-syntax-parameter">:custom-tabs</span>=
                <span className="text-syntax-string">
                  &quot;[{'{'} id: &apos;analytics&apos;, title: &apos;Analytics&apos;, render:
                  customRender {'}'}]&quot;
                </span>
                <br />
                /&gt;
              </>
            )}

            {activeFramework === 'vanilla' && (
              <>
                <span className="text-syntax-function">createMobileDevTools</span>({'{'}
                <br />
                {'  '}
                <span className="text-syntax-parameter">title</span>:{' '}
                <span className="text-syntax-string">&apos;My App Debugger&apos;</span>,<br />
                {'  '}
                <span className="text-syntax-parameter">position</span>:{' '}
                <span className="text-syntax-string">&apos;bottom-right&apos;</span>,<br />
                {'  '}
                <span className="text-syntax-parameter">theme</span>: {'{'} mode:{' '}
                <span className="text-syntax-string">&apos;dark&apos;</span>, accentColor:{' '}
                <span className="text-syntax-string">&apos;#0070f3&apos;</span> {'}'},<br />
                {'  '}
                <span className="text-syntax-parameter">customTabs</span>: [{'{'}
                <br />
                {'    '}id: <span className="text-syntax-string">&apos;analytics&apos;</span>,
                title: <span className="text-syntax-string">&apos;Analytics&apos;</span>,<br />
                {'    '}
                <span className="text-syntax-function">render</span>: (container) =&gt; {'{'}
                <br />
                {'      '}container.innerHTML ={' '}
                <span className="text-syntax-string">
                  &apos;&lt;div style=&quot;padding:16px&quot;&gt;📊 Analytics Events&lt;/div&gt;&apos;
                </span>
                ;<br />
                {'    '}
                {'}'}<br />
                {'  '}
                {'}'}],<br />
                {'}'});
              </>
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};
