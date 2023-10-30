'use client';

import { OfficeBuildingIcon } from '@heroicons/react/solid';
import { SearchIcon } from '@heroicons/react/outline';
import { useDebouncedCallback } from 'use-debounce';
import { SearchResult } from '../lib/definitions';
import { useState } from 'react';
import { fetchSearchResults } from '../lib/actions';

export default function Search() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // const handleSearch = (term:any) => {}

  const handleSearch = useDebouncedCallback(async (term) => {
    console.log(term);
    if(term) {
      const res = await fetchSearchResults(term);
      if(res) setSearchResults(res);
      else setSearchResults([]);
    } else setSearchResults([]);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0 mb-3">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={"Search..."}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      {searchResults.length!==0 && <div className='absolute top-11 peer block w-full rounded-md border border-gray-200 bg-white py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 max-h-60 overflow-y-auto'>
        <ul className='ml-0 pl-0'>
          {searchResults.map((searchRes) => (
            <li>
              <div
                key={4}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="mb-2 flex items-center">
                    <OfficeBuildingIcon width={20} height={20} />
                    <p>{searchRes["2. name"]}</p>
                  </div>
                  <p className="text-sm text-gray-500">{searchRes["1. symbol"]}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>}
      
    </div>
  );
}


