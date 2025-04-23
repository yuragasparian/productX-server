import errorHandler from "@/handlers/error";
import type { Response, NextFunction, Request } from "express";
import { z } from "zod";

const parseProductForm = (req: Request, res: Response, next: NextFunction) => {
  const allNumericFields = ["sku", "price", "stockQuantity"];

  //parsing only needed fields on edit request
  const fieldsToParse =
    req.method === "PUT"
      ? allNumericFields.filter((key) => req.body?.[key] !== undefined)
      : allNumericFields;

  try {
    fieldsToParse.forEach((field) => {
      req.body[field] = z.coerce
        .number()
        .int()
        .positive()
        .parse(req.body[field]);
    });
    next();
  } catch (err) {
    errorHandler(res, 4220);
  }
};

export default parseProductForm;
