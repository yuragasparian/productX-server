import { PrismaClient } from "@prisma/client"

export const verifySKU = async (sku: string | number) => {
    if (isNaN(+sku)) {
        return false
    }

    const prisma = new PrismaClient()
    const skuExists = await prisma.products.findUnique({
        where: { sku: +sku }
    })
    if (skuExists) {
        return false
    }
    return true
}