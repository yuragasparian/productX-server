import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient()

type TReturn = Promise<{
    success: boolean
    data: User | null
}>

type Params = {
    username?: string,
    id?: number
}

export default async function verifyUser({username, id}:Params): TReturn {
    const user = await prisma.user.findUnique({
        where: username ? { username } : { id },
    })
    if (user) {
        return {
            success: true,
            data: user
        }
    }
    else return {
        success: false,
        data: null
    }
}

