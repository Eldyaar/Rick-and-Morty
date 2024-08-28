import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
   collectCoverage: true,
   collectCoverageFrom: ['src/**/*.{ts, tsx}'],
   coverageDirectory: 'coverage',
   testEnvironment: 'jsdom',
   setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
   transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
   },
   moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
   testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
   moduleNameMapper: {
      '^.+\\.(css|scss)$': 'identity-obj-proxy',
   },
}

export default config