import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import authRouter from "./routes/authRoutes";
import cors from "cors";
import { corsConfig } from "./config/cors";
dotenv.config();
const app = express();

app.use(cors(corsConfig));

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/auth", authRouter);

export default app;
