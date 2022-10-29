module.exports = {
   env: {
      browser: true,
      es2021: true
   },
   extends: ['plugin:react/recommended', 'standard', 'prettier'],
   parserOptions: {
      ecmaFeatures: {
         jsx: true
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
   },
   plugins: ['react'],
   rules: {
      indent: [
         0,
         3
      ],
      semi: [2, 'always'],
      'comma-dangle': ['error', 'never'],
      'space-before-function-paren': [
         'error',
         { anonymous: 'always', named: 'never' }
      ]
   }
};
