import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { authRoutes } from "routes";
import { setCustomResponseMethods } from "utils";
import { errorHandler } from "middlewares";
dotenv.config();

// Constants
const { PORT, MONGODB_URI, COOKIE_SECRET } = process.env;
const app: Express = express();
const port = PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));
app.use(morgan("dev"));
app.use(setCustomResponseMethods)

// Routes
app.use("/auth", authRoutes);

// Error Handler
app.use(errorHandler);

// Server
app.listen(port, () => {
  mongoose.connect(MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
  }).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
  console.log(`[server]: Server running at http://localhost:${port}`);
});