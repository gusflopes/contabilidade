module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import-helpers'],
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'no-param-reassign': 'off',
    camelcase: 'off',

    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-await-in-loop': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always', // new line between groups
        groups: [
          // "/^react^/",
          'module',
          '/^~/',
          // "/^@shared/",
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  settings: {
    'import/extensions': ['.ts', '.js'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.js'],
    },
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '~': path.join(__dirname, 'src/app'),
            },
            extensions: ['.js', '.ts'],
          },
        },
      },
    },
  },
};
