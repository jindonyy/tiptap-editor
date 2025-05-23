const js = require('@eslint/js');
const globals = require('globals');
const reactHooks = require('eslint-plugin-react-hooks');
const reactRefresh = require('eslint-plugin-react-refresh');
const tseslint = require('typescript-eslint');
const unusedImports = require('eslint-plugin-unused-imports');
const noRelativeImportPaths = require('eslint-plugin-no-relative-import-paths');
const importPlugin = require('eslint-plugin-import');
const react = require('eslint-plugin-react');
const jsxA11y = require('eslint-plugin-jsx-a11y');

/** @type {import('eslint').Linter.Config} */
module.exports = tseslint.config(
    js.configs.recommended,
    jsxA11y.flatConfigs.recommended,
    {
        ignores: ['node_modules', '.env.*', '*.log', '*.json', '*.config.*', '*.md'],
    },
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tseslint.parser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
            },
            globals: {
                ...globals.browser,
                ...globals.serviceworker,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'unused-imports': unusedImports,
            'no-relative-import-paths': noRelativeImportPaths,
            import: importPlugin,
            react: react,
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx', '.js', '.jsx'],
            },
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json',
                },
            },
        },
        rules: {
            // JavaScript/TypeScript 규칙
            'no-unused-vars': 'off',
            'no-console': [
                'warn',
                {
                    allow: ['warn', 'count', 'error', 'info'],
                },
            ],
            'prefer-template': 'warn',

            // Import 관련 규칙
            'import/order': [
                'warn',
                {
                    alphabetize: { order: 'asc' },
                    'newlines-between': 'always',
                    warnOnUnassignedImports: false,
                },
            ],
            'unused-imports/no-unused-imports': 'warn',
            'no-relative-import-paths/no-relative-import-paths': ['error', { allowSameFolder: true }],
            'import/no-anonymous-default-export': 'off',

            // TypeScript 규칙
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/ban-ts-comment': ['off', { ignoreVoid: true }],
            '@typescript-eslint/no-empty-function': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/consistent-type-imports': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-empty-interface': 'off',

            // React 규칙
            'react/self-closing-comp': 'warn',
            'react/function-component-definition': [
                'warn',
                {
                    namedComponents: 'function-declaration',
                    unnamedComponents: 'function-expression',
                },
            ],
            'react/no-array-index-key': 'error',
            'react/jsx-curly-brace-presence': [
                'error',
                {
                    props: 'never',
                    children: 'always',
                    propElementValues: 'always',
                },
            ],
            'react-hooks/exhaustive-deps': 'warn',
            'react/display-name': 'off',
            'react/react-in-jsx-scope': 'off',

            // React Refresh 규칙
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        },
    },
);
