import { Router } from "express";
import { getProducts } from "../handlers/products";
import authMiddleware from "../middlewares/auth-middleware";

const productRouter = Router();

productRouter.get("/", authMiddleware, getProducts)

export default productRouter