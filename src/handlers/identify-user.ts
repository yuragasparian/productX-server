import { Request, Response } from 'express';
import verifyUser from '../services/verify-user';


export default async function identifyUser(req: Request, res: Response) {
    const user = await verifyUser({ id: req.userId })
    if(!user.data) return
    const userData = {
        userId: user.data.id,
        username: user.data.username,
        image: user.data.user_image
    }
    res.json(userData)
}