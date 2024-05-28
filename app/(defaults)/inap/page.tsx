import React from 'react';
import Table from './table';
import { getInap, getMaster } from '@/actions/master';
import { getAsrama } from '@/actions/asrama';
import { getKelas } from '@/actions/kelas';
import { getKeluhans } from '@/actions/keluhan';
import SwipeableListPage from './swipeable-list';
import { auth } from '@/auth';
const InapPage = async ({
    searchParams,
}: {
    searchParams?: {
        search?: string;
    };
}) => {
    const query = searchParams?.search || '';
    const session = await auth();
    const type = session?.user?.type;

    const [master, asrama, kelas, keluhan] = await Promise.all([getInap(query, type), getAsrama(), getKelas(), getKeluhans()]);

    // console.log(master);

    return (
        <div>
            <h1 className="text-center text-lg font-bold">DATA SANTRI</h1>
            {/* <div className="panel mt-4"> */}
            <Table data={master} asrama={asrama} kelas={kelas} keluhans={keluhan} />
            {/* </div> */}
            {/* <SwipeableListPage data={master} asrama={asrama} kelas={kelas} keluhans={keluhan} /> */}
        </div>
    );
};

export default InapPage;
