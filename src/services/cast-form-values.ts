import { Products } from "@prisma/client";

const castFormValues = (data: Products) => {
    const result: Record<string, any> = {};
  
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string") {
        const trimmed = value.trim();
  
        // Cast numeric strings to numbers
        if (trimmed !== "" && !isNaN(Number(trimmed))) {
          result[key] = Number(trimmed);
        }
        // Optional: cast boolean strings
        else if (trimmed === "true" || trimmed === "false") {
          result[key] = trimmed === "true";
        } else {
          result[key] = trimmed;
        }
      } else {
        result[key] = value; // already correct type
      }
    }
  
    return result;
  };
  

  export default castFormValues