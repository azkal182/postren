'use client';
import { getMasterByMonth } from '@/actions/master';
import Dropdown from '@/components/dropdown';
import { dateFormat } from '@/lib/utils';
import React, { useState } from 'react';

var bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const ReportPage = () => {
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [data, setData] = useState<any>([]);

    const handleMonthChange = (event: any) => {
        setSelectedMonth(event.target.value);
    };

    // Function untuk menghandle perubahan tahun yang dipilih
    const handleYearChange = (event: any) => {
        setSelectedYear(event.target.value);
    };

    const handleSubmit = async () => {
        getMasterByMonth(selectedMonth, selectedYear).then((data) => {
            setData(data);
        });
    };
    return (
        <div>
            <h1>Laporan</h1>
            <div className="panel">
                <div className="xs:block items-center  md:flex md:space-x-4">
                    <div>
                        <label htmlFor="monthSelect">Bulan</label>
                        <select value={selectedMonth} onChange={(e) => handleMonthChange(e)} id="monthSelect" className="form-select w-full text-white-dark md:w-32" required>
                            <option>Pilih Bulan</option>
                            <option value="">Pilih Bulan</option>
                            <option value="01">Januari</option>
                            <option value="02">Februari</option>
                            <option value="03">Maret</option>
                            <option value="04">April</option>
                            <option value="05">Mei</option>
                            <option value="06">Juni</option>
                            <option value="07">Juli</option>
                            <option value="08">Agustus</option>
                            <option value="09">September</option>
                            <option value="10">Oktober</option>
                            <option value="11">November</option>
                            <option value="12">Desember</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="yearSelect">Tahun</label>
                        <select value={selectedYear} onChange={(e) => handleYearChange(e)} id="yearSelect" className="form-select w-full text-white-dark md:w-32" required>
                            <option>Pilih Tahun</option>
                            <option value={2024}>2024</option>
                            <option value={2025}>2025</option>
                            <option value={2026}>2026</option>
                        </select>
                    </div>
                    <div>
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary mt-6 md:ml-auto">
                            Submit
                        </button>
                    </div>
                </div>

                {data.length > 0 && (
                    <div className="mt-4">
                        <h1 className="text-center text-lg font-bold">Laporan Bulan {bulan[Number(selectedMonth)]}</h1>
                        <div className="table-responsive mb-5 mt-6">
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((item: any, i: number) => (
                                        <tr key={item.id}>
                                            <td>{i + 1}</td>
                                            <td>{dateFormat(item.createdAt)}</td>
                                            <td>{item.name}</td>
                                            <td>{item.address.split(',')[0]}</td>
                                            <td>{item.asramaId}</td>
                                            <td>{item.kelasId}</td>
                                            <td>{item.keluhans.join(', ')}</td>
                                            <td>{item.description}</td>
                                            <td>{item.room}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportPage;
