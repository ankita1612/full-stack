import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.config";
import postRouter from "./routes/post.route";
import authRouter from "./routes/auth.route";
import employeeRouter from "./routes/employee.route";
import errorHandler from "./middleware/error.handler";


import helmet from "helmet";
import cors from "cors";
import { Request, Response, NextFunction } from 'express'
import path from "path"
const app = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/employees", employeeRouter);

app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(path.join(__dirname, '..', 'uploads')));

//page not found
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});


app.use(errorHandler);

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