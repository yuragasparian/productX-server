import { Product } from "@prisma/client";

const imageActualPath = (products: Product[]): Product[] => {
  const basePath = process.env.APP_URL;
  return products.map((product) => ({
    ...product,
    product_image: `${basePath}/uploads/${product.image}`,
  }));
};

export default imageActualPath;
