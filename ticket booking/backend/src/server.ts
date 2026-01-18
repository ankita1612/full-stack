import express,{ Request, Response,NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config()

import dbConnect from './config/db.config'
dbConnect()

import router from './routes/post.route'
import eventRouter from './routes/event.route'
import clockinRouter from './routes/clockin.route'

import helmet from "helmet";
import cors from "cors";

const app = express()

app.use(cors());
app.use(helmet());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/v1/posts', router)
app.use('/api/v1/events', eventRouter)
app.use('/api/v1/clockin', clockinRouter)


app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    data: err.stack,
  });
});

let server;
const PORT = process.env.PORT || 3000;
  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  // process handlers
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  if (server) {
    server.close(() => process.exit(0));
  } else {
    process.exit(0);
  }
});