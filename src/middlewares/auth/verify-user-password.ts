import bcrypt from "bcryptjs";
import type { NextFunction, Response } from "express";
import errorHandler from "@/handlers/error";
import type { AuthRequest } from "@/types/express/requests";
import prisma from "@/utils/prisma-client";

const verifyUserPassword = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { userName, password } = req.body;

  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { userName } });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error();
    }
    req.userId = user.id;
    req.role = user.role;
    next();
  } catch (err) {
    errorHandler(res, 4011);
  }
};

export default verifyUserPassword;
