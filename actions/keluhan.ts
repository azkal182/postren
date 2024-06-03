"use server"

import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"

const getKeluhans = async () => {
    const keluhans = await db.keluhan.findMany()
    revalidateTag("keluhan")
    return keluhans
}

const createKeluhan = async (name: string) => {
    try {
        const keluhans = await db.keluhan.create({
            data: {
                name: name.toUpperCase()
            }
        })
        return { success: true, data: keluhans }
    } catch (error) {
        throw new Error("Error create keluhan");
    }

}
export { getKeluhans, createKeluhan }
