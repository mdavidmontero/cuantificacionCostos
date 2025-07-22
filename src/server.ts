import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import authRouter from "./routes/authRoutes";
import materialRouter from "./routes/materialRoutes";
import productRouter from "./routes/productsRoutes";
import unitsRouter from "./routes/unitsRoutes";
import costsRouter from "./routes/costsRoutes";
import organizationRouter from "./routes/organizationRoutes";
import cors from "cors";
import { corsConfig } from "./config/cors";
dotenv.config();
const app = express();

app.use(cors(corsConfig));

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/organization", organizationRouter);
app.use("/api/material", materialRouter);
app.use("/api/product", productRouter);
app.use("/api/units", unitsRouter);
app.use("/api/costs", costsRouter);

export default app;
