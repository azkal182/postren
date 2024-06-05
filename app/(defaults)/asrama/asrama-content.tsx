'use client';
import SearchBox from '@/components/inap/search-box';
import React from 'react';

const AsramaContent = () => {
    return (
        <div>
            {' '}
            <h1 className="text-center text-lg font-bold">DATA SANTRI</h1>
            <div className="panel">
                <div className="flex">
                    <SearchBox />
                </div>
            </div>
        </div>
    );
};

export default AsramaContent;
