import type { NextFunction, Response } from "express";
import errorHandler from "@/handlers/error";
import type { AuthRequest } from "@/types/express/requests";
import { Role } from "@/prisma/client";

const verifyRoleAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { role } = req;
  if (role !== Role.Admin) {
    return errorHandler(res, 4043);
  }
  next();
};
