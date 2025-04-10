import { Router } from "express";
import { authUser } from "../handlers/auth";
import authMiddleware from "../middlewares/auth-middleware";
import verifyUser from "../services/verify-user";
import identifyUser from "../handlers/identify-user";

const authRouter = Router();

authRouter.post("/login", authUser)
authRouter.get("/me", authMiddleware, identifyUser)

export default authRouter