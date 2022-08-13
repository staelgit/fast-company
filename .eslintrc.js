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
         'error',
         3,
         {
            ignoredNodes: ['ConditionalExpression *']
         }
      ],
      semi: [2, 'always'],
      'comma-dangle': ['error', 'never'],
      'space-before-function-paren': ['error', 'never']
   }
};
