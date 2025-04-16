import { json, Request, Response } from "express";
import { PrismaClient, Products } from "@prisma/client";
import castFormValues from "../../services/cast-form-values";
import { addHistory } from "./add-history";
import { verifySKU } from "../../services/verify-sku";

export async function addProduct(req: Request<{}, {}, Products>, res: Response) {

    const product = req.body;
    const product_image = req.file?.filename
    const adder_id = req.userId

    const skuIsValid = await verifySKU(product.sku)    

    if (!adder_id) {
        res.send("Error, unauthorized")
        return
    }
    if(!skuIsValid) {
        res.send({success:false, message:"SKU is not valid or already exists"})
        return
    }

    const rawData = {
        ...product,
        ...(product_image != undefined ? { product_image } : {product_image:"no-product-image.jpg"}),
        adder_id,
    };
    
    const productData = castFormValues(rawData) as Products & {ts:null};
    
    if(Object.values(productData).includes(null)){
        res.send({success:false, message:"Form data contains missing or invalid values."})
        return
    }

    try {
        const prisma = new PrismaClient()
        const data = await prisma.products.create({ data: productData })
        const historyAdded = addHistory({product_id:data.id, change_made:"Product has been created"})
        res.send({data, historyAdded})
        return
    }
    catch (err) {
        console.log(err);
    }
}