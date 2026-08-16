import packageJson from '../package.json';

export const VERSION = packageJson.version;
export * from './adapters/vanilla';
export * from './core';
export * from './ui';
