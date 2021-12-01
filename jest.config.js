/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/test/tsconfig.test.json",
    },
  },
  testEnvironment: "node",
};
