module.exports = {
  env: {
    node: true
  },
  extends: 'standard-with-typescript',

  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['import',
    'n',
    'promise'
  ],
  rules: {
  }
}
