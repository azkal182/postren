"use server"

import { db } from "@/lib/db"

const getUserByUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username
        }
    })
    return user
}

const getUserById = async (id: string) => {
    const user = await db.user.findUnique({
        where: {
            id
        }
    })
    return user
}

export { getUserById, getUserByUsername }
