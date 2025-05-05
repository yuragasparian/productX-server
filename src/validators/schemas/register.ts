import { zfd } from "zod-form-data";
import { z } from "zod";
import { Role } from "@/prisma/client";

const RoleEnum = z.enum([Role.Admin, Role.Moderator], { message: "4057" });

const registerUserSchema = zfd.formData({
  userName: zfd.text(
    z
      .string()
      .min(3, { message: "4050" })
      .max(20, { message: "4051" })
      .regex(/^[a-zA-Z0-9_]+$/, { message: "4052" })
  ),
  password: zfd.text(
    z
      .string()
      .min(8, { message: "4053" })
      .regex(/[A-Z]/, { message: "4054" })
      .regex(/[0-9]/, { message: "4055" })
      .regex(/[^A-Za-z0-9]/, { message: "4056" })
  ),
  role: zfd.text(RoleEnum),
});

export default registerUserSchema;
