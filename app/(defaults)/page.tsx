import { Metadata } from 'next';
import React from 'react';
import Dropdown from '@/components/dropdown';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots';
import IconEye from '@/components/icon/icon-eye';
import { db } from '@/lib/db';
import { auth } from '@/auth';
import ChartAsramaComponent from './chart-asrama';
import _ from 'lodash';
import ChartKeluhanComponent from './chart-keluhan';
import Link from 'next/link';
import { getAsramaGroup, getKeluhanGroup } from '@/lib/utils';
import moment from 'moment-timezone';
import ChartKeluhanLastMonth from './chart-keluhan-last-month';
import ChartAsramaLastMonth from './chart-asrama-last-month';

export const metadata: Metadata = {
    title: 'Dashboard',
};

async function page() {
    const session: any = await auth();
    const userCount = await db.user.count();
    const master = await db.master.findMany({
        where: {
            ...(session?.user?.type !== 'ALL' && { students: { sex: session?.user?.type } }),
        },
        include: {
            keluhans: true,
            asrama: true,
        },
    });

    const masterCountWithReturnNull = _.filter(master, (value) => value.returnAt === null).length;
    const masterWithReturnNull = _.filter(master, (value) => value.returnAt === null);

    const now = moment().tz('Asia/Jakarta');
    const firstDayOfLastMonth = now.clone().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
    const lastDayOfLastMonth = now.clone().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');

    const filteredDataLastMonth = _.filter(master, (item) => {
        const itemDate = new Date(item.createdAt);
        const firstDayDate = new Date(firstDayOfLastMonth);
        const lastDayDate = new Date(lastDayOfLastMonth);
        return itemDate >= firstDayDate && itemDate <= lastDayDate;
    });

    const asramaCounts = getAsramaGroup(masterWithReturnNull);
    const asramaLastMonth = getAsramaGroup(filteredDataLastMonth);
    const keluhanCounts = getKeluhanGroup(masterWithReturnNull);
    const keluhanLastMonth = getKeluhanGroup(filteredDataLastMonth);

    const finalResult = {
        asrama: asramaCounts,
        keluhan: keluhanCounts,
        lastMonth: keluhanLastMonth,
        asramaLastMonth: asramaLastMonth,
    };

    return (
        <div>
            <div className="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-4">
                <Link href={'/inap'} className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Data UKS</div>
                        {/* <div className="dropdown">
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
                        </div> */}
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {masterCountWithReturnNull} </div>
                    </div>
                </Link>
                {/* Sessions */}
                {session?.user?.role === 'ADMIN' && (
                    <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Users</div>
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
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {userCount} </div>
                            {/* <div className="badge bg-white/30">- 2.35% </div> */}
                        </div>
                        {/* <div className="mt-5 flex items-center font-semibold">
                        <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
                        Last Week 84,709
                    </div> */}
                    </div>
                )}

                {/*  Time On-Site */}
                {/*
                <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Time On-Site</div>
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
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 38,085 </div>
                        <div className="badge bg-white/30">+ 1.35% </div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
                        Last Week 37,894
                    </div>
                </div>
                */}
                {/* Bounce Rate */}
                {/*
                <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Bounce Rate</div>
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
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 49.10% </div>
                        <div className="badge bg-white/30">- 0.35% </div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
                        Last Week 50.01%
                    </div>
                </div>
                */}
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 text-white xl:grid-cols-2">
                <ChartKeluhanComponent data={finalResult.keluhan} />
                <ChartAsramaComponent data={finalResult.asrama} />
                <ChartKeluhanLastMonth data={finalResult.lastMonth} />
                <ChartAsramaLastMonth data={finalResult.asramaLastMonth} />
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
