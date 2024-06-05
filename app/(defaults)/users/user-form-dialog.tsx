'use client';
import { addUserAction, editUserAction } from '@/actions/user';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/form';
import IconX from '@/components/icon/icon-x';
import { AddUserSchema, EditUserSchema } from '@/schemas';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { v4 as uuid } from 'uuid';

type FormTypeAddUser = z.infer<typeof AddUserSchema>;
type FormTypeEditUser = z.infer<typeof EditUserSchema>;

const UserFormDialog = ({ user, isOpen, onClose }: { user?: any; isOpen: boolean; onClose: () => void }) => {
    const form = useForm<FormTypeAddUser>({
        resolver: zodResolver(AddUserSchema),
        defaultValues: { id: null },
    });

    const editForm = useForm<FormTypeEditUser>({
        resolver: zodResolver(EditUserSchema),
    });

    const saveUser = (values: FormTypeAddUser) => {
        addUserAction(values).then((data) => {
            if (data.success) {
                onClose();
            } else {
                alert('something went wrong');
            }
        });
    };

    const handleEdit = (values: FormTypeEditUser) => {
        editUserAction(values).then((data) => {
            if (data.success) {
                onClose();
            } else {
                alert('something went wrong');
            }
        });
    };

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        editForm.reset({
            id: user?.id || null,
            name: user?.name || '',
            username: user?.username || '',
            role: user?.role || null,
            type: user?.type || null,
        });
    }, [user]);

    useEffect(() => {
        form.reset();
    }, [isOpen]);

    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" open={isOpen} onClose={handleClose}>
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
                                        <div className="text-lg font-bold">{user ? 'Edit User' : 'Add User'}</div>
                                        <button type="button" className="text-white-dark hover:text-dark" onClick={() => onClose()}>
                                            <IconX />
                                        </button>
                                    </div>
                                    {user && (
                                        <div className="p-5">
                                            <Form {...editForm}>
                                                <form onSubmit={editForm.handleSubmit(handleEdit)} className="space-y-3" id="EditUserForm">
                                                    <FormField
                                                        control={editForm.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                            <FormItem className="flex">
                                                                <FormLabel className="w-32 py-2">Name</FormLabel>
                                                                <div className={`${form.formState.errors.name ? 'has-error' : ''} w-full`}>
                                                                    <FormControl className="">
                                                                        <input {...field} type="text" placeholder="Name" className={`form-input w-full text-base`} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={editForm.control}
                                                        name="username"
                                                        render={({ field }) => (
                                                            <FormItem className="flex">
                                                                <FormLabel className="w-32 py-2">Username</FormLabel>
                                                                <div className={`${form.formState.errors.username ? 'has-error' : ''} w-full`}>
                                                                    <FormControl className="">
                                                                        <input {...field} type="text" placeholder="Username" className={`form-input w-full text-base`} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={editForm.control}
                                                        name="role"
                                                        render={({ field }) => (
                                                            <FormItem className="flex">
                                                                <FormLabel className="w-32 py-2">Role</FormLabel>
                                                                <div className={`${form.formState.errors.role ? 'has-error' : ''} w-full`}>
                                                                    <FormControl className="">
                                                                        {/* <input {...field} type="password" placeholder="Confirm Password" className={`form-input w-full text-base`} /> */}
                                                                        <select {...field} className="form-select text-white-dark" required>
                                                                            <option>Select Role</option>
                                                                            <option value={'ADMIN'}>ADMIN</option>
                                                                            <option value={'USER'}>USER</option>
                                                                            <option value={'ASRAMA'}>ASRAMA</option>
                                                                        </select>
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={editForm.control}
                                                        name="type"
                                                        render={({ field }) => (
                                                            <FormItem className="flex">
                                                                <FormLabel className="w-32 py-2">Type</FormLabel>
                                                                <div className={`${form.formState.errors.type ? 'has-error' : ''} w-full`}>
                                                                    <FormControl className="">
                                                                        {/* <input {...field} type="password" placeholder="Confirm Password" className={`form-input w-full text-base`} /> */}
                                                                        <select {...field} className="form-select text-white-dark" required>
                                                                            <option>Select Type</option>
                                                                            <option value={'LK'}>LAKI-LAKI</option>
                                                                            <option value={'PR'}>PEREMPUAN</option>
                                                                            <option value={'ALL'}>ALL</option>
                                                                        </select>
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </form>
                                            </Form>
                                            <div className="mt-8 flex items-center justify-end">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => onClose()}>
                                                    Discard
                                                </button>
                                                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4" form="EditUserForm">
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {!user && (
                                        <div className="p-5">
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(saveUser)} className="space-y-3" id="AddUserFrom">
                                                    <FormField
                                                        control={form.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                            <FormItem className="flex">
                                                                <FormLabel className="w-32 py-2">Name</FormLabel>
                                                                <div className={`${form.formState.errors.name ? 'has-error' : ''} w-full`}>
                                                                    <FormControl className="">
                                                                        <input {...field} type="text" placeholder="Name" className={`form-input w-full text-base`} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="username"
                                                        render={({ field }) => (
                                                            <FormItem className="flex">
                                                                <FormLabel className="w-32 py-2">Username</FormLabel>
                                                                <div className={`${form.formState.errors.username ? 'has-error' : ''} w-full`}>
                                                                    <FormControl className="">
                                                                        <input {...field} type="text" placeholder="Username" className={`form-input w-full text-base`} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="password"
                                                        render={({ field }) => (
                                                            <FormItem className="flex">
                                                                <FormLabel className="w-32 py-2">Password</FormLabel>
                                                                <div className={`${form.formState.errors.password ? 'has-error' : ''} w-full`}>
                                                                    <FormControl className="">
                                                                        <input {...field} type="password" placeholder="Password" className={`form-input w-full text-base`} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="c_password"
                                                        render={({ field }) => (
                                                            <FormItem className="flex">
                                                                <FormLabel className="w-32 py-2">Confirm Password</FormLabel>
                                                                <div className={`${form.formState.errors.c_password ? 'has-error' : ''} w-full`}>
                                                                    <FormControl className="">
                                                                        <input {...field} type="password" placeholder="Confirm Password" className={`form-input w-full text-base`} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="role"
                                                        render={({ field }) => (
                                                            <FormItem className="flex">
                                                                <FormLabel className="w-32 py-2">Role</FormLabel>
                                                                <div className={`${form.formState.errors.role ? 'has-error' : ''} w-full`}>
                                                                    <FormControl className="">
                                                                        {/* <input {...field} type="password" placeholder="Confirm Password" className={`form-input w-full text-base`} /> */}
                                                                        <select {...field} className="form-select text-white-dark" required>
                                                                            <option>Select Role</option>
                                                                            <option value={'ADMIN'}>ADMIN</option>
                                                                            <option value={'USER'}>USER</option>
                                                                            <option value={'ASRAMA'}>ASRAMA</option>
                                                                        </select>
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="type"
                                                        render={({ field }) => (
                                                            <FormItem className="flex">
                                                                <FormLabel className="w-32 py-2">Type</FormLabel>
                                                                <div className={`${form.formState.errors.type ? 'has-error' : ''} w-full`}>
                                                                    <FormControl className="">
                                                                        {/* <input {...field} type="password" placeholder="Confirm Password" className={`form-input w-full text-base`} /> */}
                                                                        <select {...field} className="form-select text-white-dark" required>
                                                                            <option>Select Type</option>
                                                                            <option value={'LK'}>LAKI-LAKI</option>
                                                                            <option value={'PR'}>PEREMPUAN</option>
                                                                            <option value={'ALL'}>ALL</option>
                                                                        </select>
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </form>
                                            </Form>
                                            <div className="mt-8 flex items-center justify-end">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => onClose()}>
                                                    Discard
                                                </button>
                                                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4" form="AddUserFrom">
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default UserFormDialog;
