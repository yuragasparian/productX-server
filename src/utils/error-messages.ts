export const errorMessages = {
  4001: "Missing required fields for product",
  4002: "Username or password format is invalid",

  4010: "Unauthorized",
  4011: "Invalid username or password",
  4012: "Product id is invalid",
  4043: "You do not have permission to perform this action",

  //registration
  4050: "Username must be at least 3 characters",
  4051: "Username must be at most 20 characters",
  4052: "Username can only contain letters, numbers, and underscores",
  4053: "Password must be at least 8 characters",
  4054: "Password must contain at least one uppercase letter",
  4055: "Password must contain at least one number",
  4056: "Password must contain at least one special character",
  4057: "Role must be either Admin or Moderator",

  4220: "One or more fields contain invalid data",
  4221: "Form data is empty",

  4040: "Not found",
  4041: "Product not found",
  4042: "Product list is empty",

  4090: "Username already exists",
  4091: "Product SKU must be unique",

  5000: "Internal server error",
} as const;

export type ErrorMessages = typeof errorMessages;
export type ErrorCode = keyof ErrorMessages;
