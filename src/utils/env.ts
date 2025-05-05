import { z } from "zod";

// Define your schema
const envSchema = z.object({
  // NODE_ENV: z.enum(["development", "production", "test"]),
  IP: z.string().min(1),
  PORT: z.string().default("8080"),
  ORIGIN_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(1),
});

// Parse and validate environment variables
const parsedEnv = envSchema.safeParse(process.env);

// Log the errors in a detailed manner
if (!parsedEnv.success) {
  const errors = parsedEnv.error.flatten().fieldErrors;

  console.error("❌ Invalid environment variables:");

  // Loop through each error and log what failed validation along with the value
  for (const [key, errorMessages] of Object.entries(errors)) {
    if (errorMessages.length > 0) {
      console.error(
        `- ${key} (value: "${process.env[key]}"): ${errorMessages.join(", ")}`
      );
    }
  }

  process.exit(1); // Exit the server
}

export const env = parsedEnv.data;
