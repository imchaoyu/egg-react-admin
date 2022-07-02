console.log('cy-style', require.resolve('cy-style/dist/eslint'));
module.exports = {
  extends: [require.resolve('cy-style/dist/eslint')],
  // plugins: ['prettier'],
  rules: {
    // 'prettier/prettier': 'error',
    'no-unused-vars': 'error',
    'space-before-function-paren': 'off',
  },
};
