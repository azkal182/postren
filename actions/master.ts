"use server"
import _ from "lodash";
import * as z from "zod"
import { db } from "@/lib/db"
import { CreateMaster, ReturnMasterSchema } from "@/schemas";
import { createAbstractBuilder } from "typescript";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";


const getInap = async (query?: string, type?: any) => {
    const master = await db.master.findMany({
        where: {
            ...(query && { students: { name: { contains: query, mode: "insensitive" } } }),
            ...(type && type !== "ALL" && { students: { sex: type } }),
            returnAt: null
        },
        include: {
            students: true,
            asrama: true,
            keluhans: true,
            kelas: true
        },
        orderBy: {
            createdAt: "asc"
        }
    })

    let transformedArray = master.map(obj => {
        return _.assign({}, _.omit(obj, ['kelas', 'asrama', 'students']), {
            name: obj.students.name,
            address: obj.students.address,
            sex: obj.students.sex,
            keluhans: obj.keluhans.map(data => data.name)
        })
    })

    // console.log(JSON.stringify(transformedArray, null, 2));

    revalidatePath('inap')
    return transformedArray
}

const getMaster = async (query?: string, type?: any, amonth?: any) => {
    const toDate = new Date()
    const fromDate = new Date(toDate)
    fromDate.setDate(fromDate.getDate() - 30)

    const master = await db.master.findMany({
        where: {
            ...(query && { students: { name: { contains: query, mode: "insensitive" } } }),
            ...(type && type !== "ALL" && { students: { sex: type } }),
            ...(amonth && {
                createdAt: {
                    gte: fromDate,
                    lte: toDate
                }
            })
        },
        include: {
            students: true,
            asrama: true,
            keluhans: true,
            kelas: true
        },
        orderBy: {
            createdAt: "asc"
        }
    })

    let transformedArray = master.map(obj => {
        return _.assign({}, _.omit(obj, ['kelas', 'asrama', 'students']), {
            name: obj.students.name,
            address: obj.students.address,
            sex: obj.students.sex,
            keluhans: obj.keluhans.map(data => data.name)
        })
    })

    // console.log(JSON.stringify(transformedArray, null, 2));

    revalidatePath('inap')
    return transformedArray
}

type FormTypeCreateMaster = z.infer<typeof CreateMaster>

const createMaster = async (values: FormTypeCreateMaster) => {
    const validatedFields = CreateMaster.safeParse(values)
    if (!validatedFields.success) {
        return { error: 'Invalid fields' };
    }

    const { studentId, name, address, sex, kelasId, asramaId, description, room, keluhans } = validatedFields.data
    // const student = await db.student.upsert({
    //     where: {
    //         id: studentId
    //     },
    //     update: {},
    //     create: {
    //         id: studentId,
    //         name,
    //         address,
    //         sex

    //     }
    // })
    console.log({ asramaId, sex });

    try {
        await db.master.create({
            data: {
                students: {
                    connectOrCreate: {
                        where: { id: studentId },
                        create: {
                            id: studentId,
                            name,
                            address,
                            sex

                        }
                    }
                },
                ...(kelasId && { kelas: { connect: { name_sex: { name: kelasId, sex: sex } } } }),
                asrama: { connect: { name_sex: { name: asramaId, sex: sex } } },
                description,
                room,
                keluhans: {
                    connect: keluhans.map((item) => ({ name: item }))
                }
            }
        })

        return { success: 'success' };
    } catch (error) {
        console.log(error);
        return { error: 'Something went wrong!' };

    } finally {
        revalidatePath('inap')
    }
}

type TypeReturnMaster = z.infer<typeof ReturnMasterSchema>
const returnMaster = async (id?: any, returnTo?: any) => {

    if (!id || !returnTo) {
        return { error: 'Invalid fields' };
    }
    const currentDate = new Date();
    try {
        await db.master.update({
            where: { id },
            data: {
                returnTo,
                returnAt: currentDate
            }
        })
        return { success: 'success' };
    } catch (error) {
        console.log(error);
        return { error: 'Something went wrong!' };

    } finally {
        revalidatePath('inap')
    }

}

const getMasterByMonth = async (month: string, year: string, type: any) => {
    // Menghitung tanggal awal bulan
    const startDate = new Date(`${year}-${month}-01`);
    // startDate.setDate(startDate.getDate() + 1)
    console.log(startDate);




    // Menghitung tanggal akhir bulan
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(endDate.getDate() - 1);

    console.log(endDate);




    try {
        const master = await db.master.findMany({
            where: {
                ...(type && type !== "ALL" && { sex: type }),
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            },
            include: {
                students: true,
                asrama: true,
                keluhans: true,
                kelas: true
            }
        })

        let transformedArray = master.map(obj => {
            return _.assign({}, _.omit(obj, ['kelas', 'asrama', 'students']), {
                name: obj.students.name,
                address: obj.students.address,
                sex: obj.students.sex,
                keluhans: obj.keluhans.map(data => data.name)
            })
        })

        return transformedArray

    } catch (error) {

    }

}

export { getMaster, createMaster, returnMaster, getInap, getMasterByMonth }
