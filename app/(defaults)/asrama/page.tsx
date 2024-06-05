import React from 'react';
import AsramaContent from './asrama-content';
import { getMaster } from '@/actions/master';
import { auth } from '@/auth';
import { getAsrama } from '@/actions/asrama';

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
    const data = await getMaster(query, type);
    const asrama = await getAsrama(type);

    return (
        <div>
            <AsramaContent data={data} asrama={asrama} />
        </div>
    );
};

export default Asrama;
