module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['plugin:vue/recommended', 'standard'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'vue/no-unused-properties': ['error', {
      groups: ['props', 'data', 'computed', 'methods']
    }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: true,
      ignores: []
    }],
    'vue/html-comment-indent': ['error', 2]
  }
}
