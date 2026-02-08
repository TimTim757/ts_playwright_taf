const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['e2e/**/*.ts', 'support/**/*.ts', 'pages/**/*.ts', 'playwright.config.ts'],
  },
  {
    ignores: ['eslint.config.js'],
  }
);
