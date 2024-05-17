import * as z from 'zod';

export const LoginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(4),
});

export const RegisterSchema = z
    .object({
        name: z.string().min(1),
        username: z.string().min(1),
        password: z.string().min(4),
        c_password: z.string().min(4),
    })
    .refine((data) => data.password === data.c_password, {
        path: ['c_password'],
        message: 'Passwords does not match',
    });

export const CreateMasterSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    address: z.string().min(1),
    kelas: z.string().min(1),
    asrama: z.string().min(1),
    description: z.string().min(1),
    room: z.string().min(1),
});

export const CreateMaster = z.object({
    studentId: z.string(),
    name: z.string(),
    address: z.string(),
    sex: z.enum(["LK", "PR", "ALL"]),
    kelasId: z.string().optional(),
    asramaId: z.string(),
    description: z.string().optional(),
    room: z.string(),
    keluhans: z.string().array(),
})
