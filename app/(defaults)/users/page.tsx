import { auth } from '@/auth';
import { db } from '@/lib/db';
import React from 'react';
import TableUser from './table';

const UsersPage = async () => {
    const session = await auth();
    const users = await db.user.findMany();

    if (session?.user?.role !== 'ADMIN') {
        return <h1 className="text-center text-xl font-bold">You don't have permission!</h1>;
    }

    // console.log(users);

    return (
        <>
            <h1 className="text-center text-xl font-bold">UsersPage</h1>
            <TableUser users={users} />
        </>
    );
};

export default UsersPage;
