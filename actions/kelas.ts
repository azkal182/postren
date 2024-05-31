"use server"

import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"

const getKelas = async (type?: any) => {
    const kelas = await db.kelas.findMany({
        where: {
            ...(type && type !== "ALL" && { sex: type }),
        },
        orderBy: {
            name: "asc"
        }
    })
    revalidateTag("kelas")
    return kelas
}

const createKelas = async (name: string, type: any) => {
    const kelas = await db.kelas.create({
        data: {
            name: name.toUpperCase(),
            sex: type
        }
    })
    revalidateTag("kelas")
    return kelas
}

export { getKelas, createKelas }
