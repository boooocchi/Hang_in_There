import { useRouter } from 'next/router';
import React from 'react';
// import { useDebounce } from 'use-debounce';

const SearchInput = () => {
  const router = useRouter();
  const [searchText, setSearchText] = React.useState(router.query.search || '');
  // const [query] = useDebounce(searchText, 500);

  // React.useEffect(() => {
  //   if (query) {
  //     router.push(`/searchResult?search=${query}`);
  //   } else {
  //     router.push(`/`);
  //   }
  // }, [query, router]);

  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#00110F"
        className="w-4 h-4 absolute left-3 top-[5px]"
      >
        <path strokeLinecap="square" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
      <input
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="search your wardrobe"
        value={searchText}
        type="text"
        className="   w-[250px] h-7 mr-sm p-sm pl-xl  text-sm rounded-md bg-lightGreen"
      />
    </div>
  );
};

export default SearchInput;
