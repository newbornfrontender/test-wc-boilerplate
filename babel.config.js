if (!process.env.ROLLUP_WATCH) process.env.BABEL_ENV = 'production';

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        targets: {
          esmodules: true,
        },
      },
    ],
  ],
  // minified: true,
  env: {
    production: {
      presets: ['minify'],
    },
  },
};
