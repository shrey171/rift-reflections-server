import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { setPublicRoutes, checkAuth, errorHandler } from "./middlewares";
import { authRouter, deathNotesRouter } from "./routes";
import { setCustomResponseMethods } from "./utils";
dotenv.config();
// Constants
const { PORT, MONGODB_URI, COOKIE_SECRET } = process.env;
const app = express();
const port = PORT || 3000;
// Middlewares
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
    const data = await fetch("https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/champion.json");
    const json = await data.json();
    res.json(json.data);
});
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
export default app;
//# sourceMappingURL=index.js.map