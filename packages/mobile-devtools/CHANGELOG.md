# Changelog

All notable changes to the `mobile-devtools` package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-08-17

### 🎉 Initial Public Release

`mobile-devtools` is a next-generation, framework-agnostic in-app mobile debugger and inspector overlay for web applications.

#### Added
- **Core Engine & Reactive Store**:
  - `DevToolsStore` state management with reactive subscription model, unread error counters, and buffer caps.
  - Native Shadow DOM encapsulation (`<mobile-devtools-root>`) guaranteeing 0% CSS leaks into host applications.
- **Console Inspector (`Console Tab`)**:
  - Real-time interception of `console.log`, `info`, `warn`, `error`, and `debug`.
  - Filter by log severity levels and live text search query filter.
  - Interactive JSON tree viewer (`<json-tree>`) for deep nested objects and arrays.
- **Network Inspector (`Network Tab`)**:
  - Interception of modern `window.fetch` and legacy `XMLHttpRequest` (XHR).
  - HTTP status pills, latency timing (ms), request/response headers, and JSON body preview.
  - Network Throttling Simulator (`Online`, `Fast 3G`, `Slow 3G`, `Offline`).
- **DOM Elements Inspector (`Elements Tab`)**:
  - Real-time HTML DOM tree browser with collapsible nodes and interactive element picker.
  - Box model layout visualizer (`margin`, `border`, `padding`, `content`).
  - Grouped computed CSS styles (Layout, Flexbox, Grid, Typography, Colors).
- **Storage Inspector (`Storage Tab`)**:
  - Real-time inspector and inline editor for `localStorage`, `sessionStorage`, and `document.cookie`.
- **System Diagnostics (`System Tab`)**:
  - Real-time viewport dimensions, device pixel ratio (DPR), User Agent string, JS heap memory diagnostics, and orientation listener.
- **Extension & Customization API**:
  - Pluggable custom consumer tabs via `customTabs` prop with DOM rendering callbacks.
  - Fine-grained UI component styling overrides via `styles` prop (`{ badge, drawer, overlay, handle }`).
  - Sensitive data masking via `privacy.mask` prop.
- **Framework Adapters**:
  - Vanilla JavaScript adapter (`createMobileDevTools`).
  - React 18/19 adapter (`mobile-devtools/react`).
  - Vue 3 adapter (`mobile-devtools/vue`).
- **Quality Assurance & Testing**:
  - 65 Unit Tests (100% Passed) via Vitest with V8 coverage.
  - 21 Playwright E2E Tests (100% Passed) across Chromium, Mobile Chrome, and Mobile Safari.
