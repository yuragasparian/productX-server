import { ProductCategory } from "@prisma/client";
import z from "zod";
import { zfd } from "zod-form-data";

const productAddSchema = zfd.formData({
  name: zfd.text(z.string()),
  sku: zfd.numeric(z.number().int().min(0)),
  price: zfd.numeric(z.number().int().min(0)),
  stockQuantity: zfd.numeric(z.number().int().min(0)),
  category: zfd.text(z.nativeEnum(ProductCategory)),
  description: zfd.text(z.string().min(1).max(500)),
});

export default productAddSchema;
