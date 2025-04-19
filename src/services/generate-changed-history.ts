import { ProductCategory, Products } from "@prisma/client";
import { addHistory } from "../handlers/products/add-history";

export async function generateChangedHistory(
  changedDetails: Partial<Products>,
  productId: number,
) {
  const {
    name,
    sku,
    description,
    price,
    stock_quantity,
    product_image,
    category,
  } = changedDetails;

  const messages: Partial<Record<keyof Products, string>> = {
    name: `Changed name to ${name}`,
    sku: `Changed SKU to ${sku}`,
    description: `Updated description`,
    price: `Updated price to $${price}`,
    stock_quantity: `Updated stock quantity to ${stock_quantity} units`,
    product_image: `Changed product image`,
    category: category
      ? `Changed category to ${ProductCategory[category]}`
      : undefined,
  };

  for (const key of Object.keys(changedDetails) as (keyof Products)[]) {
    const message = messages[key];
    if (message) {
      await addHistory({ product_id: productId, change_made: message });
    }
  }
}
