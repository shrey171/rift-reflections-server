var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { authRouter, deathNotesRouter } from "routes";
import { setCustomResponseMethods } from "utils";
import { checkAuth, errorHandler, setPublicRoutes } from "middlewares";
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
app.get("/champions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch("https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/champion.json");
    const json = yield data.json();
    res.json(json.data);
}));
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
//# sourceMappingURL=index.js.map