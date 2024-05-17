"use server"

import { db } from "@/lib/db"

const getKelas = async () => {
    const kelas = await db.kelas.findMany()
    return kelas
}

export { getKelas }
