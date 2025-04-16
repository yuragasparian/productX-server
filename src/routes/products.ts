import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware";
import { getProducts } from "../handlers/products/get-products";
import { addProduct } from "../handlers/products/add-product";
import { upload } from "../middlewares/upload";
import { editProduct } from "../handlers/products/edit-product";


const productRouter = Router();

productRouter.get("/", authMiddleware, getProducts)

productRouter.post("/new", upload.single('image'), authMiddleware, addProduct)

productRouter.patch("/edit/:id", upload.single('image'), authMiddleware, editProduct)

export default productRouter