import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import config from "./config";
import { notFoundHandler } from "./middlewares/not-found";
import { globalErrorHandler } from "./middlewares/global-error";
import authRoutes from "./modules/auth/auth.routes";
import serviceRoutes from "./modules/service/service.routes";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 1. All your actual API Routes go here
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// 1. All your actual API Routes go here
app.use("/api/auth", authRoutes);
app.use("/api/service", serviceRoutes);

// 2. ⚠️ THE NOT FOUND MIDDLEWARE (Catches anything that didn't match above)
app.use(notFoundHandler);

// 3. Global Error Handler (Catches server crashes/thrown errors)
app.use(globalErrorHandler);

export default app;
