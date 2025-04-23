import type { Response } from "express";

const successHandler = <T>(res: Response, data: T) => {
  let formattedData: any;

  if (Array.isArray(data)) {
    formattedData = { items: data };
  } else if (typeof data === "object" && data !== null) {
    const keys = Object.keys(data);

    // If it's a paginated-like structure or already wrapped correctly, return as-is
    if (keys.includes("pages")) {
      formattedData = data;
    } else {
      // Otherwise treat it as a single object
      formattedData = { item: data };
    }
  } else {
    // For primitive values (string, number, etc.)
    formattedData = { item: data };
  }

  const body = {
    meta: {
      status: 200,
      error: null,
    },
    data: formattedData,
  };

  res.send(body);
};

export default successHandler;
