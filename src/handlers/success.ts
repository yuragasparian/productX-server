import type { Response } from "express";

const successHandler = <T>(res: Response, data: T) => {
  const body = {
    meta: {
      status: 200,
      error: null,
    },
    data,
  };

  res.send(body);
};

export default successHandler;
