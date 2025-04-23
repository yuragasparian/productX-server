import type { Request } from "express";
import type { UserAuthData } from "@/types/users";
import type { ProductFormData, StringProductFormData } from "@/types/products";
import { Product } from "@prisma/client";

export type AuthRequest = Request<{}, {}, UserAuthData>;

export type ProductAddRequest<T = StringProductFormData | ProductFormData> =
  Request<{}, {}, T>;

export interface ProductUpdateRequest
  extends Request<{ id: string }, {}, Partial<ProductFormData>> {
  parsedParams?: { id: number };
  existingProduct?: Product;
}
