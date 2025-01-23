/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

// /** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true, // Optional: Enable verbose output
  collectCoverage: true, // Optional: Enable coverage reports
  setupFilesAfterEnv: ["<rootDir>/test/jest-setup.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json", // Path to your Jest-specific tsconfig
      diagnostics: {
        warnOnly: true, // Optional: Show warnings instead of errors for TypeScript diagnostics
      },
    },
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;

// const conf = {
//   preset: "ts-jest",
//   globals: {
//     "ts-jest": {
//       tsconfig: "tsconfig.test.json", // Path to your Jest-specific tsconfig
//     },
//   },
//   testEnvironment: "node",
// };

// export default conf;
