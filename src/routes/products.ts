import { Router } from "express";
import { getProducts } from "@/controllers/products/get-products";
import addProduct from "@/controllers/products/add-product";
import { upload } from "@/middlewares/products/upload";
import editProduct from "@/controllers/products/edit-product";
import deleteProduct from "@/controllers/products/delete-product";
import { exportProductsCSV } from "@/controllers/products/get-csv";
import validateAuthToken from "@/middlewares/validate-auth-token";
import verifyProductOwnership from "@/middlewares/products/verify-product-ownership";
import validateProductAdd from "@/validators/products/add";
import validateProductEdit from "@/validators/products/edit";
import validateIdParam from "@/validators/products/product-id";

const productRouter = Router();
productRouter.use(validateAuthToken);

productRouter.get("/", getProducts);
productRouter.post("/", upload.single("image"), validateProductAdd, addProduct);

productRouter.get("/csv", exportProductsCSV);

productRouter.put(
  "/:id",
  validateIdParam(),
  verifyProductOwnership,
  upload.single("image"),
  validateProductEdit,
  editProduct
);
productRouter.delete(
  "/:id",
  validateIdParam(),
  verifyProductOwnership,
  deleteProduct
);

export default productRouter;
