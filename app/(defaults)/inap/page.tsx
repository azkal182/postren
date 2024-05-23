import React from 'react';
import Table from './table';
import { getInap, getMaster } from '@/actions/master';
import { getAsrama } from '@/actions/asrama';
import { getKelas } from '@/actions/kelas';
import { getKeluhans } from '@/actions/keluhan';
import SwipeableListPage from './swipeable-list';
const InapPage = async () => {
    // Primises.all();
    // const master = await getMaster();
    // const asrama = await getAsrama();
    // const kelas = await getKelas();
    // const keluhan = await getKeluhans();

    const [master, asrama, kelas, keluhan] = await Promise.all([getInap(), getAsrama(), getKelas(), getKeluhans()]);

    console.log(master);

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
