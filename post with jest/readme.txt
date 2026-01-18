1)
npm install express mongoose
npm install -D typescript ts-node-dev @types/node @types/express
npm install -D jest ts-jest @types/jest
npm install -D mongodb-memory-server
2)
tsconfig.json File data
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "types": ["node", "jest"]
  }
}
3)run : npx ts-jest config:init
jest.config.ts file data
    import type { Config } from 'jest';

    const config: Config = {
      preset: 'ts-jest',
      testEnvironment: 'node',
      testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    };

    export default config;

Run all test : npm test
Run only specific file:npx jest post.service.test.ts
