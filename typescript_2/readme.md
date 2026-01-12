1️⃣ Install required packages
npm install --save-dev jest ts-jest @types/jest supertest @types/supertest

2️⃣ Initialize Jest for TypeScript
npx ts-jest config:init

3️⃣Update jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} \*/
module.exports = {
preset: "ts-jest",
testEnvironment: "node",
testMatch: ["**/tests/\*_/_.test.ts"],
clearMocks: true,
verbose: true,
};

4️⃣ Add test script in package.json
"scripts": {
"test": "jest",
"test:watch": "jest --watch"
}

5. npm test
