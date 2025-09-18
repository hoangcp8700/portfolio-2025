import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { includeIgnoreFile } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const ignoresConfig = [
  {
    name: 'custom/eslint/ignores',

    // the ignores option needs to be in a separate configuration object
    // replaces the .eslintignore file
    ignores: ['.next/', '.vscode/', 'public/'],
  },
];

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'prettier',
      'eslint:recommended',
      'plugin:import/recommended',
    ],
    rules: {
      'no-var': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-empty': 'off',
      'no-unused-vars': 'off',

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '@/**', // Example for absolute imports
              group: 'internal',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-unresolved': 'error',
    },
  }),
  ...ignoresConfig,
  includeIgnoreFile(gitignorePath),
];

export default eslintConfig;
