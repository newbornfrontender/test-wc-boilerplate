import { createFilter } from 'rollup-pluginutils';

export default (options = {}) => {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'string',

    transform(code, id) {
      if (!filter(id)) return;

      return {
        code: `export default ${JSON.stringify(code)};`,
      };
    },
  };
};
