import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserTokenDecoded } from "../types/jwt/user-token";

const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!jwtSecret) {
    throw new Error("JWT_SECRET not defined in environment variables.");
  }

  const token: string | undefined = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token not provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as UserTokenDecoded;
    req.userId = decoded.userId;

    if (!req.userId) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};

export default authMiddleware;
