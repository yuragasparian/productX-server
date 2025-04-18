import { Request, Response } from 'express';
import verifyUser from '../services/verify-user';


export default async function userInfo(req: Request, res: Response) {
    const user = await verifyUser({ id: req.userId })
    if(!user.data) return;
    const userData = {
        id: user.data.id,
        name: user.data.username,
        image: `${process.env.APP_URL}/${user.data.user_image}.jpg`
    }
    res.json(userData)
}