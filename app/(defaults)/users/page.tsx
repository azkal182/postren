import { auth } from '@/auth';
import { db } from '@/lib/db';
import React from 'react';
import TableUser from './table';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Users',
};

const UsersPage = async () => {
    const session = await auth();
    const users = await db.user.findMany();

    if (session?.user?.role !== 'ADMIN') {
        return <h1 className="text-center text-xl font-bold">You don't have permission!</h1>;
    }

    // console.log(users);

    return (
        <>
            <h1 className="text-center text-xl font-bold">Users</h1>
            <TableUser users={users} />
        </>
    );
};

export default UsersPage;
