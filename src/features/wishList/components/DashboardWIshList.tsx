import { useQuery, useMutation } from '@apollo/client';
import React from 'react';

import { ListIcon } from '@/components/elements/icons/icons';
import { useToast } from '@/contexts/ToastContext';
import { WISH_LIST_STATUS_UPDATE } from '@/features/wishList/graphql/mutation';
import { WISH_LIST_QUERY } from '@/features/wishList/graphql/query';
import { cacheUpdateFunction } from '@/features/wishList/utils/utils';
import { useAuth } from '@/hooks/useAuth';
import { getErrorMessage } from '@/utils/errorHandler';

const DashboardWIshList = () => {
  const { userId } = useAuth();
  const { data: wishListData } = useQuery(WISH_LIST_QUERY, {
    variables: {
      userId,
    },
  });

  const { addToastMessage } = useToast();

  const [updateItemStatus] = useMutation(WISH_LIST_STATUS_UPDATE, {
    update: (cache, data) => cacheUpdateFunction(cache, data, 'STATUS_UPDATE', userId),
  });

  const handleItemStatus = async (id: string, checked: boolean) => {
    if (!checked) {
      try {
        await updateItemStatus({
          variables: {
            id,
            checked: true,
          },
        });
      } catch (error) {
        addToastMessage(getErrorMessage(error), true);
      }
    }
  };
  return (
    <div className="w-full h-full rounded-md flex gap-md py-md bg-darkGray shadow-md p-md">
      <div className="w-full h-full flex  flex-col gap-sm">
        <h2 className=" text-base text-center  items-center flex justify-cente gap-sm font-extraBold  ">
          <span className="h-8 w-8 bg-middleGreen flex items-center justify-center rounded-md">
            <ListIcon style="fill-none stroke-gray" />
          </span>
          <span className="whitespace-nowrap">Wish List</span>
        </h2>

        {wishListData?.wishList.length > 0 && (
          <div className="h-full  overflow-y-scroll w-full px-2xl">
            <ul className="h-full w-full  ">
              {wishListData?.wishList.map((item: { itemName: string; id: string; checked: boolean }) => {
                if (item.checked) return null;
                return (
                  <li
                    key={item.id}
                    className="border-dotted border-b border-middleGreen h-9 w-full flex items-center justify-start gap-3 text-richGreen"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-accentOrange border-accentOrange
            focus:ring-0 ring-0 rounded-sm form-checkbox bg-darkGray"
                      onChange={() => handleItemStatus(item.id, item.checked)}
                    />

                    <span className="w-full truncate">{item.itemName}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardWIshList;

{
  /* <Link
href="/wishList"
className="text-accentOrange font-boldest rounded-md border-1  border-accentOrange w-[70px] text-center text-sm p-xs inline-block hover:bg-accentOrange hover:text-gray duration-300"
>
view
</Link> */
}
