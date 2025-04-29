import z from "zod";

const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine((value) => value >= 0),
});

export default idParamSchema;
