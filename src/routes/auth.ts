import { Router } from "express";
import auth from "@/controllers/auth/auth";
import validateAuthToken from "@/middlewares/validate-auth-token";
import getUserData from "@/controllers/auth/get-user-data";
import verifyUserPassowrd from "@/middlewares/auth/verify-user-password";

const authRouter = Router();

authRouter.post("/login", verifyUserPassowrd, auth);
authRouter.get("/", validateAuthToken, getUserData);

export default authRouter;
