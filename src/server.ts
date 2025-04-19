import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";

import productRouter from "./routes/products";
import authRouter from "./routes/auth";

import path from "path";
import { env } from "./services/env";
import authMiddleware from "./middlewares/auth-middleware";

const app = express();

app.use(express.json());
app.use(
  cors({
    // origin: env.ORIGIN_URL,
  }),
);
app.use(compression());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "uploads")));

app.use("/products", authMiddleware, productRouter);

app.use("/auth", authRouter);

app.listen(env.PORT, () => {
  console.log("Server is running on", env.APP_URL);
});
