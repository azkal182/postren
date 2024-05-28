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

const Table = ({ data, kelas, asrama, keluhans }: { data: any; kelas: any; asrama: any; keluhans: any }) => {
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState<namesOption | null | undefined>(null);
    const [kelasLoading, setKelasLoading] = useState(false);
    const [asramaLoading, setAsramaLoading] = useState(false);
    const [kelasValue, setKelasValue] = useState<Option | null>();
    const [asramaValue, setAsramaValue] = useState<Option | null>();
    const [optimisticDatas, addOptimisticData] = useOptimistic(data, (state, newDatas) => {
        return [...state, newDatas];
    });
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }
        replace(`${pathName}?${params.toString()}`);
    }, 300);

    const { width } = useScreenSize();
    let screenSize: any = '';

    if (width < 600) {
        screenSize = 'sm';
    } else if (width >= 600 && width < 960) {
        screenSize = 'md';
    } else {
        screenSize = 'lg';
    }

    const form = useForm<formCreateMaster>({
        resolver: zodResolver(CreateMaster),
        defaultValues: {
            studentId: 'StudentId',
            sex: 'LK',
            room: 'MELATI',
        },
    });

    const namesOptions = (inputValue: string) =>
        new Promise<namesOption[]>((resolve) => {
            resolve(searchUser(inputValue));
        });

    const onSubmit = async (values: formCreateMaster) => {
        addOptimisticData({ ...values, createdAt: Date.now() });
        setModal(false);
        setIsLoading(true);
        createMaster(values).then((val) => {
            setIsLoading(false);
            if (val.success) {
                const toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    showCloseButton: true,
                    customClass: {
                        popup: `color-success`,
                    },
                });
                toast.fire({
                    title: 'Data Berhasil ditambahkan!',
                });

                form.reset();
            } else {
                alert('Something went wrong!');
            }
        });
    };

    function dateFormat(tanggal: any) {
        const date = new Date(tanggal);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        // @ts-ignore
        const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date);
        return formattedDate;
    }

    const asramaOptions = asrama.map((value: any) => {
        return { label: value.name, value: value.name };
    });

    const kelasOptions = kelas.map((value: any) => {
        return { label: value.name, value: value.name };
    });

    const keluhanOptions = keluhans.map((value: any) => {
        return { label: value.name, value: value.name };
    });

    const handleCreateKelas = async (inputValue: string) => {
        setKelasLoading(true);
        const newOption = await createKelas(inputValue);
        setKelasLoading(false);
        setKelasValue({ label: newOption.name, value: newOption.name });
    };

    const handleCreateAsrama = async (inputValue: string) => {
        setAsramaLoading(true);
        const newOption = await createAsrama(inputValue);
        setAsramaLoading(false);
        setAsramaValue({ label: newOption.name, value: newOption.name });
    };

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
        form.reset();
        setModal(false);
    };

    // console.log({ screenSize });

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
                    <input
                        type="text"
                        className="form-input w-auto"
                        placeholder="Search..."
                        onChange={(e) => handleSearch(e.target.value)}
                        defaultValue={searchParams.get('search')?.toString()}
                    ></input>
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
                                {optimisticDatas.map((item: any, i: number) => {
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
                                            <td>{dateFormat(item.createdAt)}</td>
                                            <td>
                                                <ContextMenuTrigger id={`menu-${item.id}`}>{item.name}</ContextMenuTrigger>
                                            </td>
                                            <td>{item.address.split(',')[0]}</td>
                                            <td>{item.asramaId}</td>
                                            <td>{item.kelasId}</td>
                                            <td>{item.keluhans.join(', ')}</td>
                                            <td>{item.description}</td>
                                            <td>{item.room}</td>
                                            <td>
                                                {/* <Tippy content="Pulang">
                                                <button type="button" className="btn btn-warning h-8 w-8 rounded-full p-0">
                                                    <IconPencil className="h-4 w-4" />
                                                </button>
                                            </Tippy> */}
                                                {calculateDay} Hari
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {optimisticDatas.map((user: any) => (
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
                                        <Form {...form}>
                                            <form id="createMaster" onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem className="flex">
                                                            <FormLabel className="w-32 py-2">Name</FormLabel>
                                                            <div className={`${form.formState.errors.name ? 'has-error' : ''} w-full`}>
                                                                <FormControl className="">
                                                                    {/* <input {...field} type="text" placeholder="John Doe" className={`form-input w-full text-base`} /> */}
                                                                    <div className="custom-select">
                                                                        <AsyncSelect
                                                                            autoFocus
                                                                            {...field}
                                                                            onChange={(value) => {
                                                                                const finalValue = {
                                                                                    value: value?.name,
                                                                                    label: value?.name,
                                                                                    address: value?.address,
                                                                                    studentId: value?.value,
                                                                                };
                                                                                // @ts-ignore
                                                                                setSelectedValue(finalValue);
                                                                                form.setValue('address', finalValue?.address ? finalValue?.address : '');
                                                                                form.setValue('studentId', finalValue?.studentId ? finalValue?.studentId : '');
                                                                                field.onChange(finalValue.value);
                                                                            }}
                                                                            value={selectedValue}
                                                                            cacheOptions
                                                                            defaultOptions
                                                                            loadOptions={namesOptions}
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="address"
                                                    render={({ field }) => (
                                                        <FormItem className="flex">
                                                            <FormLabel className="w-32 py-2">Address</FormLabel>
                                                            <div className={`${form.formState.errors.address ? 'has-error' : ''} w-full`}>
                                                                <FormControl className="">
                                                                    <input {...field} type="text" placeholder="Address" className={`form-input w-full text-base`} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="kelasId"
                                                    render={({ field }) => (
                                                        <FormItem className="flex">
                                                            <FormLabel className="w-32 py-2">Kelas</FormLabel>
                                                            <div className={`${form.formState.errors.kelasId ? 'has-error' : ''} w-full`}>
                                                                <FormControl className="">
                                                                    {/* <input {...field} type="text" placeholder="Kelas" className={`form-input w-full text-base`} /> */}
                                                                    <div className="custom-select">
                                                                        {/* <Select
                                                                            {...field}
                                                                            classNamePrefix="addl-class"
                                                                            options={kelasOptions}
                                                                            value={kelasOptions.find((c: any) => c.value === field.value)}
                                                                            onChange={(val) => {
                                                                                // console.log(val);
                                                                                field.onChange(val?.value);
                                                                            }}
                                                                            isClearable
                                                                        /> */}
                                                                        <CreatableSelect
                                                                            {...field}
                                                                            isClearable
                                                                            isDisabled={kelasLoading}
                                                                            isLoading={kelasLoading}
                                                                            onChange={(newValue) => field.onChange(newValue.value)}
                                                                            onCreateOption={handleCreateKelas}
                                                                            options={kelasOptions}
                                                                            value={kelasOptions.find((c: any) => c.value === field.value)}
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="asramaId"
                                                    render={({ field }) => (
                                                        <FormItem className="flex">
                                                            <FormLabel className="w-32 py-2">Asrama</FormLabel>
                                                            <div className={`${form.formState.errors.asramaId ? 'has-error' : ''} w-full`}>
                                                                <FormControl className="">
                                                                    {/* <input {...field} type="text" placeholder="Asrama" className={`form-input w-full text-base`} /> */}
                                                                    <div className="custom-select">
                                                                        {/* <CreatableSelect
                                                                            {...field}
                                                                            classNamePrefix="addl-class"
                                                                            options={asramaOptions}
                                                                            value={asramaOptions.find((c: any) => c.value === field.value)}
                                                                            onChange={(val) => {
                                                                                field.onChange(val.value);
                                                                            }}
                                                                        /> */}

                                                                        <CreatableSelect
                                                                            {...field}
                                                                            isClearable
                                                                            isDisabled={asramaLoading}
                                                                            isLoading={asramaLoading}
                                                                            onChange={(newValue) => field.onChange(newValue.value)}
                                                                            onCreateOption={handleCreateAsrama}
                                                                            options={asramaOptions}
                                                                            value={asramaOptions.find((c: any) => c.value === field.value)}
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="keluhans"
                                                    render={({ field }) => (
                                                        <FormItem className="flex">
                                                            <FormLabel className="w-32 py-2">Keluhan</FormLabel>
                                                            <div className={`${form.formState.errors.keluhans ? 'has-error' : ''} w-full`}>
                                                                <FormControl className="">
                                                                    {/* <input {...field} type="text" placeholder="Asrama" className={`form-input w-full text-base`} /> */}
                                                                    <div className="custom-select">
                                                                        <Select
                                                                            {...field}
                                                                            classNamePrefix="addl-class"
                                                                            options={keluhanOptions}
                                                                            value={keluhanOptions.find((c: any) => c.value === field.value)}
                                                                            onChange={(val) => {
                                                                                const values = val.map((item) => item.value);
                                                                                console.log(values);

                                                                                field.onChange(values);
                                                                            }}
                                                                            isMulti
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="description"
                                                    render={({ field }) => (
                                                        <FormItem className="flex">
                                                            <FormLabel className="w-32 py-2">Description</FormLabel>
                                                            <div className={`${form.formState.errors.description ? 'has-error' : ''} w-full`}>
                                                                <FormControl className="">
                                                                    <input {...field} type="text" placeholder="Keterangan" className={`form-input w-full text-base`} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="room"
                                                    render={({ field }) => (
                                                        <FormItem className="flex">
                                                            <FormLabel className="w-32 py-2">Ruang</FormLabel>
                                                            <div className={`${form.formState.errors.room ? 'has-error' : ''} w-full`}>
                                                                <FormControl className="">
                                                                    <input {...field} type="text" placeholder="Asrama" className={`form-input w-full text-base`} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />
                                            </form>
                                        </Form>
                                        <div className="mt-8 flex items-center justify-end">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => handleModalClose()}>
                                                Discard
                                            </button>
                                            <button type="submit" form="createMaster" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Save
                                            </button>
                                        </div>
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
