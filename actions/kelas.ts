"use server"

import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"

const getKelas = async () => {
    const kelas = await db.kelas.findMany({
        orderBy: {
            name: "asc"
        }
    })
    revalidateTag("kelas")
    return kelas
}

const createKelas = async (name: string) => {
    const kelas = await db.kelas.create({
        data: {
            name: name.toUpperCase()
        }
    })
    revalidateTag("kelas")
    return kelas
}

export { getKelas, createKelas }
