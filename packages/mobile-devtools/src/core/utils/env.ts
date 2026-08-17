/**
 * True if running in a client-side browser environment with access to `window` and `document`.
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * True if running in a server-side environment (Node.js, SSR, Workers).
 */
export const isServer = !isBrowser;
