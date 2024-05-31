"use server"

import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"

const getKeluhans = async () => {
    const keluhans = await db.keluhan.findMany()
    revalidateTag("keluhan")
    return keluhans
}

const createKeluhan = async (name: string) => {
    const keluhans = await db.keluhan.create({
        data: {
            name: name.toUpperCase()
        }
    })
    revalidateTag("keluhan")
    return keluhans
}
export { getKeluhans, createKeluhan }
