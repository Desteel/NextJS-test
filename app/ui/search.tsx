'use client';

import { useDebouncedCallback } from 'use-debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ChangeEvent } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const SEARCH_DEBOUNCE_TIME = 300;

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      const value = event.target.value;

      params.set('page', '1');

      if (value) {
        params.set('query', value);
      } else {
        params.delete('query');
      }

      replace(`${pathname}?${params.toString()}`);
    },
    SEARCH_DEBOUNCE_TIME,
  );

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <input
        defaultValue={searchParams.get('query')?.toString()}
        onChange={handleSearch}
        placeholder={placeholder}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      />

      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
