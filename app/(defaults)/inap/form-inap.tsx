'use client';
import { createAsrama } from '@/actions/asrama';
import { createKelas, getKelas } from '@/actions/kelas';
import { createKeluhan } from '@/actions/keluhan';
import { createMaster } from '@/actions/master';
import { searchUser } from '@/actions/sidafa';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/form';
import { CreateMaster } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';
import Swal from 'sweetalert2';
import * as z from 'zod';

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

const reformat = (array: any) => {
    return array.map((item: any) => {
        return {
            value: item.name,
            label: item.name,
        };
    });
};

const FormInap = ({ kelas, asrama, keluhan, type, modalClose }: { kelas: any; asrama: any; keluhan: any; type: any; modalClose: any }) => {
    const [selectedValue, setSelectedValue] = useState<namesOption | null | undefined>(null);
    const [kelasOptions, setKelasOptions] = useState<any>(reformat(kelas));
    const [selectedKelas, setSelectedKelas] = useState<any>({});
    const [kelasLoading, setKelasLoading] = useState(false);

    const [asramaOptions, setAsramaOptions] = useState<any>(reformat(asrama));
    const [selectedAsrama, setSelectedAsrama] = useState<any>({});
    const [asramaLoading, setAsramaLoading] = useState(false);

    const [keluhanOptions, setKeluhanOptions] = useState<any>(reformat(keluhan));
    const [selectedKeluhan, setSelectedKeluhan] = useState<any>({});
    const [keluhanLoading, setKeluhanLoading] = useState(false);

    const handleCloseModal = () => {
        modalClose();
        form.reset();
    };

    const form = useForm<formCreateMaster>({
        resolver: zodResolver(CreateMaster),
        defaultValues: {
            studentId: 'StudentId',
            sex: type,
            room: 'MELATI',
        },
    });

    const namesOptions = (inputValue: string) =>
        new Promise<namesOption[]>((resolve) => {
            resolve(searchUser(inputValue));
        });

    const createOption = (label: string) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
    });

    const onSubmit = async (values: formCreateMaster) => {
        createMaster(values).then((val) => {
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
                handleCloseModal();
                form.reset();
            } else {
                alert('Something went wrong!');
            }
        });
    };

    const handleCreateKelas = async (values: string) => {
        setKelasLoading(true);
        createKelas(values, type).then((data) => {
            if (data.success) {
                const newOption = createOption(values);
                setKelasLoading(false);
                setKelasOptions((prev: any) => [...prev, newOption]);
                setSelectedKelas(newOption);
                form.setValue('kelasId', values);
            } else {
                alert('error');
            }
        });
    };

    const handleCreateAsrama = async (values: string) => {
        setAsramaLoading(true);
        createAsrama(values, type).then((data) => {
            if (data.success) {
                const newOption = createOption(values);
                setAsramaLoading(false);
                setAsramaOptions((prev: any) => [...prev, newOption]);
                setSelectedAsrama(newOption);
                form.setValue('asramaId', values);
            } else {
                alert('error');
            }
        });
    };

    const handleCreateKeluhan = async (values: string) => {
        setKeluhanLoading(true);
        createKeluhan(values).then((data) => {
            if (data.success) {
                const newOption = createOption(values);
                setKeluhanLoading(false);
                setKeluhanOptions((prev: any) => [...prev, newOption]);
                setSelectedKeluhan(newOption);
                form.setValue('asramaId', values);
            } else {
                alert('error');
            }
        });
    };

    return (
        <>
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
                                        <div className="custom-select">
                                            <CreatableSelect
                                                {...field}
                                                isClearable
                                                isDisabled={kelasLoading}
                                                isLoading={kelasLoading}
                                                onChange={(e) => {
                                                    setSelectedKelas(e);
                                                    field.onChange(e.value);
                                                }}
                                                onCreateOption={handleCreateKelas}
                                                options={kelasOptions}
                                                value={selectedKelas}
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
                                        <div className="custom-select">
                                            <CreatableSelect
                                                {...field}
                                                isClearable
                                                isDisabled={asramaLoading}
                                                isLoading={asramaLoading}
                                                onChange={(e) => {
                                                    setSelectedAsrama(e);
                                                    field.onChange(e.value);
                                                }}
                                                onCreateOption={handleCreateAsrama}
                                                options={asramaOptions}
                                                value={selectedAsrama}
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
                                        <div className="custom-select">
                                            <CreatableSelect
                                                {...field}
                                                classNamePrefix="addl-class"
                                                options={keluhanOptions}
                                                value={keluhanOptions.find((c: any) => c.value === field.value)}
                                                // value={keluhanValue}
                                                onChange={(val) => {
                                                    const values = val.map((item) => item.value);
                                                    // handleCreateKeluahn(values);
                                                    // console.log(values);
                                                    field.onChange(values);
                                                }}
                                                onCreateOption={(inputValue) => handleCreateKeluhan(inputValue)}
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
                <button type="button" className="btn btn-outline-danger" onClick={() => handleCloseModal()}>
                    Discard
                </button>
                <button type="submit" form="createMaster" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                    Save
                </button>
            </div>
        </>
    );
};

export default FormInap;
