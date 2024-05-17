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
import { createMaster } from '@/actions/master';
import IconPencil from '@/components/icon/icon-pencil';
import Tippy from '@tippyjs/react';

type formCreateMaster = z.infer<typeof CreateMaster>;

type namesOption = {
    value: string;
    label: string;
    name: string;
    address: string;
};

const Table = ({ data, kelas, asrama, keluhans }: { data: any; kelas: any; asrama: any; keluhans: any }) => {
    const [modal, setModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState<namesOption | null | undefined>(null);

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
        createMaster(values).then((val) => {
            if (val.success) {
                setModal(false);
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

    return (
        <>
            {' '}
            <div className="mb-4.5 flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div className="flex flex-wrap items-center">
                    <button className="btn btn-primary" onClick={() => setModal(true)}>
                        Tambah
                    </button>
                </div>
                <input type="text" className="form-input w-auto" placeholder="Search..." value=""></input>
            </div>
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
                        {data.map((item: any, i: number) => (
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
                                <td>
                                    <Tippy content="Pulang">
                                        <button type="button" className="btn btn-warning h-8 w-8 rounded-full p-0">
                                            <IconPencil className="h-4 w-4" />
                                        </button>
                                    </Tippy>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* modal  */}
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" open={modal} onClose={() => setModal(false)}>
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
                                        <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal(false)}>
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
                                                                        <Select
                                                                            {...field}
                                                                            classNamePrefix="addl-class"
                                                                            options={kelasOptions}
                                                                            value={kelasOptions.find((c: any) => c.value === field.value)}
                                                                            onChange={(val) => {
                                                                                // console.log(val);
                                                                                field.onChange(val?.value);
                                                                            }}
                                                                            isClearable
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
                                                                        <CreatableSelect
                                                                            {...field}
                                                                            classNamePrefix="addl-class"
                                                                            options={asramaOptions}
                                                                            value={asramaOptions.find((c: any) => c.value === field.value)}
                                                                            onChange={(val) => {
                                                                                field.onChange(val.value);
                                                                            }}
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
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setModal(false)}>
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
