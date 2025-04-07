import { Request, Response } from "express";
import { PrismaClient, Products } from '@prisma/client';

export async function getProducts(req: Request, res: Response<Products[]>) {
    const userId = req.userId;
    const prisma = new PrismaClient()
    const products = await prisma.products.findMany(
        {
            where: { adder_id: userId }
        }
    )
    console.log("User ID:", req.userId); // should be defined if middleware runs
console.log("Cookies:", req.cookies);
    res.status(200).json(products)
}