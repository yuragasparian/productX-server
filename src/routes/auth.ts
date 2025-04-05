import { Router } from "express";
import { authUser } from "../handlers/auth";

const authRouter = Router();

authRouter.post("/", authUser)

export default authRouter