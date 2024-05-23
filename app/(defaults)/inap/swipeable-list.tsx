'use client';
import React from 'react';
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list';
const leadingActions = () => (
    <LeadingActions>
        <SwipeAction onClick={() => console.info('swipe action triggered')}>Info</SwipeAction>
    </LeadingActions>
);

const trailingActions = () => (
    <TrailingActions>
        <SwipeAction onClick={() => alert('swipe action triggered')}>Pulang</SwipeAction>
    </TrailingActions>
);

const SwipeableListPage = ({ data, kelas, asrama, keluhans }: { data: any; kelas: any; asrama: any; keluhans: any }) => {
    return (
        <div>
            <SwipeableList>
                {data.map((item: any, i: number) => (
                    <SwipeableListItem className="dark:bg-[#1b2e4b] dark:text-white-dark" leadingActions={leadingActions()} trailingActions={trailingActions()}>
                        <div className="flex w-full items-center space-x-3 p-0 px-2 py-1 dark:bg-[#1b2e4b] dark:text-white-dark">
                            <div>{i + 1}</div>
                            <div>
                                <h1 className="p-0 text-lg font-semibold">{item.name}</h1>
                                <div>{`${item.address.split(',')[0]}, ${item.asramaId}, ${item.kelasId}`}</div>
                                <div className="font-semibold">{item.keluhans.join(', ')}</div>
                            </div>
                            {/* <div>Batuk</div> */}
                        </div>
                    </SwipeableListItem>
                ))}
            </SwipeableList>
        </div>
    );
};

export default SwipeableListPage;
