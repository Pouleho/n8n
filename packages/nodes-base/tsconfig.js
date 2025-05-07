const { compilerOptions } = require('../../tsconfig.json');

module.exports = {
  extends: '../../tsconfig.json',
  compilerOptions: {
    ...compilerOptions,
    outDir: 'dist',
    paths: {
      ...compilerOptions.paths,
    },
    // These options help reduce memory usage
    incremental: true,
    tsBuildInfoFile: './dist/.tsbuildinfo',
  },
  include: ['nodes/**/*.ts'],
  exclude: [
    '**/*.spec.ts',
    '**/*.test.ts',
    '**/__tests__/**',
    'node_modules',
    'dist'
  ]
}; 