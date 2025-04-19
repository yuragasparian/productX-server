import { z } from "zod";

const envSchema = z.object({
  //   NODE_ENV: z.enum(["development", "production", "test"]),
  IP: z.string().min(1),
  PORT: z.string().default("3030"),
  APP_URL: z.string().url(),
  ORIGIN_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(1),
});

// Parse and validate
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsedEnv.error.flatten().fieldErrors,
  );
  process.exit(1); // Exit the server
}

export const env = parsedEnv.data;
