import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient()

type TReturn = Promise<{
    success: boolean
    data: User | null
}>

export default async function verifyUser(username: string): TReturn {
    const user = await prisma.user.findUnique({
        where: { username }
    })
    if (user) {
        return {
            success: true,
            data:user
        }
    }
    else return {
        success: false,
        data: null
    }
}