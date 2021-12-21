module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "lines-between-class-members": 0,
    "@typescript-eslint/no-inferrable-types":0,
    'max-len': [0,1000,1000],
    "class-methods-use-this": 0,
    "@typescript-eslint/no-empty-function": 0,
    "import/prefer-default-export": 0,
    "@typescript-eslint/explicit-module-boundary-types":0
  },
};
