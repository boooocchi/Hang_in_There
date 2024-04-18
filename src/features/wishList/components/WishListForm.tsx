import { useMutation } from '@apollo/client';
import React from 'react';

import Button from '@/components/elements/button/Button';
import { CancelIcon } from '@/components/elements/icons/icons';
import { useToast } from '@/contexts/ToastContext';
import { useAuth } from '@/hooks/useAuth';

import { WISH_LIST_ADD_MUTATION, WISH_LIST_UPDATE_MUTATION } from '../graphql/mutation';
import { cacheUpdateFunction } from '../graphql/utils';
import { FormProps } from '../types/types';

const WishListForm: React.FC<FormProps> = ({
  categoryName,
  editItemId,
  setEditItemId,
  setIsWishListForm,
  register,
  handleSubmit,
  errors,
}) => {
  const { userId } = useAuth();
  const { addToastMessage } = useToast();

  const [addListItem] = useMutation(WISH_LIST_ADD_MUTATION, {
    update: (cache, data) => cacheUpdateFunction(cache, data, 'ADD', userId),
  });

  const [updateListItem] = useMutation(WISH_LIST_UPDATE_MUTATION, {
    update: (cache, data) => cacheUpdateFunction(cache, data, 'UPDATE', userId),
  });

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
  if (!userId) return null;
  return (
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
  );
};

export default WishListForm;
