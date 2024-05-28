'use client';
import { returnMaster } from '@/actions/master';
import IconX from '@/components/icon/icon-x';
import { calculateDaysFromNow, cn, dateFormat } from '@/lib/utils';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list';
import Swal from 'sweetalert2';

// const leadingActions = (data: any) => {
//     const [modal1, setModal1] = useState(false);
//     return (
//         <>
//             <LeadingActions>
//                 <SwipeAction onClick={() => setModal1(true)}>Info</SwipeAction>
//             </LeadingActions>

//             <Transition appear show={modal1} as={Fragment}>
//                 <Dialog as="div" open={modal1} onClose={() => setModal1(false)}>
//                     <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
//                         <div className="fixed inset-0" />
//                     </Transition.Child>
//                     <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
//                         <div className="flex min-h-screen items-start justify-center px-4">
//                             <Transition.Child
//                                 as={Fragment}
//                                 enter="ease-out duration-300"
//                                 enterFrom="opacity-0 scale-95"
//                                 enterTo="opacity-100 scale-100"
//                                 leave="ease-in duration-200"
//                                 leaveFrom="opacity-100 scale-100"
//                                 leaveTo="opacity-0 scale-95"
//                             >
//                                 <Dialog.Panel as="div" className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
//                                     <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
//                                         <div className="text-lg font-bold">Detail</div>
//                                         <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal1(false)}>
//                                             <IconX />
//                                         </button>
//                                     </div>
//                                     <div className="p-5">
//                                         <div className="space-y-1">
//                                             <div className="flex items-center space-x-1">
//                                                 <div className="w-16">Name</div>
//                                                 <div>:</div>
//                                                 <div>{data.name}</div>
//                                             </div>
//                                             <div className="flex space-x-1">
//                                                 <div className="w-16">Address</div>
//                                                 <div>:</div>
//                                                 <div>{data.address}</div>
//                                             </div>
//                                             <div className="flex space-x-1">
//                                                 <div className="w-16">Asrama</div>
//                                                 <div>:</div>
//                                                 <div>{data.asramaId}</div>
//                                             </div>
//                                             <div className="flex space-x-1">
//                                                 <div className="w-16">Kelas</div>
//                                                 <div>:</div>
//                                                 <div>{data.kelasId}</div>
//                                             </div>
//                                             <div className="flex space-x-1">
//                                                 <div className="w-16">Keluhan</div>
//                                                 <div>:</div>
//                                                 <div>{data.keluhans.join(', ')}</div>
//                                             </div>
//                                             <div className="flex space-x-1">
//                                                 <div className="w-16">Ket</div>
//                                                 <div>:</div>
//                                                 <div>{data.description}</div>
//                                             </div>
//                                             <div className="flex space-x-1">
//                                                 <div className="w-16">Masuk</div>
//                                                 <div>:</div>
//                                                 <div>{dateFormat(data.createdAt)}</div>
//                                             </div>
//                                         </div>
//                                         <div className="mt-8 flex items-center justify-end">
//                                             <button type="button" className="btn btn-outline-danger" onClick={() => setModal1(false)}>
//                                                 Close
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </Dialog.Panel>
//                             </Transition.Child>
//                         </div>
//                     </div>
//                 </Dialog>
//             </Transition>
//         </>
//     );
// };

// const trailingActions = (data: any) => {
//     const [modal1, setModal1] = useState(false);

//     const handleSubmit = async (returnTo: string) => {
//         setModal1(false);
//         returnMaster(data.id, returnTo).then((data) => {
//             if (data.success) {
//                 Swal.fire({ title: 'Returned!', text: 'Successfully!', icon: 'success', customClass: 'sweet-alerts' });
//             } else {
//                 alert('something went wrong!');
//             }
//         });
//     };

//     return (
//         <>
//             <TrailingActions>
//                 <SwipeAction onClick={() => setModal1(true)}>Pulang</SwipeAction>
//             </TrailingActions>

//             <Transition appear show={modal1} as={Fragment}>
//                 <Dialog as="div" open={modal1} onClose={() => setModal1(false)}>
//                     <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
//                         <div className="fixed inset-0" />
//                     </Transition.Child>
//                     <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
//                         <div className="flex min-h-screen items-start justify-center px-4">
//                             <Transition.Child
//                                 as={Fragment}
//                                 enter="ease-out duration-300"
//                                 enterFrom="opacity-0 scale-95"
//                                 enterTo="opacity-100 scale-100"
//                                 leave="ease-in duration-200"
//                                 leaveFrom="opacity-100 scale-100"
//                                 leaveTo="opacity-0 scale-95"
//                             >
//                                 <Dialog.Panel as="div" className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
//                                     <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
//                                         <div className="text-lg font-bold">{data.name}</div>
//                                         <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal1(false)}>
//                                             <IconX />
//                                         </button>
//                                     </div>
//                                     <div className="space-y-2 p-5">
//                                         <button onClick={() => handleSubmit('ASRAMA')} className="btn btn-info block w-full">
//                                             ASRAMA
//                                         </button>
//                                         <button onClick={() => handleSubmit('RS')} className="btn btn-warning block w-full">
//                                             RS
//                                         </button>
//                                         <button onClick={() => handleSubmit('RUMAH')} className="btn btn-secondary block w-full">
//                                             RUMAH
//                                         </button>
//                                         {/* <div className="mt-8 flex items-center justify-end">
//                                             <button type="button" className="btn btn-outline-danger" onClick={() => setModal1(false)}>
//                                                 Discard
//                                             </button>
//                                             <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => setModal1(false)}>
//                                                 Save
//                                             </button>
//                                         </div> */}
//                                     </div>
//                                 </Dialog.Panel>
//                             </Transition.Child>
//                         </div>
//                     </div>
//                 </Dialog>
//             </Transition>
//         </>
//     );
// };

const SwipeableListPage = ({ data, kelas, asrama, keluhans }: { data: any; kelas: any; asrama: any; keluhans: any }) => {
    const [modalInfo, setModalInfo] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
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

    const trailingActions = (data: any) => (
        <TrailingActions>
            <SwipeAction
                onClick={() => {
                    setUser(data);
                    setModalConfirm(true);
                }}
            >
                Keluar
            </SwipeAction>
        </TrailingActions>
    );

    const handleReturn = async (returnTo: string) => {
        setModalConfirm(false);
        returnMaster(user.id, returnTo).then((data) => {
            if (data.success) {
                Swal.fire({ title: 'Returned!', text: 'Successfully!', icon: 'success', customClass: 'sweet-alerts' });
                setUser({});
            } else {
                Swal.fire({ title: 'Error!', text: 'Somethiung went wrong!', icon: 'error', customClass: 'sweet-alerts' });
                setUser({});
            }
        });
    };
    return (
        <div>
            <SwipeableList>
                {data.map((item: any, i: number) => {
                    const calculateDay = calculateDaysFromNow(item.createdAt);
                    return (
                        <SwipeableListItem
                            // className="dark:bg-[#1b2e4b] dark:text-white-dark"
                            leadingActions={leadingActions(item)}
                            trailingActions={trailingActions(item)}
                        >
                            <div
                                // className="flex w-full items-center space-x-3 p-0 px-2 py-1 dark:bg-[#1b2e4b] dark:text-white-dark"
                                className={cn(
                                    'flex w-full items-center space-x-3 p-0 px-2 py-1 shadow',
                                    calculateDay >= 3 ? (calculateDay >= 5 ? 'border-danger/20 bg-danger/20 ' : ' border-warning/20 bg-warning/20') : 'border-dark-dark-light bg-dark-dark-light'
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
            <Transition appear show={modalConfirm} as={Fragment}>
                <Dialog as="div" open={modalConfirm} onClose={() => setModalConfirm(false)}>
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
                                        <div className="text-lg font-bold">{user?.name}</div>
                                        <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModalConfirm(false)}>
                                            <IconX />
                                        </button>
                                    </div>
                                    <div className="space-y-2 p-5">
                                        <button onClick={() => handleReturn('ASRAMA')} className="btn btn-info block w-full">
                                            ASRAMA
                                        </button>
                                        <button onClick={() => handleReturn('RS')} className="btn btn-warning block w-full">
                                            RS
                                        </button>
                                        <button onClick={() => handleReturn('RUMAH')} className="btn btn-secondary block w-full">
                                            RUMAH
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {/* end modal return */}
        </div>
    );
};

export default SwipeableListPage;
