'use client';
import SearchBox from '@/components/inap/search-box';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import { Separator } from '@/components/separator';
import { calculateDays, calculateDaysFromNow, cn, dateFormat } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ContextMenuTrigger } from 'rctx-contextmenu';
import React, { ChangeEvent, useState } from 'react';
import * as _ from 'lodash';

const statusPriority = {
    null: 1,
    ASRAMA: 2,
    RUMAH: 3,
    RS: 4,
};

const AsramaContent = ({ data, asrama }: { data: any; asrama: any }) => {
    const [statusSelected, setStatusSelected] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    // const status: string[] = ['ASRAMA', 'RS', 'RUMAH'];

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        let updatedStatuses;
        if (statusSelected.includes(value)) {
            updatedStatuses = statusSelected.filter((item) => item !== value);
        } else {
            updatedStatuses = [...statusSelected, value];
        }
        setStatusSelected(updatedStatuses);
    };

    const sortByPriority = (data: any) => {
        // @ts-ignore
        return _.sortBy(data, [(item) => statusPriority[item.returnTo]]);
    };

    const sortedData = sortByPriority(data);
    // const filteredData = statusSelected.length === 0 ? sortedData : _.filter(sortedData, (item) => _.includes(statusSelected, item.asramaId));

    // Langkah pertama: filter berdasarkan status
    const filteredByStatus = statusSelected.length === 0 ? sortedData : _.filter(sortedData, (item) => _.includes(statusSelected, item.asramaId));

    // Langkah kedua: filter berdasarkan query pencarian
    const filteredData = searchQuery === '' ? filteredByStatus : _.filter(filteredByStatus, (item) => _.includes(item.name.toLowerCase(), searchQuery.toLowerCase()));

    console.log(filteredData);

    return (
        <div>
            {' '}
            <h1 className="text-center text-lg font-bold">DATA SANTRI</h1>
            <div className="panel">
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                    <div>
                        <input onChange={(e: any) => setSearchQuery(e.target.value)} value={searchQuery} type="text" className="form-input w-full md:w-auto " placeholder="Search..."></input>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <button type="button" className="btn btn-outline-primary mr-auto h-9 min-w-16 px-1 py-0">
                                Asrama
                                {statusSelected.length >= 3 ? (
                                    <>
                                        <Separator orientation="vertical" className="mx-2 h-4" />
                                        <div className="flex space-x-1">
                                            <span className="badge bg-dark px-0.5 py-0">{statusSelected.length} selected</span>
                                        </div>
                                    </>
                                ) : statusSelected.length > 0 ? (
                                    <>
                                        <Separator orientation="vertical" className="mx-2 h-4" />
                                        <div className="flex space-x-1">
                                            {statusSelected.map((item: string) => (
                                                <span key={item} className="badge bg-dark px-0.5 py-0">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div></div>
                                )}
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-44" align="start">
                            <div>
                                {asrama.map((item: any) => {
                                    return (
                                        <div>
                                            <label className="inline-flex">
                                                <input
                                                    value={item.name}
                                                    checked={statusSelected.includes(item.name)}
                                                    onChange={handleCheckboxChange}
                                                    type="checkbox"
                                                    className="form-checkbox outline-primary"
                                                />
                                                <span>{item.name}</span>
                                            </label>
                                        </div>
                                    );
                                })}
                                <button onClick={() => setStatusSelected([])}>Clear All</button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="table-responsive mb-5 mt-6">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Status</th>

                                <th>Name</th>
                                <th>Address</th>
                                <th>Asrama</th>
                                <th>Kelas</th>
                                <th>Keluhan</th>
                                <th>Masuk</th>
                                <th>Keluar</th>
                                <th>Lama</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item: any, i: number) => {
                                const calculateDay = item.returnAt ? calculateDays(item.createdAt, item.returnAt) : calculateDaysFromNow(item.createdAt);
                                return (
                                    <tr
                                        key={item.id}
                                        className={cn(
                                            item?.returnTo === null
                                                ? 'border-dark-dark-light bg-dark-dark-light'
                                                : item?.returnTo === 'RUMAH'
                                                ? 'border-success/20 bg-success/20'
                                                : item?.returnTo === 'RS'
                                                ? 'border-danger/20 bg-danger/20 '
                                                : 'border-primary/20 bg-primary/20'
                                        )}
                                    >
                                        <td>{i + 1}</td>
                                        <td>{item?.returnTo ? item?.returnTo : 'UKS'}</td>
                                        <td className="whitespace-nowrap">{item.name}</td>
                                        <td>{item.address.split(',')[0]}</td>
                                        <td>{item.asramaId}</td>
                                        <td>{item.kelasId}</td>
                                        <td>{item.keluhans.join(', ')}</td>
                                        <td className="whitespace-nowrap">{dateFormat(item.createdAt)}</td>
                                        <td className="whitespace-nowrap">{item?.returnAt ? dateFormat(item.returnAt) : '-'}</td>
                                        <td>{calculateDay} Hari</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AsramaContent;
