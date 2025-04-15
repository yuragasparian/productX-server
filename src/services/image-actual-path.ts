import { Products } from '@prisma/client';

const imageActualPath = (products: Products[]): Products[] => {
    const basePath = process.env.APP_URL
    return products.map(product => ({
      ...product,
      product_image	: `${basePath}/uploads/${product.product_image}`,
    }));
  };

  export default imageActualPath