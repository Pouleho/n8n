import { defineConfig } from 'tsup';

export default defineConfig({
  splitting: true,
  clean: true, // clean up the dist folder
  dts: true, // generate dts files
  format: ['cjs', 'esm'], // generate cjs and esm files
  minify: false,
  bundle: false,
  skipNodeModulesBundle: true,
  entryPoints: ['src/index.ts'],
  watch: process.env.WATCH_MODE === 'true',
  target: 'es2021',
  outDir: 'dist', // output directory
  entry: ['nodes/**/*.ts', 'credentials/**/*.ts'], //include all files under nodes and credentials
  external: ['n8n-workflow', 'n8n-core', 'n8n-nodes-base'], // exclude these packages from bundling
  sourcemap: true, // generate sourcemaps
  // Limit concurrency to prevent OOM errors
  workers: 2,
  env: {
    NODE_OPTIONS: '--max-old-space-size=4096'
  }
}); 