import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware";
import { getProducts } from "../handlers/products/get-products";
import { addProduct } from "../handlers/products/add-product";
import multer from "multer";
import { upload } from "../middlewares/upload";


const productRouter = Router();

productRouter.get("/", authMiddleware, getProducts)

productRouter.post("/new", upload.single('image'), authMiddleware, addProduct)

export default productRouter