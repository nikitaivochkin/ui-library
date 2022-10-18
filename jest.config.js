module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '.(css|less|scss)$': 'identity-obj-proxy',
    '\\.svg': '<rootDir>/src/__mocks__/svgMock.js',
  },
};
