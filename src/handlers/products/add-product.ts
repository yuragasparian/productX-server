import { json, Request, Response } from "express";
import { PrismaClient, Products } from "@prisma/client";
import castFormValues from "../../services/cast-form-values";

export async function addProduct(req: Request<{}, {}, Products>, res: Response) {

    const product = req.body;
    const product_image = req.file?.filename
    const adder_id = req.userId

    if (!product_image || !adder_id) {
        res.send("Error")
        return
    }

    const rawData = {
        ...product,
        product_image,
        adder_id,
      };
      
      const productData = castFormValues(rawData) as Products;




    try {
        const prisma = new PrismaClient()
        const data = await prisma.products.create({ data: productData })
        res.send(data)
        return
    }
    catch (err) {
        console.log(err);

    }
}