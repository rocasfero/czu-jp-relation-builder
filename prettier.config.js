/** @type {import('prettier').Options} */
module.exports = {
  printWidth: 100,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  overrides: [
    {
      files: '*.{md,yml}',
      options: {
        printWidth: 80,
        semi: true,
        singleQuote: false,
        trailingComma: 'none'
      }
    }
  ]
}
