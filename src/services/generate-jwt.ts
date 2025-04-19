import jwt from "jsonwebtoken";
import { UserTokenDecoded } from "../types/jwt/user-token";

export const generateJWT = ({ username, userId }: UserTokenDecoded) => {
  if (process.env.JWT_SECRET) {
    return jwt.sign({ userId, username }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
  }
};
