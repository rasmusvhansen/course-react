module.exports = {
  extends: 'airbnb-typescript-prettier',
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.spec.{ts,tsx}', '**/*.config.{ts,js}', '*.config.{ts,js}', 'tailwind.config.js'] }
    ],
    'import/prefer-default-export': 0,
    'import/no-relative-packages': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'import/no-unresolved': 0,
    'no-restricted-globals': ['error', 'event', 'fdescribe'],
    'react/prop-types': 'off', // Since we do not use prop-types
    'react/require-default-props': 'off', // Since we do not use prop-types,
    'no-plusplus': 0,
    'no-useless-constructor': 0,
    'react/react-in-jsx-scope': 0
  }
};
