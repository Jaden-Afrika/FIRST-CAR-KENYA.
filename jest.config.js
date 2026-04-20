module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/*.test.js', '<rootDir>/**/*.spec.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    '**/*.js',
    '!node_modules/**',
    '!jest.config.js',
  ],
};
