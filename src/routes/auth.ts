import { Router } from "express";
import { authUser } from "../handlers/auth";
import authMiddleware from "../middlewares/auth-middleware";
import userInfo from "../handlers/user-info";

const authRouter = Router();

authRouter.post("/login", authUser);

authRouter.get("/me", authMiddleware, userInfo);

export default authRouter;
