import type { Response } from "express";
import type { AuthRequest } from "@/types/express/requests";
import jwt from "jsonwebtoken";
import { env } from "@/utils/env";
import successHandler from "../../handlers/success";

const login = (req: AuthRequest, res: Response) => {
  const { userName } = req.body;
  const { userId } = req;

  const token = jwt.sign({ userName, userId }, env.JWT_SECRET);

  successHandler(res, token);
};

export default login;
