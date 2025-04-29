import type { Response } from "express";
import type { AuthRequest } from "@/types/express/requests";
import successHandler from "../../handlers/success";
import prisma from "@/utils/prisma-client";
import { Prisma } from "@prisma/client";
import errorHandler from "@/handlers/error";
import createHashedPassword from "@/utils/create-hashed-password";

const register = async (req: AuthRequest, res: Response) => {
  const { userName, password, role } = req.body;
  const image = req.file?.filename || "no-user.jpg";
  const hashedPass = await createHashedPassword(password);
  try {
    const newUser = await prisma.user.create({
      data: { userName, password: hashedPass, image, role },
      select: {
        id: true,
        userName: true,
        image: true,
      },
    });
    successHandler(res, { item: { newUser } });
  } catch (err) {
    // hndling unique username error
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        errorHandler(res, 4090);
      }
    }
    console.log(err);

    errorHandler(res, 5000);
  }
};

export default register;
