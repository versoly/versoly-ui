import { defineConfig } from 'tsdown';

const sharedConfig = {
  exports: true,
  minify: true,
  entry: {
    'versoly-ui': './src/index.ts',
  },
  platform: 'browser',
} as const;

export default defineConfig([
  {
    ...sharedConfig,
    target: ['chrome58', 'firefox57', 'safari11', 'edge79'],
    format: ['cjs', 'iife'],
  },
  {
    ...sharedConfig,
    format: ['esm'],
  },
]);
