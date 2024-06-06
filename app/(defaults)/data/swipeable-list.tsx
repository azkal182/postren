'use client';
import IconX from '@/components/icon/icon-x';
import { calculateDays, calculateDaysFromNow, cn, dateFormat } from '@/lib/utils';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction } from 'react-swipeable-list';

const SwipeableListPage = ({ data }: { data: any }) => {
    const [modalInfo, setModalInfo] = useState(false);
    const [user, setUser] = useState<any>({});

    const leadingActions = (data: any) => (
        <LeadingActions>
            <SwipeAction
                onClick={() => {
                    setUser(data);
                    setModalInfo(true);
                }}
            >
                Info
            </SwipeAction>
        </LeadingActions>
    );

    return (
        <div>
            {' '}
            <div>
                <SwipeableList>
                    {data.map((item: any, i: number) => {
                        const calculateDay = item.returnAt ? calculateDays(item.createdAt, item.returnAt) : calculateDaysFromNow(item.createdAt);
                        return (
                            <SwipeableListItem key={item.id} leadingActions={leadingActions(item)}>
                                <div
                                    // className="flex w-full items-center space-x-3 p-0 px-2 py-1 dark:bg-[#1b2e4b] dark:text-white-dark"

                                    className={cn(
                                        'flex w-full items-center space-x-3 p-0 px-2 py-1 shadow',
                                        item?.returnTo === null
                                            ? 'border-dark-dark-light bg-dark-dark-light'
                                            : item?.returnTo === 'RUMAH'
                                            ? 'border-primary/20 bg-primary/20'
                                            : item?.returnTo === 'RS'
                                            ? 'border-danger/20 bg-danger/20 '
                                            : ' border-success/20 bg-success/20'
                                    )}
                                >
                                    <div>{i + 1}</div>
                                    <div className="w-full">
                                        <h1 className="p-0 text-lg font-semibold">{item.name}</h1>
                                        <div>{`${item.address.split(',')[0]}, ${item.asramaId}, ${item.kelasId}`}</div>
                                        <div className="font-semibold">{item.keluhans.join(', ')}</div>
                                    </div>
                                    <div className="ml-auto text-center">{calculateDay} Hari</div>
                                    {/* <div>Batuk</div> */}
                                </div>
                            </SwipeableListItem>
                        );
                    })}
                </SwipeableList>

                {/* Modal Info */}
                <Transition appear show={modalInfo} as={Fragment}>
                    <Dialog as="div" open={modalInfo} onClose={() => setModalInfo(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
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
                                            <div className="text-lg font-bold">Detail</div>
                                            <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModalInfo(false)}>
                                                <IconX />
                                            </button>
                                        </div>
                                        <div className="p-5">
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-1">
                                                    <div className="w-16">Name</div>
                                                    <div>:</div>
                                                    <div>{user?.name}</div>
                                                </div>
                                                <div className="flex space-x-1">
                                                    <div className="w-16">Address</div>
                                                    <div>:</div>
                                                    <div>{user?.address}</div>
                                                </div>
                                                <div className="flex space-x-1">
                                                    <div className="w-16">Asrama</div>
                                                    <div>:</div>
                                                    <div>{user?.asramaId}</div>
                                                </div>
                                                <div className="flex space-x-1">
                                                    <div className="w-16">Kelas</div>
                                                    <div>:</div>
                                                    <div>{user?.kelasId}</div>
                                                </div>
                                                <div className="flex space-x-1">
                                                    <div className="w-16">Keluhan</div>
                                                    <div>:</div>
                                                    <div>{user?.keluhans ? user?.keluhans.join(', ') : ''}</div>
                                                </div>
                                                <div className="flex space-x-1">
                                                    <div className="w-16">Ket</div>
                                                    <div>:</div>
                                                    <div>{user?.description}</div>
                                                </div>
                                                <div className="flex space-x-1">
                                                    <div className="w-16">Masuk</div>
                                                    <div>:</div>
                                                    <div>{user?.createdAt ? dateFormat(user?.createdAt) : ''}</div>
                                                </div>
                                                <div className="flex space-x-1">
                                                    <div className="w-16">Keluar</div>
                                                    <div>:</div>
                                                    <div>{user?.returnAt ? dateFormat(user?.createdAt) : '-'}</div>
                                                </div>
                                                <div className="flex space-x-1">
                                                    <div className="w-16">Status</div>
                                                    <div>:</div>
                                                    <div>{user?.returnTo ? user?.returnTo : 'UKS'}</div>
                                                </div>
                                            </div>
                                            <div className="mt-8 flex items-center justify-end">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setModalInfo(false)}>
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
                {/* end Modal Info */}
            </div>
        </div>
    );
};

export default SwipeableListPage;
