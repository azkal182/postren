"use server"

import { db } from "@/lib/db"

const getKeluhans = async () => {
    const keluhans = await db.keluhan.findMany()
    return keluhans
}

export { getKeluhans }
