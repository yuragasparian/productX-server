import { Products } from "@prisma/client";

const numericValues = ["sku", "price", "stock_quantity", "adder_id"];

const castFormValues = (data: Products) => {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    const trimmed = typeof value === "string" ? value.trim() : value;

    if (numericValues.includes(key)) {
      // If it's a numeric field, set to null if it's an invalid number
      result[key] =
        trimmed !== "" && !isNaN(Number(trimmed)) ? Number(trimmed) : null;
    } else {
      // For non-numeric fields, just set the trimmed string
      result[key] = trimmed;
    }
  }

  return result;
};

export default castFormValues;
