import express from "express";
import dotenv from "dotenv";
dotenv.config();
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import { Request, Response, NextFunction } from 'express'
import path from "path"
import http from "http";

import connectDB from "./config/db.config";
import errorHandler from "./middlewares/error.handler";
import  ApiError  from "./utils/api.error";
import adminRouter from "./routes/admin.route";
import authRouter from "./routes/auth.route";

const app = express();




app.use(cors({origin: process.env.FRONTEND_URL,credentials: true,})); //Allows browser to send secure credentials with request
//credentials: true => if you are passing cookie from frontend
app.use(helmet({crossOriginResourcePolicy: false,}));
app.use(rateLimit({windowMs: 15 * 60 * 1000,max: 100,}));//One IP can only make 100 requests every 15 minutes.
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);


//page not found
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError("Page not found", 404));
});

app.use(errorHandler);

let server: http.Server | undefined;
const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
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