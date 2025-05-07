import { defineConfig } from 'tsup';

export default defineConfig({
  splitting: true,
  clean: true,
  treeshake: 'recommended',
  minify: false,
  skipNodeModulesBundle: true,
  target: 'node16',
  format: ['cjs'],
  sourcemap: true,
  external: ['@n8n/workflow', '@n8n/core', 'chokidar', 'fast-glob'],
  // Worker limit helps prevent out of memory errors during build
  workers: 2,
  // Adjust the amount of memory used for Node.js during build
  env: {
    NODE_OPTIONS: '--max-old-space-size=4096'
  }
}); 