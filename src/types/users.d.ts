import type { Role, User } from "@/prisma/client";

export type PublicUserInfo = Omit<User, "password">;

export type UserAuthData = Pick<User, "userName" | "password" | "role">;

export type UserTokenDecoded = {
  userName: string;
  userId: number;
  role: Role;
};
