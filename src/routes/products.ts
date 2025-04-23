import { Router } from "express";
import { getProducts } from "@/controllers/products/get-products";
import addProduct from "@/controllers/products/add-product";
import { upload } from "@/middlewares/products/upload";
import editProduct from "@/controllers/products/edit-product";
import deleteProduct from "@/controllers/products/delete-product";
import { exportProductsCSV } from "@/controllers/products/get-csv";
import validateAuthToken from "@/middlewares/validate-auth-token";
import parseFormValues from "@/middlewares/products/parse-form-values";
import validateIdParam from "@/middlewares/products/validate-id-param";
import verifyProductOwnership from "@/middlewares/products/verify-product-ownership";

const productRouter = Router();
productRouter.use(validateAuthToken);

productRouter.get("/", getProducts);
productRouter.post("/", upload.single("image"), parseFormValues, addProduct);

productRouter.get("/csv", exportProductsCSV);

productRouter.put(
  "/:id",
  validateIdParam,
  verifyProductOwnership,
  upload.single("image"),
  parseFormValues,
  editProduct
);
productRouter.delete(
  "/:id",
  validateIdParam,
  verifyProductOwnership,
  deleteProduct
);

export default productRouter;
