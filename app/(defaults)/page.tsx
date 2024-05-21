import { Metadata } from 'next';
import React from 'react';
import Dropdown from '@/components/dropdown';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots';
import IconEye from '@/components/icon/icon-eye';
import { db } from '@/lib/db';

export const metadata: Metadata = {
    title: 'Dashboard',
};

async function page() {
    const masterCount = await db.master.count({
        where: {
            returnAt: null,
        },
    });

    return (
        <div>
            <div className="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-4">
                <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Data UKS</div>
                        <div className="dropdown">
                            <Dropdown offset={[0, 5]} placement={`bottom-start`} btnClassName="hover:opacity-80" button={<IconHorizontalDots className="opacity-70 hover:opacity-80" />}>
                                <ul className="text-black dark:text-white-dark">
                                    <li>
                                        <button type="button">View Report</button>
                                    </li>
                                    <li>
                                        <button type="button">Edit Report</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {masterCount} </div>
                        <div className="badge bg-white/30">+ 2.35% </div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
                        Last Week 44,700
                    </div>
                </div>
                <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">User</div>
                        <div className="dropdown">
                            <Dropdown offset={[0, 5]} placement={`bottom-start`} btnClassName="hover:opacity-80" button={<IconHorizontalDots className="opacity-70 hover:opacity-80" />}>
                                <ul className="text-black dark:text-white-dark">
                                    <li>
                                        <button type="button">View Report</button>
                                    </li>
                                    <li>
                                        <button type="button">Edit Report</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 100 </div>
                        <div className="badge bg-white/30">+ 2.35% </div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
                        Last Week 44,700
                    </div>
                </div>
            </div>
            {/* <div className="panel mx-auto max-w-[550px] space-y-2 divide-y">
                <div className="flex items-center justify-between">
                    <div>Id</div>
                    <div>{session?.user?.id}</div>
                </div>
                <div className="flex items-center justify-between">
                    <div>Username</div>
                    <div>{session?.user?.username}</div>
                </div>
                <div className="flex items-center justify-between">
                    <div>name</div>
                    <div>{session?.user?.name}</div>
                </div>
                <div className="flex items-center justify-between">
                    <div>Role</div>
                    <div className="max-w-96 truncate">{session?.user?.role}</div>
                </div>
                <div className="flex items-center justify-between">
                    <div>Type</div>
                    <div className="max-w-96 truncate">{session?.user?.type}</div>
                </div>
                <div className="flex items-center justify-between">
                    <div>Expires</div>
                    <div>{session?.expires}</div>
                </div>

            </div> */}
        </div>
    );
}

export default page;
