import type { Response } from "express";
import type { AuthRequest } from "@/types/express/requests";
import jwt from "jsonwebtoken";
import { env } from "@/utils/env";
import successHandler from "../../handlers/success";
import type { AuthResponse } from "@/types/express/response";

const auth = (req: AuthRequest, res: Response) => {
  const { userName } = req.body;
  const { userId } = req;

  const token = jwt.sign({ userName, userId }, env.JWT_SECRET);

  successHandler<AuthResponse>(res, { token });
};

export default auth;
