import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import errorHandler from "@/handlers/error";
import { ProductUpdateRequest } from "@/types/express/requests";

const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine((value) => value >= 0, {
      message: "ID must be a non-negative integer",
    }),
});

const validateIdParam = () => [
  (req: ProductUpdateRequest, res: Response, next: NextFunction) => {
    const result = idParamSchema.safeParse(req.params);

    if (!result.success) {
      return errorHandler(res, 4012);
    } else {
      req.parsedParams = { id: result.data.id };
      next();
    }
  },
];

export default validateIdParam;
