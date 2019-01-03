import resolve from 'rollup-plugin-node-resolve';
import { sync as rimraf } from 'rimraf';

import stylelint from './plugins/stylelint';
import postcss from './plugins/postcss';
import babel from './plugins/babel';

const production = !process.env.ROLLUP_WATCH;

rimraf('public/*.{html,css,js}');

export default {
  input: 'components/index.js',
  output: {
    format: 'esm',
    dir: 'public',
  },
  plugins: [
    resolve({
      jsnext: true,
      browser: true,
      modulesOnly: true,
    }),
    stylelint({}),
    postcss({
      ctx: { production },
      paths: [
        {
          from: 'index.html',
          to: 'public/index.html',
        },
      ],
    }),
    babel(),
  ],
};
