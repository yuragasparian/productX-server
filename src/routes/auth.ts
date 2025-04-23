import { Router } from "express";
import login from "@/controllers/auth/login";
import validateAuthToken from "@/middlewares/validate-auth-token";
import getUserData from "@/controllers/auth/get-user-data";
import verifyUserPassowrd from "@/middlewares/auth/verify-user-password";

const authRouter = Router();

authRouter.post("/login", verifyUserPassowrd, login);
authRouter.post("/register", verifyUserPassowrd, login);
authRouter.get("/", validateAuthToken, getUserData);

export default authRouter;
