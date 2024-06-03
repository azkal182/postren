'use client';
import React from 'react';

import { Dialog, Transition, Tab } from '@headlessui/react';
import { useState, Fragment } from 'react';
import IconX from '@/components/icon/icon-x';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CreateMaster } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/form';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { searchUser } from '@/actions/sidafa';
import AsyncSelect from 'react-select/async';
import { createMaster, returnMaster } from '@/actions/master';
import IconPencil from '@/components/icon/icon-pencil';
import Tippy from '@tippyjs/react';
import { createKelas } from '@/actions/kelas';
import { createAsrama } from '@/actions/asrama';
import { useOptimistic } from 'react';
import Swal from 'sweetalert2';
import { ContextMenu, ContextMenuItem, ContextMenuTrigger, Submenu } from 'rctx-contextmenu';
import useScreenSize from '@/hooks/use-screen-size';
import SwipeableListPage from './swipeable-list';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { calculateDaysFromNow, cn } from '@/lib/utils';
import { createKeluhan } from '@/actions/keluhan';
import SearchBox from '@/components/inap/search-box';
import FormInap from './form-inap';

type formCreateMaster = z.infer<typeof CreateMaster>;

type namesOption = {
    value: string;
    label: string;
    name: string;
    address: string;
};
interface Option {
    readonly label: string;
    readonly value: string;
}

const Table = ({ data, kelas, asrama, keluhans, type }: { data: any; kelas: any; asrama: any; keluhans: any; type: any }) => {
    const [modal, setModal] = useState(false);
    // const [optimisticDatas, addOptimisticData] = useOptimistic(data, (state, newDatas) => {
    //     return [...state, newDatas];
    // });
    const screenSize = useScreenSize();

    function dateFormat(tanggal: any) {
        const date = new Date(tanggal);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        // @ts-ignore
        const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date);
        return formattedDate;
    }

    const handleReturn = async (user: any, returnTo: any) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: `${user.name} want to return to ${returnTo}`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            padding: '2em',
            reverseButtons: true,
            customClass: 'sweet-alerts',
        }).then((result) => {
            if (result.value) {
                returnMaster(user.id, returnTo).then((data) => {
                    if (data.success) {
                        Swal.fire({ title: 'Returned!', text: 'Successfully!', icon: 'success', customClass: 'sweet-alerts' });
                    } else {
                        alert('something went wrong!');
                    }
                });
            }
        });
    };

    const handleModalClose = () => {
        setModal(false);
    };

    return (
        <>
            {' '}
            <div className="panel mt-4">
                <div className="mb-4.5 flex flex-col justify-between gap-5 md:flex-row md:items-center">
                    <div className="flex flex-wrap items-center">
                        <button className="btn btn-primary" onClick={() => setModal(true)}>
                            Tambah
                        </button>
                    </div>
                    <SearchBox />
                </div>
                {screenSize !== 'sm' ? (
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
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item: any, i: number) => {
                                    const calculateDay = calculateDaysFromNow(item.createdAt);
                                    return (
                                        <tr
                                            key={item.id}
                                            className={cn(
                                                calculateDay >= 5
                                                    ? 'border-danger/20 bg-danger/20'
                                                    : calculateDay >= 3
                                                    ? 'border-warning/20 bg-warning/20'
                                                    : 'border-dark-dark-light bg-dark-dark-light'
                                            )}
                                        >
                                            <td>{i + 1}</td>
                                            <td className="whitespace-nowrap">{dateFormat(item.createdAt)}</td>
                                            <td>
                                                <ContextMenuTrigger id={`menu-${item.id}`}>{item.name}</ContextMenuTrigger>
                                            </td>
                                            <td>{item.address.split(',')[0]}</td>
                                            <td>{item.asramaId}</td>
                                            <td>{item.kelasId}</td>
                                            <td>{item.keluhans.join(', ')}</td>
                                            <td>{item.description}</td>
                                            <td>{item.room}</td>
                                            <td>{calculateDay} Hari</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {data.map((user: any) => (
                            <ContextMenu id={`menu-${user.id}`} key={user.id}>
                                <Submenu title="Keluar Ke">
                                    <ContextMenuItem onClick={() => handleReturn(user, 'ASRAMA')}>Asrama</ContextMenuItem>
                                    <ContextMenuItem onClick={() => handleReturn(user, 'RS')}>RS</ContextMenuItem>
                                    <ContextMenuItem onClick={() => handleReturn(user, 'RUMAH')}>Rumah</ContextMenuItem>
                                </Submenu>
                            </ContextMenu>
                        ))}
                    </div>
                ) : (
                    <SwipeableListPage data={data} asrama={asrama} kelas={kelas} keluhans={keluhans} />
                )}
            </div>
            {/* modal  */}
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" open={modal} onClose={() => handleModalClose()}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                        <div className="flex min-h-screen items-start justify-center px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                        <div className="text-lg font-bold">Tambah Data</div>
                                        <button type="button" className="text-white-dark hover:text-dark" onClick={() => handleModalClose()}>
                                            <IconX />
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <FormInap type={type} kelas={kelas} asrama={asrama} keluhan={keluhans} modalClose={handleModalClose} />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Table;
