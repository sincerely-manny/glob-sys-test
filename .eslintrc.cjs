module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'import'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        extraFileExtensions: ['.svelte'],
    },
    env: {
        browser: true,
        es2017: true,
        node: true,
    },
    rules: {
        'import/prefer-default-export': ['off'],
        quotes: ['error', 'single'],
        indent: ['error', 4],
        '@typescript-eslint/indent': ['error', 4],
        'no-plusplus': ['off'],
        'no-restricted-syntax': ['off'],
    },
};
