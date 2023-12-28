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
  ],
  root: true,
  overrides: [
    {
      files: ['*.ts'],
      extends: ['opengovsg'],
    },
    {
      files: ['frontend/**/*.ts', '*.tsx'],
      extends: ['opengovsg', 'opengovsg/react'],
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
