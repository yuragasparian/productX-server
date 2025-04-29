import type { Response } from "express";
import type { AuthRequest } from "@/types/express/requests";
import jwt from "jsonwebtoken";
import { env } from "@/utils/env";
import successHandler from "@/handlers/success";

const login = (req: AuthRequest, res: Response) => {
  const { userName } = req.body;
  const { userId, role } = req;

  const token = jwt.sign({ userName, userId, role }, env.JWT_SECRET);

  successHandler(res, { item: token });
};

export default login;
