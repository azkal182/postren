"use server"

import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"

const getAsrama = async () => {
    const asrama = await db.asrama.findMany()
    revalidateTag("asrama")
    return asrama
}

const createAsrama = async (name: string) => {
    const kelas = await db.asrama.create({
        data: {
            name: name.toUpperCase()
        }
    })
    revalidateTag("asrama")
    return kelas
}


export { getAsrama, createAsrama }
