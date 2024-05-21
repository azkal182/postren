import { changePasswordAction } from '@/actions/user';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/form';
import IconX from '@/components/icon/icon-x';
import { ChangePasswordSchema } from '@/schemas';
import { Dialog, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as z from 'zod';

type FormType = z.infer<typeof ChangePasswordSchema>;

const ChangePasswordDialog = ({ user, isOpen, onClose }: { user: any; isOpen: boolean; onClose: () => void }) => {
    const form = useForm<FormType>({
        resolver: zodResolver(ChangePasswordSchema),
    });

    const handleClose = () => {
        form.reset();
        onClose();
    };

    const handleSubmit = (values: FormType) => {
        changePasswordAction(values).then((data) => {
            if (data.success) {
                handleClose();
                Swal.fire({ title: 'Password Reseted!', text: 'password have been reset!.', icon: 'success', customClass: 'sweet-alerts' });
            } else {
                alert(data.error);
            }
        });
    };

    useEffect(() => {
        form.setValue('id', user.id);
    }, [user]);
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
                                <Dialog.Panel className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                        <div className="text-lg font-bold">Change Password for {user.name}</div>
                                        <button type="button" onClick={handleClose} className="text-white-dark hover:text-dark">
                                            <IconX />
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3" id="ChangePassForm">
                                                <FormField
                                                    control={form.control}
                                                    name="password"
                                                    render={({ field }) => (
                                                        <FormItem className="flex">
                                                            {/* <FormLabel className="w-52 py-2">New Password</FormLabel> */}
                                                            <div className={`${form.formState.errors.password ? 'has-error' : ''} w-full`}>
                                                                <FormControl className="">
                                                                    <input {...field} type="text" placeholder="New Password" className={`form-input w-full text-base`} />
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
                                                            {/* <FormLabel className="w-52 py-2">Confirm New Pass</FormLabel> */}
                                                            <div className={`${form.formState.errors.c_password ? 'has-error' : ''} w-full`}>
                                                                <FormControl className="">
                                                                    <input {...field} type="text" placeholder="Confirm New Password" className={`form-input w-full text-base`} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />
                                            </form>
                                        </Form>
                                        <div className="mt-8 flex items-center justify-end">
                                            <button type="button" onClick={handleClose} className="btn btn-outline-danger">
                                                Discard
                                            </button>
                                            <button form="ChangePassForm" type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
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
        </div>
    );
};

export default ChangePasswordDialog;
