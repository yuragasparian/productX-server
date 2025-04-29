import { AuthRequest } from "@/types/express/requests";
import { NextFunction, Response } from "express";
import registerSchema from "../schemas/register";
import errorHandler from "@/handlers/error";
import { ErrorCode, errorMessages } from "@/utils/error-messages";

const validateRegister = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    const firstError = result.error.errors[0];

    const code = Number(firstError.message) as ErrorCode;
    const message = errorMessages[code];

    if (isNaN(code) || !message) {
      return errorHandler(res, 4220); // Fallback: generic validation error
    }

    return errorHandler(res, code);
  } else {
    next();
  }
};

export default validateRegister;
