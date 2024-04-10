import { ApolloCache, useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/elements/button/Button';
import { CancelIcon, EditIcon, PlusIcon, TrashbinIcon } from '@/components/elements/icons/icons';
import { useToast } from '@/hooks/ToastContext';
import { useAuth } from '@/hooks/useAuth';

import {
  WISH_LIST_ADD_MUTATION,
  WISH_LIST_DELETE_MUTATION,
  WISH_LIST_UPDATE_MUTATION,
  WISH_LIST_STATUS_UPDATE,
} from '../graphql/mutation';
import { WISH_LIST_QUERY } from '../graphql/query';
import { addItemValues, Props, ListItemType } from '../types/types';
import { wishListValidationSchema } from '../validation/wishListValidationSchema';

const WishListForm: React.FC<Props> = ({ categoryName }) => {
  const { userId } = useAuth();
  const { addToastMessage } = useToast();

  const [isWishListForm, setIsWishListForm] = React.useState(false);
  const [editItemId, setEditItemId] = React.useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cacheUpdateFunction = (cache: ApolloCache<any>, { data }: any, mutationType: string) => {
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

  const [addListItem] = useMutation(WISH_LIST_ADD_MUTATION, {
    update: (cache, data) => cacheUpdateFunction(cache, data, 'ADD'),
  });

  const [deleteListItem] = useMutation(WISH_LIST_DELETE_MUTATION, {
    update: (cache, data) => cacheUpdateFunction(cache, data, 'DELETE'),
  });

  const [updateListItem] = useMutation(WISH_LIST_UPDATE_MUTATION, {
    update: (cache, data) => cacheUpdateFunction(cache, data, 'UPDATE'),
  });

  const [updateItemStatus] = useMutation(WISH_LIST_STATUS_UPDATE, {
    update: (cache, data) => cacheUpdateFunction(cache, data, 'STATUS_UPDATE'),
  });
  const { data: listItemsData } = useQuery(WISH_LIST_QUERY, {
    variables: {
      userId,
    },
  });

  const { register, handleSubmit, formState, setValue, reset } = useForm<addItemValues>({
    defaultValues: {
      itemName: '',
      category: categoryName,
    },
    resolver: yupResolver(wishListValidationSchema),
  });
  const { errors } = formState;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    if (editItemId) {
      try {
        await updateListItem({
          variables: {
            id: editItemId,
            itemName: data.itemName,
          },
        });
        addToastMessage('Item name edited!!');
        setIsWishListForm(false);
        setEditItemId('');
      } catch {
        setEditItemId('');
        console.error('error');
        setIsWishListForm(false);
        addToastMessage('Failed to edit the item name');
      }
    } else {
      try {
        await addListItem({
          variables: {
            itemName: data.itemName,
            category: categoryName,
            userId: userId,
          },
        });
        setIsWishListForm(false);
        addToastMessage('Item added!!');
      } catch {
        console.error('error');
        addToastMessage('Failed to add an item');
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteListItem({
        variables: {
          id,
        },
      });
      addToastMessage('Item deleted!!');
    } catch {
      console.error('error');
    }
  };

  const handleEdit = (itemName: string, itemId: string) => {
    reset();
    setEditItemId(itemId);
    setIsWishListForm(true);
    setValue('itemName', itemName);
  };

  const handleItemStatus = async (id: string, checked: boolean) => {
    if (!checked) {
      try {
        await updateItemStatus({
          variables: {
            id,
            checked: true,
          },
        });
      } catch {
        console.error('error');
      }
    }
  };

  return (
    <div className=" w-full h-[400px] rounded-md bg-lightGreen pt-lg pb-md px-lg flex flex-col gap-3 relative">
      {isWishListForm && <div className="absolute bg-black top-0 left-0 rounded-md opacity-30 w-full h-full"></div>}
      <h2 className="text-lg font-boldest text-center mb-3">{categoryName}</h2>
      <ul className="flex flex-col gap-2  h-2/3  overflow-y-scroll hide-scrollbar">
        {listItemsData?.wishList.map((item: ListItemType) => {
          if (item.category === categoryName && !item.checked) {
            return (
              <li key={item.id} className="flex gap-2 justify-between">
                <div className="flex gap-3 items-center overflow-hidden">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-accentOrange border-none
                    focus:ring-0 outline-none rounded-sm form-checkbox"
                    onChange={() => handleItemStatus(item.id, item.checked)}
                  />
                  <p className="truncate">{item.itemName}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handleEdit(item.itemName, item.id);
                    }}
                  >
                    <EditIcon style="w-4 h-4"></EditIcon>
                  </button>
                  <button onClick={() => handleDelete(item.id)}>
                    <TrashbinIcon style="w-4 h-4"></TrashbinIcon>
                  </button>
                </div>
              </li>
            );
          }
        })}
        {isWishListForm && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray  flex flex-col items-center justify-center  p-md rounded-lg absolute top-1/2 translate-y-[-50%] gap-4   w-4/5 left-1/2 translate-x-[-50%]"
          >
            <button
              className="rounded-full h-5 w-5 flex justify-center items-center bg-accentOrange leading-[10px] text-white absolute -top-2 -right-2 text-sm shadow-sm"
              onClick={() => {
                setIsWishListForm(false);
                setEditItemId('');
              }}
            >
              <CancelIcon style="w-4 h-4" />
            </button>
            <div className="relative  flex flex-col items-center justify-center w-full">
              <label htmlFor="wishListInput" className="text-center w-full">
                Item name
              </label>
              <input
                id="wishListInput"
                type="text"
                className="border-b border-lightGreen bg-lightGreen rounded-md mt-1 text-lg w-full py-xs px-sm"
                {...register('itemName')}
              />
              {errors.itemName && (
                <p className="absolute -bottom-5 left-1 text-errorRed text-sm">{errors.itemName.message}</p>
              )}
            </div>
            <Button classname="w-full text-sm">{editItemId ? 'Edit Item' : 'Add Item'}</Button>
          </form>
        )}
      </ul>
      {!isWishListForm && (
        <div className="flex justify-end w-full">
          <button
            className="w-10 h-10 bg-accentOrange rounded-full flex justify-center items-center  text-white font-bold text-lg hover:bg-gray group hover:border-accentOrange hover:border-2 "
            onClick={() => {
              setIsWishListForm(true);
              reset();
            }}
          >
            <PlusIcon style="w-5 h-5 stroke-current group-hover:stroke-accentOrange" />
          </button>
        </div>
      )}
    </div>
  );
};

export default WishListForm;
