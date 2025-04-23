import type { User } from "@prisma/client";

export type PublicUserInfo = Omit<User, "password">;

export type UserAuthData = Pick<User, "userName" | "password">;

export type UserTokenDecoded = {
  userName: string;
  userId: number;
};
