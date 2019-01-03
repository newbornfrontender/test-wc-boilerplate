import { transform } from '@babel/core';

export default () => ({
  name: 'babel',

  transform(source, id) {
    const { code } = transform(source, {
      filename: id,

      caller: {
        name: 'rollup',
        supportsStaticESM: true,
        supportsDynamicImport: true,
      },
    });

    return {
      code,
    };
  },
});
