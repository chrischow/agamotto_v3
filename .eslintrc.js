module.exports = {
  extends: ['opengovsg/javascript'],
  ignorePatterns: [
    'coverage',
    'build',
    'dist',
    'node_modules',
    'jest.config.ts',
    'vite.config.ts',
    '.eslintrc.js',
    'vite-env.d.ts',
  ],
  plugins: ['react-refresh'],
  root: true,
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts'],
      extends: ['opengovsg'],
    },
    {
      files: ['frontend/**/*.ts', '*.tsx'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
      ],
      parser: '@typescript-eslint/parser',
      plugins: ['react-refresh'],
      rules: {
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
      },
    },
    {
      files: ['frontend/**/*.js', '*.jsx'],
      extends: ['opengovsg/javascript', 'opengovsg/react'],
    },
    {
      files: ['*spec.ts'],
      plugins: ['jest'],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
        'jest/unbound-method': 'error',
      },
    },
  ],
}
