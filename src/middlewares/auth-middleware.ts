import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import {UserTokenDecoded} from "../types/jwt/user-token"
const jwtSecret = process.env.JWT_SECRET;

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!jwtSecret) {
    throw new Error("JWT_SECRET not defined in environment variables.");
  }

  const token:string = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Token not provided" });
    return
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as UserTokenDecoded;
    req.userId = decoded.userId
    console.log('Decoded user ID:', decoded.userId);
    console.log('Attached to req.userId:', req.userId);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
    return
  }
};

export default authMiddleware;
