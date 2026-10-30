import studio from '@sanity/eslint-config-studio'

export default [
    { ignores: ['dist/', '.sanity/'] },
    ...studio,
    { files: ['postcss.config.js'], languageOptions: { sourceType: 'commonjs' } },
]
