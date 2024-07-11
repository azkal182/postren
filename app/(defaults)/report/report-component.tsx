'use client';
import { getMasterByMonth } from '@/actions/master';
import Dropdown from '@/components/dropdown';
import { dateFormat, getAsramaGroup, getKeluhanGroup } from '@/lib/utils';
import { IRootState } from '@/store';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

var bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const ReportPageComponent = ({ type }: { type: any }) => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const [keluahnGrouped, setKeluhanGrouped] = useState<any>({});
    const [asramaGrouped, setAsramaGrouped] = useState<any>({});
    const [isMounted, setIsMounted] = useState(false);
    const handleMonthChange = (event: any) => {
        setSelectedMonth(event.target.value);
    };

    // Function untuk menghandle perubahan tahun yang dipilih
    const handleYearChange = (event: any) => {
        setSelectedYear(event.target.value);
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        getMasterByMonth(selectedMonth, selectedYear, type).then((data) => {
            const keluhan = getKeluhanGroup(data);
            const asrama = getAsramaGroup(data);
            setData(data);
            setKeluhanGrouped(keluhan);
            setAsramaGrouped(asrama);
            setIsLoading(false);
        });
    };

    const keluhanColumn: any = {
        series: [
            {
                name: 'SAKIT',
                data: keluahnGrouped.count,
            },
        ],
        options: {
            chart: {
                height: 300,
                type: 'bar',
                stacked: true,
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ['#2196f3', '#3b3f5c'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 5,
                        },
                    },
                },
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                },
            },
            xaxis: {
                type: 'string',
                categories: keluahnGrouped.categories,
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -20 : 0,
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
            },
            legend: {
                position: 'right',
                offsetY: 40,
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
            },
            fill: {
                opacity: 0.8,
            },
        },
    };
    const asramaColumn: any = {
        series: [
            {
                name: 'SAKIT',
                data: asramaGrouped.count,
            },
        ],
        options: {
            chart: {
                height: 300,
                type: 'bar',
                stacked: true,
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ['#2196f3', '#3b3f5c'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 5,
                        },
                    },
                },
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                },
            },
            xaxis: {
                type: 'string',
                categories: asramaGrouped.categories,
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -20 : 0,
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
            },
            legend: {
                position: 'right',
                offsetY: 40,
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
            },
            fill: {
                opacity: 0.8,
            },
        },
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div>
            <h1>Laporan</h1>
            <div className="panel">
                <div className="xs:block items-center  md:flex md:space-x-4">
                    <div>
                        <label htmlFor="monthSelect">Bulan</label>
                        <select value={selectedMonth} onChange={(e) => handleMonthChange(e)} id="monthSelect" className="form-select w-full text-white-dark md:w-32" required>
                            <option value="">Pilih Bulan</option>
                            <option value="1">Januari</option>
                            <option value="2">Februari</option>
                            <option value="3">Maret</option>
                            <option value="4">April</option>
                            <option value="5">Mei</option>
                            <option value="6">Juni</option>
                            <option value="7">Juli</option>
                            <option value="8">Agustus</option>
                            <option value="9">September</option>
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

                {!isLoading && data && (
                    <div className="mt-4">
                        <h1 className="text-center text-lg font-bold">
                            Laporan Bulan {bulan[Number(selectedMonth) - 1]} Tahun {selectedYear}
                        </h1>

                        {setKeluhanGrouped.length > 0 && data.length > 0 && (
                            <div className="mb-6 grid grid-cols-1 gap-6 text-white xl:grid-cols-2">
                                <div>
                                    <h1 className="text-center font-semibold text-dark dark:text-dark-light">Grafik sakit</h1>
                                    <div className="">
                                        {isMounted && (
                                            <ReactApexChart
                                                series={keluhanColumn.series}
                                                options={keluhanColumn.options}
                                                className="overflow-hidden rounded-lg bg-white dark:bg-black"
                                                type="bar"
                                                height={300}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-center font-semibold text-dark dark:text-dark-light">Grafik Asrama</h1>
                                    <div className="">
                                        {isMounted && (
                                            <ReactApexChart
                                                series={asramaColumn.series}
                                                options={asramaColumn.options}
                                                className="overflow-hidden rounded-lg bg-white dark:bg-black"
                                                type="bar"
                                                height={300}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
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
                                            <td>{item.keluhans.map((data: any) => data.name).join(', ')}</td>
                                            <td>{item.description}</td>
                                            <td>{item.room}</td>
                                        </tr>
                                    ))}

                                    {!isLoading && data?.length === 0 && (
                                        <tr>
                                            <td colSpan={9} className="text-center">
                                                No Record Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {isLoading && (
                    <div className="mt-14 flex w-full items-center">
                        <div className="mx-auto">
                            <svg width="64" height="64" viewBox="0 0 135 135" xmlns="http://www.w3.org/2000/svg" fill="#4361ee">
                                <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
                                    <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="-360 67 67" dur="2.5s" repeatCount="indefinite" />
                                </path>
                                <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
                                    <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="360 67 67" dur="8s" repeatCount="indefinite" />
                                </path>
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportPageComponent;
