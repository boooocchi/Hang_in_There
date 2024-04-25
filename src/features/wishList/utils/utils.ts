import { ApolloCache } from '@apollo/client';

import { WISH_LIST_QUERY } from '../graphql/query';
import { ListItemType } from '../types/types';

export const cacheUpdateFunction = (
  cache: ApolloCache<unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { data }: any,
  mutationType: string,
  userId: string | undefined,
) => {
  if (data) {
    const existingData: { wishList: ListItemType[] } | null = cache.readQuery({
      query: WISH_LIST_QUERY,
      variables: { userId },
    });
    if (existingData) {
      let updatedWishList;
      switch (mutationType) {
        case 'ADD':
          updatedWishList = [data.add_wish_list, ...existingData.wishList];
          break;
        case 'DELETE':
          updatedWishList = existingData.wishList.filter((item) => item.id !== data.delete_wish_list.id);
          break;
        case 'UPDATE':
          updatedWishList = existingData.wishList.map((item) =>
            item.id === data.update_wish_list_name.id ? data.update_wish_list_name : item,
          );
          break;
        case 'STATUS_UPDATE':
          updatedWishList = existingData.wishList.map((item) =>
            item.id === data.update_wish_list_status.id
              ? { ...item, checked: data.update_wish_list_status.checked }
              : item,
          );
          break;
        default:
          updatedWishList = existingData.wishList;
      }
      cache.writeQuery({
        query: WISH_LIST_QUERY,
        variables: { userId },
        data: { wishList: updatedWishList },
      });
    }
  }
};
