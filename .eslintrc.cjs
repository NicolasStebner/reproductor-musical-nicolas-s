module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'plugin:@typescript-eslint/recommended'
    ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true ,non},
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warning"]
  },
}
