import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import errorHandler from "@/handlers/error";
import { env } from "@/utils/env";
import type { AuthRequest } from "@/types/express/requests";
import type { UserTokenDecoded } from "@/types/users";

const validateAuthToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorHandler(res, 4010);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as UserTokenDecoded;

    if (!decoded?.userId) {
      return errorHandler(res, 4010);
    }

    req.userId = decoded.userId;
    next();
  } catch {
    return errorHandler(res, 4010);
  }
};

export default validateAuthToken;
