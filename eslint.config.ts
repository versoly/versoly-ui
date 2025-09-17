import { combine, javascript, typescript, prettier } from '@kainstar/eslint-config';

export default combine(
  javascript(),
  typescript({
    overrides: {
      'ts/ban-ts-comment': 'off',
    },
  }),
  prettier(true),
);
