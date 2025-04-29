import { Router } from "express";
import login from "@/controllers/auth/login";
import validateAuthToken from "@/middlewares/validate-auth-token";
import getUserData from "@/controllers/auth/get-user-data";
import verifyUserPassowrd from "@/middlewares/auth/verify-user-password";
import validateLogin from "@/validators/auth/login";
import register from "@/controllers/auth/register";
import { upload } from "@/middlewares/products/upload";
import validateRegister from "@/validators/auth/register";

const authRouter = Router();

authRouter.post("/login", validateLogin, verifyUserPassowrd, login);
authRouter.post(
  "/register",
  validateAuthToken,
  upload.single("image"),
  validateRegister,
  register
);
authRouter.get("/", validateAuthToken, getUserData);

export default authRouter;
