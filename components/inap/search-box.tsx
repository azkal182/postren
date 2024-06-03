'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

const SearchBox = () => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }
        replace(`${pathName}?${params.toString()}`);
    }, 300);
    return <input type="text" className="form-input w-auto" placeholder="Search..." onChange={(e) => handleSearch(e.target.value)} defaultValue={searchParams.get('search')?.toString()}></input>;
};

export default SearchBox;
