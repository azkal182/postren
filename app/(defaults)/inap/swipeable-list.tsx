'use client';
import { calculateDaysFromNow, cn } from '@/lib/utils';
import React from 'react';
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list';
const leadingActions = (data: any) => (
    <LeadingActions>
        <SwipeAction onClick={() => console.info('swipe action triggered')}>Info</SwipeAction>
    </LeadingActions>
);

const trailingActions = (data: any) => (
    <TrailingActions>
        <SwipeAction onClick={() => alert('swipe action triggered')}>Pulang</SwipeAction>
    </TrailingActions>
);

const SwipeableListPage = ({ data, kelas, asrama, keluhans }: { data: any; kelas: any; asrama: any; keluhans: any }) => {
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
                                    'flex w-full items-center space-x-3 p-0 px-2 py-1',
                                    calculateDay >= 3 ? (calculateDay >= 5 ? ' bg-[#e7515a] text-white shadow-lg' : ' bg-[#e2a03f] text-white shadow-lg') : ' dark:bg-[#1b2e4b] dark:text-white-dark'
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
        </div>
    );
};

export default SwipeableListPage;
