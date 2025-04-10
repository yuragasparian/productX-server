import { Request, Response } from 'express';
import verifyUser from '../services/verify-user';


export default async function identifyUser(req: Request, res: Response) {
    const user = await verifyUser({ id: req.userId })
    if(!user.data) return
    const userData = {
        id: user.data.id,
        username: user.data.username,
        user_image: `${process.env.APP_URL}/${user.data.user_image}.jpg`
    }
    res.json(userData)
}