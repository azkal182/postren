import React from 'react';
import AsramaContent from './asrama-content';
import { getInap } from '@/actions/master';
import { auth } from '@/auth';

const Asrama = async ({
    searchParams,
}: {
    searchParams?: {
        search?: string;
    };
}) => {
    const query = searchParams?.search || '';
    const session = await auth();
    const type = session?.user?.type;
    const data = await getInap(query, type);
    console.log(data);

    return (
        <div>
            <h1 className="text-center text-lg font-bold">DATA SANTRI</h1>
            <AsramaContent />
        </div>
    );
};

export default Asrama;
