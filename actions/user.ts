"use server"
import { db } from "@/lib/db"
import { AddUserSchema, ChangePasswordSchema, EditUserSchema } from "@/schemas"
import { hash } from "bcryptjs"
import { revalidatePath } from "next/cache"
import * as z from "zod"

type FormTypeAddUser = z.infer<typeof AddUserSchema>
type FormTypeEditUser = z.infer<typeof EditUserSchema>
type FormTypeChangePasswordUser = z.infer<typeof ChangePasswordSchema>

const addUserAction = async (values: FormTypeAddUser) => {
    const validatedFields = AddUserSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: "Invalid Fields" }
    }

    const { id, name, username, password, role, type } = validatedFields.data
    const passwordHash = await hash(password, 10)
    try {
        await db.user.create({
            data: {
                name, username, password: passwordHash, role, type
            }
        })
        return { success: "user created!" }
    } catch (error) {
        console.log(error);

        return { error: "Something went wrong!" }
    } finally {
        revalidatePath('users')
    }
}

const editUserAction = async (values: FormTypeEditUser) => {
    const validatedFields = EditUserSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: "Invalid Fields" }
    }
    let data: any = {}
    const { id, name, username, role, type } = validatedFields.data

    try {
        await db.user.update({
            where: { id },
            data: {
                name, username, role, type
            }
        })
        return { success: "user created!" }
    } catch (error) {
        console.log(error);

        return { error: "Something went wrong!" }
    } finally {
        revalidatePath('users')
    }
}

const deleteUserAction = async (id: string) => {
    try {
        await db.user.delete({
            where: { id }
        })
        return { success: "user have been deleted!" }
    } catch (error) {
        console.log(error);
        // @ts-ignore
        throw new Error("Error delete user", error.message);


    } finally {
        revalidatePath('users')
    }
}

const changePasswordAction = async (values: FormTypeChangePasswordUser) => {
    const validatedFields = ChangePasswordSchema.safeParse(values)

    if (!validatedFields) {
        return { error: "Invalid fields!" }
    }
    // @ts-ignore
    const { id, password } = validatedFields.data
    const hashPassword = await hash(password, 10)

    try {
        await db.user.update({
            where: { id },
            data: {
                password: hashPassword
            }
        })
        return { success: "change password successfully!" }
    } catch (error) {
        console.log(error);
        // @ts-ignore
        throw new Error("Error change password user", error.message);


    } finally {
        revalidatePath('users')
    }
}



export { addUserAction, editUserAction, deleteUserAction, changePasswordAction }
