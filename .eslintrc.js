module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: ['plugin:vue/essential', 'plugin:vue/recommended', 'standard'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {}
}
