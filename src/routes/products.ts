import { Router } from "express";
import { getProducts } from "../handlers/products/get-products";
import { addProduct } from "../handlers/products/add-product";
import { upload } from "../middlewares/upload";
import { editProduct } from "../handlers/products/edit-product";
import { deleteProduct } from "../handlers/products/delete-product";
import { exportProductsCSV } from "../handlers/products/get-csv";

const productRouter = Router();

productRouter.get("/", getProducts);

productRouter.get("/csv", exportProductsCSV);

productRouter.post("/", upload.single("image"), addProduct);

productRouter.put("/:id", upload.single("image"), editProduct);

productRouter.delete("/:id", deleteProduct);

export default productRouter;
