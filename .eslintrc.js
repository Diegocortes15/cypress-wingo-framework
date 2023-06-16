export default {
  'plugins': ['cypress'],
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': ['google', 'plugin:chai-friendly/recommended'],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
    'max-len': [
      'error',
      {
        'ignoreComments': true,
        // ignoreTrailingComments: true,
        // ignoreUrls: true,
        // ignoreStrings: true,
        // ignoreTemplateLiterals: true,
        // ignoreRegExpLiterals: true,
      },
    ],
    'quotes': ['error', 'single'],
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'warn',
    'no-unused-vars': 'warn',
    'require-jsdoc': 'warn',
  },
};
