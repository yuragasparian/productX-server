import express, { json, raw, urlencoded } from "express"
import cors from "cors"
import http, { get } from "http"
import compression from "compression"
import cookieParser from "cookie-parser"

import productRouter from "./routes/products"
import authRouter from "./routes/auth"

import dotenv from "dotenv"
import path, { join, resolve } from "path"
import fs, { existsSync } from 'fs';

dotenv.config()
const ORIGIN_URL = process.env.ORIGIN_URL

const app = express()

app.use(express.json());
app.use(cors(
    {
        origin: ORIGIN_URL,
        credentials: true,
    }
))
app.use(compression())
app.use(cookieParser())

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
    console.log("Server is running on", process.env.APP_URL);
})

// app.use(express.static('public'))

app.use("/products", productRouter)

app.use("/auth", authRouter)

app.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, 'uploads', filename);
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

