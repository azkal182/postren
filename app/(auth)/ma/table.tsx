import { calculateDaysFromNow, dateFormat } from '@/lib/utils';

const Table = ({ data, title }: { data: any; title: string }) => {
    // Function to extract numeric value for sorting
    const extractNumericValue = (key: any) => {
        const match = key.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
    };

    // Function to compare two keys
    const compareKeys = (a: any, b: any) => {
        const prefixA = a.replace(/\d+/, '').trim();
        const prefixB = b.replace(/\d+/, '').trim();

        if (prefixA < prefixB) return -1;
        if (prefixA > prefixB) return 1;

        const numA = extractNumericValue(a);
        const numB = extractNumericValue(b);

        return numA - numB;
    };

    // Sort the keys of the data object
    const sortedKeys = Object.keys(data).sort(compareKeys);

    sortedKeys.map((key) => {
        console.log(data[key]);
    });
    // console.log(sortedKeys);

    return (
        <div>
            <h2 className="mt-6 text-center text-lg font-bold">DAFTAR ANAK DI UKS {title} AMTSILATI</h2>
            <div className="panel mx-5 mt-4">
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Masuk</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Asrama</th>
                                <th>Kelas</th>
                                <th>Keluhan</th>
                                <th>Keterangan</th>
                                <th>Ruangan</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedKeys.map((key, index) => {
                                return data[key].map((item: any, i: number) => {
                                    const calculateDay = calculateDaysFromNow(item.createdAt);
                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{dateFormat(item.createdAt)}</td>
                                            <td>{item.name}</td>
                                            <td>{item.address.split(',')[0]}</td>
                                            <td>{item.asramaId}</td>
                                            <td>{item.kelasId}</td>
                                            <td>{item.keluhans.join(', ')}</td>
                                            <td>{item.description}</td>
                                            <td>{item.room}</td>
                                            <td>{calculateDay} Hari</td>
                                        </tr>
                                    );
                                });
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Table;
