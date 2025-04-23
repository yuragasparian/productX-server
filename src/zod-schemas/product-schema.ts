import { ProductCategory } from "@prisma/client";
import { z } from "zod";

export const ProductFormSchema = z.object({
  name: z.string(),
  sku: z.coerce.number(),
  description: z.string(),
  price: z.coerce.number(),
  stockQuantity: z.coerce.number(),
  image: z.string(),
  creatorId: z.coerce.number(),
  category: z.nativeEnum(ProductCategory),
});
