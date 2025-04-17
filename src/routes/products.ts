import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware";
import { getProducts } from "../handlers/products/get-products";
import { addProduct } from "../handlers/products/add-product";
import { upload } from "../middlewares/upload";
import { editProduct } from "../handlers/products/edit-product";
import { deleteProduct } from "../handlers/products/delete-product";
import { exportProductsCSV } from "../handlers/products/get-csv";


const productRouter = Router();

productRouter.get("/", authMiddleware, getProducts)

productRouter.get("/csv", authMiddleware, exportProductsCSV)

productRouter.post("/new", upload.single('image'), authMiddleware, addProduct)

productRouter.patch("/edit/:id", upload.single('image'), authMiddleware, editProduct)

productRouter.delete("/delete/:id", authMiddleware, deleteProduct)

export default productRouter