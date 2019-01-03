import { createFilter } from 'rollup-pluginutils';
import { readFile, writeFile } from 'fs';
import postcssrc from 'postcss-load-config';
import postcss from 'postcss';
import syntax from 'postcss-syntax';

export default ({ options = {}, ctx = {}, paths = [] }) => {
  if (!options.include) options.include = '**/*.{html,css}';

  const filter = createFilter(options.include, options.exclude);

  ctx.lang = syntax;

  return {
    name: 'postcss',

    async transform(code, id) {
      if (!filter(id)) return;

      return await postcssrc(ctx).then(({ plugins, options }) => {
        options.from = id;

        return postcss(plugins)
          .process(code, options)
          .then(({ css }) => ({
            code: `export default ${JSON.stringify(css)};`,
          }));
      });
    },

    buildEnd: () =>
      paths.forEach(({ from, to }) =>
        readFile(from, (err, css) =>
          postcssrc(ctx).then(({ plugins, options }) => {
            options.from = from;
            options.to = to;

            return postcss(plugins)
              .process(css, options)
              .then(({ css }) => writeFile(to, css, () => true));
          }),
        ),
      ),
  };
};
