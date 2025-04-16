import { PrismaClient } from '@prisma/client';
import { Response, Request } from 'express';


export async function deleteProduct(req: Request, res: Response) {
    const { id } = req.params
    const { userId } = req

    if (!userId) {
        throw new Error("Unauthorized")
    }

    const prisma = new PrismaClient()

    //being sure that user removes his own product
    const product = await prisma.products.findFirst({
        where: {
            id: +id,
            adder_id: +userId,
        },
    });
    if (!product) {
        throw new Error('Not authorized or product not found');
    }
    else {
        await prisma.productHistory.deleteMany({
            where:{product_id:Number(id)}
        })
        const removeProduct = await prisma.products.deleteMany({
            where: { id: +id }
        });

        if (removeProduct) {
            res.send({ success: true, message: `Product ${id} removed successfully` })
        }
    }



}