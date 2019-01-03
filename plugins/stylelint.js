import { createFilter } from 'rollup-pluginutils';
import stylelint from 'stylelint';

export default ({ options = {}, files = '*.{html,css}', settings = {} }) => {
  if (!options.include) options.include = '**/*.{html,css}';
  if (!settings.formatter) settings.formatter = 'string';

  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'stylelint',

    async transform(code, id) {
      if (!filter(id)) return;

      return await stylelint
        .lint({ code, ...settings })
        .then(({ errored, output }) => {
          if (errored) throw Error(output);
        });
    },

    buildEnd: () =>
      stylelint.lint({ files, ...settings }).then(({ errored, output }) => {
        if (errored) throw Error(output);
      }),
  };
};
