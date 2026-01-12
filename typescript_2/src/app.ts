import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import router from "./routes/post.route";

const app = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/posts", router);

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    data: [],
  });
});

export default app;
