import { Config } from '@jest/types';

export default {
	preset: 'ts-jest',
	clearMocks: true,
	coverageDirectory: 'coverage',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'js', 'json'],
	moduleDirectories: ['node_modules', 'src'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	transform: {
		'ts-jest': [
			'ts-jest',
			{
				tsconfig: './jest.config.ts',
			},
		],
	},
} as Config.InitialOptions;
