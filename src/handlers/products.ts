import { Request, Response } from "express";
import { PrismaClient, Products } from '@prisma/client';


type ReturnType = {
    products: Products[],
    totalProducts: number
}

export async function getProducts(req: Request, res: Response<ReturnType>) {
    const userId = req.userId;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 6;
    const prisma = new PrismaClient()

    const products = await prisma.products.findMany({
        where: { adder_id: userId },
        include: { category: true, history: true },
        orderBy: { add_date: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const totalProducts = await prisma.products.count({
        where: { adder_id: userId }
    });

    res.status(200).json({ products, totalProducts })
}