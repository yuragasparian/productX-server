import type { Response } from "express";
import type { ErrorResponse } from "@/types/express/response";

const statusMessages = {
  500: "Internal server error",
  400: "Invalid username or password",
  401: "Unauthorized",
  422: "Product SKU must be unique",
  409: "Missing required fields for product",
  404: "Not found",
} as const;

type StatusCode = keyof typeof statusMessages;

const errorHandler = (res: Response, status: StatusCode): void => {
  const body: ErrorResponse = {
    meta: {
      status,
      error: statusMessages[status] ?? null,
    },
    data: null,
  };
  res.status(status).send(body);
};

export default errorHandler;
