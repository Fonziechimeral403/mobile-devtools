# Changelog

All notable changes to the `mobile-devtools` package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-08-17

### 🔒 Scroll Locking, Adapter Test Coverage & E2E Suite

#### Added

- **Background Scroll Locking**: Prevents body scrolling when DevTools drawer overlay is open.
- **Framework Adapter Tests**: Added comprehensive unit test suites for React (`react.test.tsx`) and Vue (`vue.test.ts`) adapters.
- **Web App E2E Test Suite**: Added Playwright E2E coverage for Elements, Network, Storage, and Theme System interactions.

#### Fixed & Improved

- **Vue Adapter Hook**: Resolved TypeScript narrowing issue on `useMobileDevTools()` return type in strict mode.
- **Network & Storage Tab Formatting**: Enhanced HTTP status pills, response time indicators, JSON response headers formatting, and item action buttons.
- **Console & Storage Utilities**: Added clipboard copy and export capabilities with dedicated unit tests.

---

## [1.0.2] - 2026-08-17

### 🚀 Web App & Documentation Enhancements

#### Added

- **UI Showcase**: Added high-resolution screenshots for Console, Network, Elements, Storage, and System Info tabs in `README.md`.
- **Shared URL Constants**: Centralized project URLs (`SITE`, `GITHUB`, `NPM`) in `@/shared/constants` for consistent consumer navigation.
- **`robots.txt`**: Added `robots.txt` with Sitemap reference for web application SEO.

#### Fixed & Improved

- **Cloudflare Deployment**: Resolved asset upload infinite redirect loop by removing redundant `_redirects` file and switching build script to Node 24 support.
- **Dynamic Versioning**: Replaced hardcoded version strings in Web UI footer with dynamic `VERSION` import from `mobile-devtools`.
- **Git & Build Hygiene**: Ignored `.wrangler` state directory in `.gitignore` and untracked build artifacts.

---

## [1.0.1] - 2026-08-17

### 🎨 Theme Support & Documentation Polish

#### Added

- **npm Compatibility**: Replaced Mermaid diagram in package `README.md` with ASCII architecture diagrams for clean rendering on npmjs.com package page.
- **Theme Color Synchronization**: Added mobile status bar meta theme color syncing (`#090d16`) in web portal application.
- **Monorepo Build Pipelines**: Added prebuild script to automatically build `mobile-devtools` package before web app build step.

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
