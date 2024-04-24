import { useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react';

import { WISH_LIST_QUERY } from '@/features/wishList/graphql/query';
import { useAuth } from '@/hooks/useAuth';

const DashboardWIshList = () => {
  const { userId } = useAuth();
  const { data: wishListData } = useQuery(WISH_LIST_QUERY, {
    variables: {
      userId,
    },
  });
  return (
    <div className="w-full h-full   rounded-md   flex gap-6 border-2 border-lightGreen py-md bg-white">
      <div className="w-full h-full flex  ">
        <div className="flex flex-col gap-2 items-center justify-center border-r border-r-lightGreen w-[125px] min-w-[150px]  px-lg">
          <h2 className=" text-lg leading-[16px] text-center  items-center flex justify-center text-richGreen bg-white  font-extraBold  ">
            <span className=" whitespace-nowrap">Wish List</span>
          </h2>
          <Link
            href="/wishList"
            className="text-accentOrange font-boldest rounded-md border-1  border-accentOrange w-[70px] text-center text-sm p-xs inline-block hover:bg-accentOrange hover:text-gray duration-300"
          >
            view
          </Link>
        </div>
        {wishListData?.wishList.length > 0 && (
          <div className="h-full  overflow-y-scroll  bg-white w-full px-2xl">
            <ul className="h-full w-full  ">
              {wishListData?.wishList.map((item: { itemName: string; id: string }) => (
                <li
                  key={item.id}
                  className="border-b border-lightGreen h-9 w-full flex items-center justify-start gap-3 text-richGreen"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-accentOrange border-accentOrange
            focus:ring-0 ring-0 rounded-sm form-checkbox"
                  />

                  <span className="w-full truncate">{item.itemName}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardWIshList;
