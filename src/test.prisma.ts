import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function addProduct() {
    const newP = await prisma.products.create({
        data: {
            name: "product",
            sku: 54989,
            category: "clothes",
            description: "No",
            price: 500,
            stockQuantity: 8
        }
    })
    console.log("product created", newP);
    
}

export default addProduct