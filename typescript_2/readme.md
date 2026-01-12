https://medium.com/@rachealkuranchie/how-to-build-a-crud-api-with-express-js-and-typescript-21c7c66e5296

packages
+++++++++++++++++++
npm install cors dotenv express express-validator helmet mongoose @types/cors @types/dotenv @types/helmet @types/mongoose

To Run typescript
+++++++++++++++++++++++++++++++++++++
npx ts-node-dev src/server.ts

Notes : npx ts-node-dev runs your TypeScript Node app directly and restarts it automatically when files change — perfect for development, never for production.

++++++++++++++++++++++++++++++
in production
++++++++++++++++++++
npx tsc
node dist/server.js

{
"scripts": {
"dev": "ts-node-dev --respawn --transpile-only src/server.ts",
"build": "tsc",
"start": "node dist/server.js"
}
}
