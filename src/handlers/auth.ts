import { Request, Response } from "express";
import { User } from "@prisma/client";
import verifyUser from "../services/verify-user";
import bcrypt from 'bcryptjs';
import { generateJWT } from "../services/generate-jwt";

export async function authUser(req: Request<{}, {}, User>, res: Response) {
    const { username, password } = req.body
    const user = await verifyUser({username})
    const { data } = user
    

    if (!user.success || !data) {
        res.send({ success: false, message: "Username does not exist" })
    }
    else {
        const passwordMatches = await bcrypt.compare(password, data.password)
        if (!passwordMatches) {
            res.send({ success: false, message: `Wrong password for user @${data.username}` })
        }
        else {
            const token = generateJWT({ username: data.username, userId: data.id})
            res.status(200).json({ success: true, token, message: `Welcome @${data.username}`})
        }
    }

}
