module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      configFile: './.babelrc',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  plugins: ['prettier', 'react-hooks'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    expect: true,
  },
  rules: {
    'prettier/prettier': ['error'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'no-console': 'error',
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'no-undef': 'error',
    'import/newline-after-import': 2,
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
      },
    ],
  },
};
