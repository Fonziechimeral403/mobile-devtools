import { resolve } from 'path';

/**
 * Generates shared Vite resolve aliases for mobile-devtools source files in development mode.
 * @param {string} rootDir - __dirname of the consuming app
 * @param {string} relativeMonorepoRoot - Relative path from app __dirname to monorepo root (e.g. '../..' or '../../..')
 */
export function getDevToolsAliases(rootDir, relativeMonorepoRoot = '../..') {
  const monorepoRoot = resolve(rootDir, relativeMonorepoRoot);
  return {
    'mobile-devtools/react': resolve(monorepoRoot, 'packages/mobile-devtools/src/react.ts'),
    'mobile-devtools/vue': resolve(monorepoRoot, 'packages/mobile-devtools/src/vue.ts'),
    'mobile-devtools/svelte': resolve(monorepoRoot, 'packages/mobile-devtools/src/svelte.ts'),
    'mobile-devtools/package.json': resolve(monorepoRoot, 'packages/mobile-devtools/package.json'),
    'mobile-devtools$': resolve(monorepoRoot, 'packages/mobile-devtools/src/index.ts'),
  };
}
