// jest.config.js
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest/setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native'
      + '|@react-native'
      + '|@react-navigation'
      + '|@react-native-community'
      + '|react-native-reanimated'
      + '|react-native-vector-icons'
      + '|@react-native-picker'
      + '|nativewind'
    + ')/'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: [
    '**/__tests__/**/*.test.ts?(x)',
    '**/?(*.)+(spec|test).ts?(x)',
  ],
  testEnvironment: 'node', // You can change to 'jsdom' if you're rendering web-like components
  moduleNameMapper: {
     "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
};