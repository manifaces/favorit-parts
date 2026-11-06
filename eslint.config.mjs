import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  { ignores: ['node_modules/**', 'dist/**', '.yarn/**', '.husky/**'] },
  {
    ...js.configs.recommended,
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' }
  },
  {
    ...react.configs.flat.recommended,
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      globals: globals.browser
    },
    settings: { react: { version: 'detect' } }
  },
  { ...react.configs.flat['jsx-runtime'], files: ['src/**/*.{js,jsx}'] },
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
      'react/prop-types': 'off'
    }
  },
  {
    files: ['**/*.config.{js,mjs}', '.*rc.mjs'],
    languageOptions: { globals: globals.node }
  },
  {
    files: ['**/*.{js,jsx,mjs}'],
    plugins: { import: importPlugin },
    rules: {
      'import/order': [
        'error',
        {
          'newlines-between': 'never',
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroupsExcludedImportTypes: ['builtin'],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: '@/**', group: 'internal' },
            { pattern: './*.module.scss', group: 'sibling', position: 'after' }
          ]
        }
      ]
    }
  },
  prettier
];
