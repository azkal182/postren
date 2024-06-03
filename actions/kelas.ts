"use server"

import { db } from "@/lib/db"

const getKelas = async (type?: any) => {
    const kelas = await db.kelas.findMany({
        where: {
            ...(type && type !== "ALL" && { sex: type }),
        },
        orderBy: {
            name: "asc"
        }
    })
    return kelas
}

const createKelas = async (name: string, type: any) => {
    try {
        const kelas = await db.kelas.create({
            data: {
                name: name.toUpperCase(),
                sex: type
            }
        })
        return { success: true, data: kelas }
    } catch (error) {
        throw new Error("Error create kelas");

    }

}

export { getKelas, createKelas }
