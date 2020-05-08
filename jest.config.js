module.exports = {
    globals: {
      'ts-jest': {
        tsConfig: 'tsconfig.json'
      }
    },
    moduleFileExtensions: ['js','ts'],
    testPathIgnorePatterns: ['/node_modules/'],
    preset: 'ts-jest',
  }
  