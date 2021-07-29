process.env.TZ = 'America/Guayaquil'
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    roots: ['<rootDir>'],
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
    testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    moduleDirectories: ['node_modules', 'test/utils'],
    testEnvironment: 'jsdom',
}
