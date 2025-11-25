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
    target: [
      //
      'chrome' + '109',
      'firefox' + '135',
      'safari' + '17',
      'edge' + '135',
    ],
    format: ['cjs', 'iife'],
  },
  {
    ...sharedConfig,
    format: ['esm'],
  },
]);
