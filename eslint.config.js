import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // Node.js 빌트인 모듈
            'external', // 외부 라이브러리 (react, mui, etc.)
            'internal', // 내부 경로
            'parent', // 상위 경로 (../)
            'sibling', // 동일 경로 (./)
            'index', // 인덱스 파일 (./index)
          ],
          // 옵션 1: 항상 줄바꿈 (현재 설정)
          'newlines-between': 'always',

          // 옵션 2: 줄바꿈 안함
          // 'newlines-between': 'never',

          // 옵션 3: 같은 그룹 내에서만 줄바꿈 안함
          // 'newlines-between': 'always-and-inside-groups',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react-**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
        },
      ],
    },
  },
);
