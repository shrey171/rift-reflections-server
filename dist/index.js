import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import {
  setPublicRoutes,
  checkAuth,
  errorHandler,
} from "./middlewares/index.js";
import { authRouter, deathNotesRouter } from "./routes/index.js";
import { setCustomResponseMethods } from "./utils/index.js";
import cors from "cors";
dotenv.config();
// Constants
const { PORT, MONGODB_URI, COOKIE_SECRET } = process.env;
const app = express();
const port = PORT || 3000;
// Middlewares
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));
app.use(morgan("dev"));
app.use(setCustomResponseMethods);
app.use(setPublicRoutes(["/auth"]));
app.use(checkAuth); // keep checkAuth after setPublicRoutes else every route will require auth
// Routes
app.use("/auth", authRouter);
app.use("/deathnotes", deathNotesRouter);
app.get("/champions", async (req, res) => {
  const data = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/champion.json"
  );
  const json = await data.json();
  res.json(json.data);
});
// Error Handler
app.use(errorHandler);
// Server
app.listen(port, () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      console.log(`[server]: Server running at http://localhost:${port}`);
    })
    .catch(error => {
      console.error("Failed to connect to MongoDB:", error);
    });
});
export default app;
//# sourceMappingURL=index.js.map
