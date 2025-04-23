import type { Response } from "express";
import type { ErrorResponse } from "@/types/express/response";

const errorMessages = {
  4001: "Missing required fields for product",

  4010: "Unauthorized",
  4011: "Invalid username or password",

  4220: "One or more fields contain invalid data",

  4040: "Not found",
  4041: "Product not found",

  4090: "Username already exists",
  4091: "Product SKU must be unique",

  5000: "Internal server error",
} as const;

type ErrorMessages = typeof errorMessages;
type ErrorCode = keyof ErrorMessages;

const errorHandler = (res: Response, code: ErrorCode): void => {
  const status = Math.floor(code / 10);
  const body: ErrorResponse = {
    meta: {
      status,
      error: {
        code,
        message: errorMessages[code] ?? null,
      },
    },
    data: null,
  };

  res.status(status).send(body);
};

export default errorHandler;
