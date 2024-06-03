"use server"

import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"

const getAsrama = async (type?: any) => {
    const asrama = await db.asrama.findMany({
        where: {
            ...(type && type !== "ALL" && { sex: type }),
        }
    })
    revalidateTag("asrama")
    return asrama
}

const createAsrama = async (name: string, type: any) => {
    try {
        const asrama = await db.asrama.create({
            data: {
                name: name.toUpperCase(),
                sex: type
            }
        })

        return { success: true, data: asrama }
    } catch (error) {
        throw new Error("Error create asrama");
    }
}


export { getAsrama, createAsrama }
