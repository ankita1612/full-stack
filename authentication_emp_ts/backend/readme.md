https://medium.com/@rachealkuranchie/how-to-build-a-crud-api-with-express-js-and-typescript-21c7c66e5296

packages to install
+++++++++++++++++++
npm init -y

npm install cors dotenv express express-validator helmet mongoose @types/cors @types/dotenv @types/helmet @types/mongoose

npm i express-rate-limit

///npm install bcrypt @types/bcrypt

npm install cookie-parser @types/cookie-parser // if refresh token then only

npm install jsonwebtoken @types/jsonwebtoken

npm install multer @types/multer

npm install typescript ts-node @types/node @types/express

npx tsc --init

To Run typescript in dev
+++++++++++++++++++++++++++++++++++++
npx ts-node-dev src/server.ts

Notes : npx ts-node-dev runs your TypeScript Node app directly and restarts it automatically when files change — perfect for development, never for production.

++++++++++++++++++++++++++++++
in production
++++++++++++++++++++
1)To make build : npx tsc
2)it create dist folder in root
3)node dist/server.js to run application

++++++++++++++++++++++jest+++++++++++++++++

1.  npm install -D jest ts-jest @types/jest
    npm install mongodb-memory-server
2.  tsconfig.json File data
    {
    "compilerOptions": {
    "types": ["node", "jest"]
    }
    }
3.  run : npx ts-jest config:init
    jest.config.ts file data
    import type { Config } from 'jest';

        const config: Config = {
          preset: 'ts-jest',
          testEnvironment: 'node',
          testPathIgnorePatterns: ['/node_modules/', '/dist/'],
        };

        export default config;

4.  Add test script in package.json
    {
    "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
    }
    }
5.  Create your first test.Example project structure
    src/
    ├─ user.service.ts
    └─ user.service.test.ts
6.  Run all test : npm test
    Run only specific file:npx jest post.service.test.ts
