module.exports = ({ production, lang }) => ({
  syntax: lang({
    rules: [
      {
        test: /\.html$/i,
        extract: 'html',
      },
    ],
  }),
  plugins: {
    'postcss-preset-env': {
      stage: 0,
      features: {
        'nesting-rules': {},
      },
      autoprefixer: production && {},
    },
    cssnano: production && {},
  },
});
