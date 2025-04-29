import { AuthRequest } from "@/types/express/requests";
import { NextFunction, Response } from "express";
import loginSchema from "../schemas/login";
import errorHandler from "@/handlers/error";

const validateLogin = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch {
    errorHandler(res, 4002);
  }
};

export default validateLogin;
