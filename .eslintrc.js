module.exports = {
   env: {
      browser: true,
      es2021: true
   },
   extends: ['plugin:react/recommended', 'standard'],
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
            ignoredNodes: ['ArrayExpression']
         }
      ],
      semi: [2, 'always'],
      'comma-dangle': ['error', 'never'],
      'space-before-function-paren': ['error', 'never']
   }
};
