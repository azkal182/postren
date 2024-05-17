"use server"

import { db } from "@/lib/db"

const getAsrama = async () => {
    const asrama = await db.asrama.findMany()
    return asrama
}

export { getAsrama }
