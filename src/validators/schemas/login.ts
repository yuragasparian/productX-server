import z from "zod";

const loginSchema = z.object({
  userName: z.string().min(4),
  password: z.string().min(6),
});
export default loginSchema;
