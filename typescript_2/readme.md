https://medium.com/@rachealkuranchie/how-to-build-a-crud-api-with-express-js-and-typescript-21c7c66e5296

packages to install
+++++++++++++++++++
npm install cors dotenv express express-validator helmet mongoose @types/cors @types/dotenv @types/helmet @types/mongoose

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
