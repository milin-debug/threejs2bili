module.exports = {
    root: true,
    env: {
      node: true
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
      '@vue/typescript/recommended',
      'plugin:prettier/recommended'
    ],
    parserOptions: {
      ecmaVersion: 2020
    },
    rules: {
      '@typescript-eslint/no-explicit-any': ['off'],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/multi-word-component-names': 'off',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
          endOfLine: 'auto',
          trailingComma: 'none'
        }
      ],
      'vue/no-unused-components': 'off',
      '@typescript-eslint/no-var-requires': 'off'
    },
    globals: {
      defineProps: 'readonly',
      defineEmits: 'readonly',
      defineExpose: 'readonly',
      withDefaults: 'readonly'
    }
  }
  