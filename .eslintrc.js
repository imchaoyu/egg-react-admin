module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  plugins: ['prettier'],
  rules: {
    strict: ['off', 'global'],
    'prettier/prettier': 'error',
    'no-unused-vars': 'error',
    'space-before-function-paren': 'off',
  },
};
