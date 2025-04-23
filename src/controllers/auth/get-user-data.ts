import errorHandler from "@/handlers/error";
import successHandler from "@/handlers/success";
import prisma from "@/utils/prisma-client";
import type { Request, Response } from "express";

const getUserData = async (req: Request, res: Response) => {
  const { userId } = req;

  //using try for case when user profile has been removed but he still has token
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: { id: userId },
      // not including sensitive data
      select: {
        id: true,
        userName: true,
        image: true,
      },
    });
    successHandler(res, user);
  } catch {
    errorHandler(res, 4010);
  }
};

export default getUserData;
