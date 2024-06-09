module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
      '@vue/typescript/recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      'no-unused-vars': 'error',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/no-unused-vars': 'error'
    },
  };
  