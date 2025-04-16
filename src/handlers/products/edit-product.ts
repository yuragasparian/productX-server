import { Request, Response } from "express";
import { PrismaClient, Products } from "@prisma/client";
import castFormValues from "../../services/cast-form-values";
import { generateChangedHistory } from "../../services/generate-changed-history";
import { verifySKU } from "../../services/verifySKU";

export async function editProduct(req: Request<{id:string}, {}, Products>, res: Response) {

    const product = req.body;
    const product_image = req.file?.filename
    const adder_id = req.userId

    const {id} = req.params

    if (!adder_id || isNaN(+id)) {
        res.send({success:false, message:"Error, No user token"})
        return
    }
    if(product.sku) {
        const skuIsValid = await verifySKU(product.sku)    
        if(!skuIsValid) {
            res.send({success:false, message:"SKU already exists"})
            return
        }
    }
    const productId = Number(id);

    const rawData = {
        ...product,
        ...(product_image !== undefined && { product_image }),
        adder_id,
    };

    const productData = castFormValues(rawData) as Partial<Products>;



    try {
        const prisma = new PrismaClient()
        const updatedProduct = await prisma.products.update({
            where: { id: productId, adder_id },
            data: productData
        });
        generateChangedHistory(productData, productId)
        console.log(productData);
        
        
        res.send(updatedProduct)
        return
    }
    catch (err) {
        console.log(err);
    }
}