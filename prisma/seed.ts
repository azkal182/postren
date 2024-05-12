import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
    const password = await hash('admin', 10)
    const passwordUks = await hash('uks', 10)
    const admin = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            name: 'admin',
            password: password,
            role: "ADMIN",
            type: "ALL"
        },
    })

    const uks = await prisma.user.upsert({
        where: { username: 'uks' },
        update: {},
        create: {
            username: 'uks',
            name: 'uks',
            password: passwordUks,
            role: "USER",
            type: "LK"
        },
    })

    console.log({ admin, uks })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
