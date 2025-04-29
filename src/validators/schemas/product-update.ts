import { ProductCategory } from "@prisma/client";
import z from "zod";
import { zfd } from "zod-form-data";

const productUpdateSchema = zfd.formData({
  name: zfd.text(z.string()).optional(),
  sku: zfd.numeric(z.number().int().min(0)).optional(),
  price: zfd.numeric(z.number().int().min(0)).optional(),
  stockQuantity: zfd.numeric(z.number().int().min(0)).optional(),
  category: zfd.text(z.nativeEnum(ProductCategory)).optional(),
  description: zfd.text(z.string().min(1).max(500)).optional(),
});

export default productUpdateSchema;
