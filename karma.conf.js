module.exports = function (config) {
  config.set({

    files: [
      'src/**/*.spec.ts',
    ],

    exclude: [
      'src/**/*.mock.ts',
      'src/**/*.validators.ts',
      'src/**/*.directive.ts',
      'src/app/core/helpers'
    ],

  });
};
