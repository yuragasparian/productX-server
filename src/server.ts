import "module-alias/register";

import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";

import productRouter from "@/routes/products";
import authRouter from "@/routes/auth";

import path from "path";
import { env } from "@/utils/env";

const app = express();

app.use(express.json());
// app.use(
//   cors({
//     // origin: env.ORIGIN_URL,
//   }),
// );
app.use(cors());
app.use(compression());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "uploads")));
app.use("/auth", authRouter);
app.use("/products", productRouter);

app.listen(env.PORT, () => {
  console.log("Server is running on", env.IP);
});
