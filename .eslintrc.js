module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    'func-call-spacing': 'off', // Fix for 'defineEmits'
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    curly: 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1
      },
      multiline: {
        max: 1
      }
    }]
  },
  settings: {
    'import/ignore': [
      '*vue-fontawesome*'
    ]
  }
}
