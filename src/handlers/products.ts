import { Request, Response } from "express";
import { Products } from '@prisma/client';


export function getProducts (req:Request, res:Response<Products[]> | any) {
    const userId = req.userId;
    res.json({message:`Products list`,userId})
}