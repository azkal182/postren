import { getInap } from '@/actions/master';
import { auth } from '@/auth';
import React from 'react';
import _ from 'lodash';
import { calculateDaysFromNow, cn, dateFormat } from '@/lib/utils';
import Table from './table';

async function InapPage() {
    const session = await auth();

    const data = await getInap('', 'LK');
    // // Fungsi untuk memeriksa apakah kelasId adalah angka Romawi
    // const isRomanNumeral = (str: string) => /^(I|V|X|L|C|D|M)+$/.test(str);
    // const filteredData = _.filter(data, (item) => isRomanNumeral(item.kelasId));
    let groupedByKelasId = _.groupBy(data, 'kelasId');

    const smaData: any = {};
    const mtsData: any = {};

    for (const [key, value] of Object.entries(groupedByKelasId)) {
        if (key.match(/^X[I ]+/)) {
            smaData[key] = value;
        } else if (key.match(/^[7-9]/)) {
            mtsData[key] = value;
        }
    }

    // console.log(smaData);

    return (
        <div>
            <Table data={smaData} title="MA" />
        </div>
    );
}

export default InapPage;
