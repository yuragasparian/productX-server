import type { Response } from "express";
import type { AuthRequest } from "@/types/express/requests";
import jwt from "jsonwebtoken";
import { env } from "@/utils/env";
import successHandler from "../../handlers/success";
import prisma from "@/utils/prisma-client";
import { Prisma } from "@prisma/client";
import errorHandler from "@/handlers/error";

const register = async (req: AuthRequest, res: Response) => {
  const { userName, password } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: { userName, password, image: "no-user.jpg" },
    });
    const userId = newUser.id;
    const token = jwt.sign({ userName, userId }, env.JWT_SECRET);
    successHandler(res, { item: token });
  } catch (err) {
    // hndling unique username error
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        errorHandler(res, 4091);
      }
    }
    errorHandler(res, 5000);
  }
};

export default register;
