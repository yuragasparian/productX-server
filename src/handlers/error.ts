import type { Response } from "express";
import type { ErrorResponse } from "@/types/express/response";
import { errorMessages, ErrorCode } from "@/utils/error-messages";

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
