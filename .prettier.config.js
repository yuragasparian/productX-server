const isCI = process.env.CI === 'true';

module.exports = {
  semi: true,
  singleQuote: true,
  printWidth: isCI ? 80 : 100,
};
