/** @type {import('prettier').Config} */
export default {
  printWidth: 120,
  singleQuote: true,
  proseWrap: 'never',
  overrides: [
    {
      files: '**/*.json',
      options: {
        parser: 'json-stringify',
      },
    },
    {
      files: ['.vscode/*.json', '**/tsconfig.json'],
      options: {
        parser: 'jsonc',
      },
    },
  ],
};
