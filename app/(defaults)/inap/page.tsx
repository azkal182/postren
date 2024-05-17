import React from 'react';
import Table from './table';
import { getMaster } from '@/actions/master';
import { getAsrama } from '@/actions/asrama';
import { getKelas } from '@/actions/kelas';
import { getKeluhans } from '@/actions/keluhan';

const InapPage = async () => {
    // Primises.all();
    // const master = await getMaster();
    // const asrama = await getAsrama();
    // const kelas = await getKelas();
    // const keluhan = await getKeluhans();

    const [master, asrama, kelas, keluhan] = await Promise.all([getMaster(), getAsrama(), getKelas(), getKeluhans()]);

    console.log(master);

    return (
        <div>
            <h1 className="text-center text-lg font-bold">DATA SANTRI</h1>
            <div className="panel mt-4">
                <Table data={master} asrama={asrama} kelas={kelas} keluhans={keluhan} />
            </div>
        </div>
    );
};

export default InapPage;
